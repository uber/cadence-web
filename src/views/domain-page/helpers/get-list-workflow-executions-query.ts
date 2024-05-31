import type { WorkflowStatus } from '@/views/shared/workflow-status-tag/workflow-status-tag.types';
import type { SortingOrder } from '@/components/table/table.types';
import { WORKFLOW_STATUS_NAMES } from '@/views/shared/workflow-status-tag/workflow-status-tag.constants';

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
  startTimeRangeStart?: number;
  startTimeRangeEnd?: number;
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
      searchQueries.push(`CloseStatus = ${mapStatusToInt(workflowStatus)}`);
    }
  }

  if (startTimeRangeStart) {
    searchQueries.push(
      `StartTime > "${getNsStringFromDate(startTimeRangeStart)}"`
    );
  }

  if (startTimeRangeEnd) {
    searchQueries.push(
      `StartTime <= "${getNsStringFromDate(startTimeRangeEnd)}"`
    );
  }

  return (
    (searchQueries.length > 0 ? `${searchQueries.join(' AND ')} ` : '') +
    `ORDER BY ${sortColumn ?? 'StartTime'} ${sortOrder ?? 'DESC'}`
  );
}

function mapStatusToInt(status: WorkflowStatus): number {
  return Object.keys(WORKFLOW_STATUS_NAMES).indexOf(status) - 1;
}

function getNsStringFromDate(timestampMs: number): string {
  return timestampMs.toString() + '000000';
}
