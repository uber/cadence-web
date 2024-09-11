'use client';
import React from 'react';

import Table from '@/components/table/table';
import usePageQueryParams from '@/hooks/use-page-query-params/use-page-query-params';
import { type TaskList } from '@/route-handlers/describe-task-list/describe-task-list.types';
import { toggleSortOrder } from '@/utils/sort-by';

import taskListPageQueryParamsConfig from '../config/task-list-page-query-params.config';
import taskListWorkersTableConfig from '../config/task-list-workers-table.config';

import useTaskListWorkers from './helpers/use-task-list-workers';
import { styled } from './task-list-workers-table.styles';

export default function TaskListWorkersTable(props: { taskList: TaskList }) {
  const [queryParams, setQueryParams] = usePageQueryParams(
    taskListPageQueryParamsConfig
  );

  const sortedAndFilteredWorkers = useTaskListWorkers({
    workers: props.taskList.pollers,
    handlerType: queryParams.handlerType,
    search: queryParams.taskListSearch,
    sortColumn: queryParams.sortColumn,
    sortOrder: queryParams.sortOrder,
  });

  return (
    <Table
      data={sortedAndFilteredWorkers}
      columns={taskListWorkersTableConfig}
      shouldShowResults={true}
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
        sortedAndFilteredWorkers.length === 0 ? (
          <styled.EndMessageContainer>No workers</styled.EndMessageContainer>
        ) : null
      }
    />
  );
}
