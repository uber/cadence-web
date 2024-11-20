'use client';
import React from 'react';

import usePageQueryParams from '@/hooks/use-page-query-params/use-page-query-params';
import domainPageQueryParamsConfig from '@/views/domain-page/config/domain-page-query-params.config';

import DomainWorkflowsTableQuery from '../domain-workflows-table-query/domain-workflows-table-query';
import DomainWorkflowsTableSearch from '../domain-workflows-table-search/domain-workflows-table-search';

import { styled } from './domain-workflows-table.styles';
import { type Props } from './domain-workflows-table.types';

export default function DomainWorkflowsTable(props: Props) {
  const [{ inputType }] = usePageQueryParams(domainPageQueryParamsConfig);

  return (
    <styled.TableContainer>
      {inputType === 'query' ? (
        <DomainWorkflowsTableQuery key="query" {...props} />
      ) : (
        <DomainWorkflowsTableSearch key="search" {...props} />
      )}
    </styled.TableContainer>
  );
}
