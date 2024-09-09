import { type TaskListType } from '@/__generated__/proto-ts/uber/cadence/api/v1/TaskListType';
import { type PageFilterConfig } from '@/components/page-filters/page-filters.types';

import TaskListFiltersHandlers from '../task-list-filters-handlers/task-list-filters-handlers';

import type taskListPageQueryParamsConfig from './task-list-page-query-params.config';

const taskListFiltersConfig: [
  PageFilterConfig<
    typeof taskListPageQueryParamsConfig,
    { handlerType: TaskListType | undefined }
  >,
] = [
  {
    id: 'handlerTypes',
    getValue: (v) => ({
      handlerType: v.handlerType,
    }),
    formatValue: (v) => v,
    component: TaskListFiltersHandlers,
  },
] as const;

export default taskListFiltersConfig;
