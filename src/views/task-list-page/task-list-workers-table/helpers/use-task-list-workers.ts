import { type Poller } from '@/route-handlers/describe-task-list/describe-task-list.types';
import sortBy, { type SortOrder } from '@/utils/sort-by';

import type taskListWorkersTableConfig from '../../config/task-list-workers-table.config';

export default function useTaskListWorkers({
  workers,
  search,
  sortColumn,
  sortOrder,
}: {
  workers: Array<Poller>;
  search: string | undefined;
  sortColumn: (typeof taskListWorkersTableConfig)[number]['id'];
  sortOrder: SortOrder;
}) {
  return sortBy(
    search ? workers.filter((w) => w.identity.includes(search)) : workers,
    (w) => w[sortColumn],
    sortOrder
  );
}
