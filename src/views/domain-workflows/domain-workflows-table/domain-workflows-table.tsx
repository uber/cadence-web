'use client';
import React, { useCallback } from 'react';

import ErrorPanel from '@/components/error-panel/error-panel';
import SectionLoadingIndicator from '@/components/section-loading-indicator/section-loading-indicator';
import Table from '@/components/table/table';
import usePageQueryParams from '@/hooks/use-page-query-params/use-page-query-params';
import domainPageQueryParamsConfig from '@/views/domain-page/config/domain-page-query-params.config';

import domainWorkflowsQueryTableConfig from '../config/domain-workflows-query-table.config';
import domainWorkflowsSearchTableConfig from '../config/domain-workflows-search-table.config';
import { type Props } from '../domain-workflows-table/domain-workflows-table.types';
import getDomainWorkflowsQueryParamsValues from '../helpers/get-domain-workflows-query-params-values';
import getNextSortOrder from '../helpers/get-next-sort-order';
import useListWorkflows from '../hooks/use-list-workflows';

import { styled } from './domain-workflows-table.styles';
import getWorkflowsErrorPanelProps from './helpers/get-workflows-error-panel-props';

export default function DomainWorkflowsTable({
  domain,
  cluster,
  isArchival,
}: Props) {
  const [queryParams, setQueryParams] = usePageQueryParams(
    domainPageQueryParamsConfig
  );

  const {
    inputType,
    search,
    status,
    sortColumn,
    sortOrder,
    timeRangeStart,
    timeRangeEnd,
  } = getDomainWorkflowsQueryParamsValues({
    queryParams,
    isArchival,
  });

  const onSort = useCallback(
    (column: string) =>
      setQueryParams({
        [isArchival ? 'sortColumnArchival' : 'sortColumn']: column,
        [isArchival ? 'sortOrderArchival' : 'sortOrder']: getNextSortOrder({
          currentColumn: sortColumn,
          nextColumn: column,
          currentSortOrder: sortOrder,
        }),
      }),
    [isArchival, sortColumn, sortOrder, setQueryParams]
  );

  const {
    workflows,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useListWorkflows({ domain, cluster });

  if (isLoading) {
    return <SectionLoadingIndicator />;
  }

  if (workflows.length === 0) {
    const errorPanelProps = getWorkflowsErrorPanelProps({
      inputType,
      error,
      areSearchParamsAbsent:
        !search && !status && !timeRangeStart && !timeRangeEnd,
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
    <styled.TableContainer>
      <Table
        data={workflows}
        shouldShowResults={!isLoading && workflows.length > 0}
        endMessageProps={{
          kind: 'infinite-scroll',
          hasData: workflows.length > 0,
          error,
          fetchNextPage,
          hasNextPage,
          isFetchingNextPage,
        }}
        {...(inputType === 'query'
          ? {
              columns: domainWorkflowsQueryTableConfig,
            }
          : {
              columns: domainWorkflowsSearchTableConfig,
              onSort,
              sortColumn: sortColumn,
              sortOrder: sortOrder,
            })}
      />
    </styled.TableContainer>
  );
}
