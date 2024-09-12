'use client';
import React from 'react';

import Table from '@/components/table/table';
import usePageQueryParams from '@/hooks/use-page-query-params/use-page-query-params';
import sortBy, { toggleSortOrder } from '@/utils/sort-by';

import taskListPageQueryParamsConfig from '../config/task-list-page-query-params.config';
import taskListWorkersTableConfig from '../config/task-list-workers-table.config';

import filterWorkers from './helpers/filter-workers';
import isValidTableColumn from './helpers/is-valid-table-column';
import { styled } from './task-list-workers-table.styles';
import { type Props } from './task-list-workers-table.types';

export default function TaskListWorkersTable({ taskList }: Props) {
  const [queryParams, setQueryParams] = usePageQueryParams(
    taskListPageQueryParamsConfig
  );

  const filteredWorkers = filterWorkers({
    workers: taskList.workers,
    handlerType: queryParams.handlerType,
    search: queryParams.taskListSearch,
  });

  return (
    <Table
      data={sortBy(
        filteredWorkers,
        (w) =>
          isValidTableColumn(queryParams.sortColumn)
            ? w[queryParams.sortColumn]
            : w.lastAccessTime,
        queryParams.sortOrder
      )}
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
        filteredWorkers.length === 0 ? (
          <styled.EndMessageContainer>No workers</styled.EndMessageContainer>
        ) : null
      }
    />
  );
}
