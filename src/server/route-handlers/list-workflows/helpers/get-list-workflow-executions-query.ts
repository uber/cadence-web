import type { WorkflowStatus } from '@/views/shared/workflow-status-tag/workflow-status-tag.types';
import type { SortingOrder } from '@/components/table/table.types';
import mapWorkflowStatusToInt from './map-workflow-status-to-int';
import getTimestampNsFromISO from '../../../../utils/datetime/get-timestamp-ns-from-iso';

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
      searchQueries.push(
        `CloseStatus = ${mapWorkflowStatusToInt(workflowStatus)}`
      );
    }
  }

  if (startTimeRangeStart) {
    searchQueries.push(
      `StartTime > "${getTimestampNsFromISO(startTimeRangeStart)}"`
    );
  }

  if (startTimeRangeEnd) {
    searchQueries.push(
      `StartTime <= "${getTimestampNsFromISO(startTimeRangeEnd)}"`
    );
  }

  return (
    (searchQueries.length > 0 ? `${searchQueries.join(' AND ')} ` : '') +
    `ORDER BY ${sortColumn ?? 'StartTime'} ${sortOrder ?? 'DESC'}`
  );
}
