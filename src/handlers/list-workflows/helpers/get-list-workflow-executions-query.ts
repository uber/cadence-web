import type { WorkflowStatus } from '@/views/shared/workflow-status-tag/workflow-status-tag.types';
import type { SortingOrder } from '@/components/table/table.types';

export default function getListWorkflowExecutionsQuery({
  search,
  workflowStatus,
  sortColumn,
  sortOrder,
  startTimeRangeStart,
  startTimeRangeEnd,
}: {
  search?: string;
  workflowStatus?: WorkflowStatus;
  sortColumn?: string;
  sortOrder?: SortingOrder;
  startTimeRangeStart?: string;
  startTimeRangeEnd?: string;
}) {
  const searchQueries: Array<string> = [];
  if (search) {
    searchQueries.push(
      `(WorkflowType = "${search}" OR WorkflowID = "${search}" OR RunID = "${search}")`
    );
  }

  if (workflowStatus) {
    if (workflowStatus === 'WORKFLOW_EXECUTION_STATUS_RUNNING') {
      searchQueries.push('CloseTime = missing');
    } else {
      searchQueries.push(`CloseStatus = ${workflowStatus}`);
    }
  }

  if (startTimeRangeStart) {
    searchQueries.push(`StartTime > "${startTimeRangeStart}000000"`);
  }

  if (startTimeRangeEnd) {
    searchQueries.push(`StartTime <= "${startTimeRangeEnd}000000"`);
  }

  return (
    (searchQueries.length > 0 ? `${searchQueries.join(' AND ')} ` : '') +
    `ORDER BY ${sortColumn ?? 'StartTime'} ${sortOrder ?? 'DESC'}`
  );
}
