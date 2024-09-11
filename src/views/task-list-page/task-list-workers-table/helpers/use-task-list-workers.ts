import { useMemo } from 'react';

import { type TaskListType } from '@/__generated__/proto-ts/uber/cadence/api/v1/TaskListType';
import { type Poller } from '@/route-handlers/describe-task-list/describe-task-list.types';
import sortBy, { type SortOrder } from '@/utils/sort-by';

import type taskListWorkersTableConfig from '../../config/task-list-workers-table.config';

export default function useTaskListWorkers({
  workers,
  handlerType,
  search,
  sortColumn,
  sortOrder,
}: {
  workers: Array<Poller>;
  handlerType: TaskListType | undefined;
  search: string | undefined;
  sortColumn: string;
  sortOrder: SortOrder;
}) {
  return useMemo(
    () =>
      sortBy(
        workers
          .filter((w) => {
            if (handlerType === 'TASK_LIST_TYPE_ACTIVITY')
              return w.activityHandler;
            if (handlerType === 'TASK_LIST_TYPE_DECISION')
              return w.decisionHandler;
            return true;
          })
          .filter((w) => (search ? w.identity.includes(search) : true)),
        (w) =>
          w[sortColumn as (typeof taskListWorkersTableConfig)[number]['id']],
        sortOrder
      ),
    [workers, handlerType, search, sortColumn, sortOrder]
  );
}
