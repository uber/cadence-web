import { type TaskListType } from '@/__generated__/proto-ts/uber/cadence/api/v1/TaskListType';
import { type Worker } from '@/route-handlers/describe-task-list/describe-task-list.types';
import sortBy, { type SortOrder } from '@/utils/sort-by';

import type taskListWorkersTableConfig from '../../config/task-list-workers-table.config';

export default function sortAndFilterWorkers({
  workers,
  handlerType,
  search,
  sortColumn,
  sortOrder,
}: {
  workers: Array<Worker>;
  handlerType: TaskListType | undefined;
  search: string | undefined;
  sortColumn: string;
  sortOrder: SortOrder;
}) {
  let filteredWorkers = workers;

  if (handlerType === 'TASK_LIST_TYPE_ACTIVITY') {
    filteredWorkers = filteredWorkers.filter((w) => w.hasActivityHandler);
  } else if (handlerType === 'TASK_LIST_TYPE_DECISION') {
    filteredWorkers = filteredWorkers.filter((w) => w.hasDecisionHandler);
  }

  if (search) {
    filteredWorkers = filteredWorkers.filter((w) =>
      w.identity.includes(search)
    );
  }

  return sortBy(
    filteredWorkers,
    (w) => w[sortColumn as (typeof taskListWorkersTableConfig)[number]['id']],
    sortOrder
  );
}
