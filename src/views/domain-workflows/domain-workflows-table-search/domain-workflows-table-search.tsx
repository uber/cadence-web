'use client';
import React from 'react';

import ErrorPanel from '@/components/error-panel/error-panel';
import SectionLoadingIndicator from '@/components/section-loading-indicator/section-loading-indicator';
import Table from '@/components/table/table';
import usePageQueryParams from '@/hooks/use-page-query-params/use-page-query-params';
import domainPageQueryParamsConfig from '@/views/domain-page/config/domain-page-query-params.config';

import domainWorkflowsTableConfig from '../config/domain-workflows-table.config';
import { type Props } from '../domain-workflows-table/domain-workflows-table.types';
import DomainWorkflowsTableEndMessage from '../domain-workflows-table-end-message/domain-workflows-table-end-message';
import getNextSortOrder from '../helpers/get-next-sort-order';
import useListWorkflows from '../hooks/use-list-workflows';

import { styled } from './domain-workflows-table-search.styles';
import getSearchErrorPanelProps from './helpers/get-search-error-panel-props';

export default function DomainWorkflowsTableSearch({ domain, cluster }: Props) {
  const [queryParams, setQueryParams] = usePageQueryParams(
    domainPageQueryParamsConfig
  );

  const {
    workflows,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useListWorkflows({
    domain,
    cluster,
    inputType: queryParams.inputType,
    search: queryParams.search,
    status: queryParams.status,
    sortColumn: queryParams.sortColumn,
    sortOrder: queryParams.sortOrder,
    timeRangeStart: queryParams.timeRangeStart?.toISOString(),
    timeRangeEnd: queryParams.timeRangeEnd?.toISOString(),
  });

  if (isLoading) {
    return <SectionLoadingIndicator />;
  }

  if (workflows.length === 0) {
    const errorPanelProps = getSearchErrorPanelProps({
      error,
      areSearchParamsAbsent:
        !queryParams.search &&
        !queryParams.status &&
        !queryParams.timeRangeStart &&
        !queryParams.timeRangeEnd,
    });

    if (errorPanelProps) {
      return (
        <styled.ErrorPanelContainer>
          <ErrorPanel {...errorPanelProps} reset={refetch} />
        </styled.ErrorPanelContainer>
      );
    }
  }

  return (
    <Table
      data={workflows}
      columns={domainWorkflowsTableConfig}
      shouldShowResults={!isLoading && workflows.length > 0}
      onSort={(column) => {
        setQueryParams({
          sortColumn: column,
          sortOrder: getNextSortOrder({
            currentColumn: queryParams.sortColumn,
            nextColumn: column,
            currentSortOrder: queryParams.sortOrder,
          }),
        });
      }}
      sortColumn={queryParams.sortColumn}
      sortOrder={queryParams.sortOrder}
      endMessage={
        <DomainWorkflowsTableEndMessage
          hasWorkflows={workflows.length > 0}
          error={error}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      }
    />
  );
}
