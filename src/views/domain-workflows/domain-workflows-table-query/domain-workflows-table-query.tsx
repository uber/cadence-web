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
import useListWorkflows from '../hooks/use-list-workflows';

import { styled } from './domain-workflows-table-query.styles';
import getQueryErrorPanelProps from './helpers/get-query-error-panel-props';

export default function DomainWorkflowsTableQuery({ domain, cluster }: Props) {
  const [queryParams] = usePageQueryParams(domainPageQueryParamsConfig);

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
    query: queryParams.query,
  });

  if (isLoading) {
    return <SectionLoadingIndicator />;
  }

  if (error && workflows.length === 0) {
    return (
      <styled.ErrorPanelContainer>
        <ErrorPanel {...getQueryErrorPanelProps({ error })} reset={refetch} />
      </styled.ErrorPanelContainer>
    );
  }

  return (
    <Table
      data={workflows}
      shouldShowResults={!isLoading && workflows.length > 0}
      columns={domainWorkflowsTableConfig.map((columnConfig) => ({
        ...columnConfig,
        sortable: false,
      }))}
      // TODO @adhitya.mamallan - remove this after 3.5 is merged
      onSort={() => {}}
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
