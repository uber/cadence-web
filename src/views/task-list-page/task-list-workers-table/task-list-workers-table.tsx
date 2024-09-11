'use client';
import React from 'react';

import Table from '@/components/table/table';
import usePageQueryParams from '@/hooks/use-page-query-params/use-page-query-params';
import { type TaskList } from '@/route-handlers/describe-task-list/describe-task-list.types';
import { toggleSortOrder } from '@/utils/sort-by';

import taskListPageQueryParamsConfig from '../config/task-list-page-query-params.config';
import taskListWorkersTableConfig from '../config/task-list-workers-table.config';

import sortAndFilterWorkers from './helpers/sort-and-filter-workers';
import { styled } from './task-list-workers-table.styles';

export default function TaskListWorkersTable(props: { taskList: TaskList }) {
  const [queryParams, setQueryParams] = usePageQueryParams(
    taskListPageQueryParamsConfig
  );

  const workers = sortAndFilterWorkers({
    workers: props.taskList.workers,
    handlerType: queryParams.handlerType,
    search: queryParams.taskListSearch,
    sortColumn: queryParams.sortColumn,
    sortOrder: queryParams.sortOrder,
  });

  return (
    <Table
      data={workers}
      columns={taskListWorkersTableConfig}
      shouldShowResults={true}
      sortColumn={queryParams.sortColumn}
      sortOrder={queryParams.sortOrder}
      onSort={(column) =>
        setQueryParams({
          sortColumn: column,
          sortOrder: toggleSortOrder({
            currentSortColumn: queryParams.sortColumn,
            currentSortOrder: queryParams.sortOrder,
            newSortColumn: column,
          }),
        })
      }
      endMessage={
        workers.length === 0 ? (
          <styled.EndMessageContainer>No workers</styled.EndMessageContainer>
        ) : null
      }
    />
  );
}
