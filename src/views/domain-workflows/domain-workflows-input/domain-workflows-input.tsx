'use client';
import { Input } from 'baseui/input';
import { Segment, SegmentedControl } from 'baseui/segmented-control';

import PageFilters from '@/components/page-filters/page-filters';
import usePageQueryParams from '@/hooks/use-page-query-params/use-page-query-params';
import domainPageQueryParamsConfig from '@/views/domain-page/config/domain-page-query-params.config';

import domainWorkflowsFiltersConfig from '../config/domain-workflows-filters.config';
import DomainWorkflowsQueryInput from '../domain-workflows-query-input/domain-workflows-query-input';

import { styled } from './domain-workflows-input.styles';

export default function DomainWorkflowsInput() {
  const [queryParams, setQueryParams] = usePageQueryParams(
    domainPageQueryParamsConfig
  );

  return (
    <styled.InputContainer>
      <SegmentedControl
        activeKey={queryParams.inputType}
        onChange={({ activeKey }) => {
          setQueryParams({
            inputType: activeKey === 'query' ? 'query' : 'search',
          });
        }}
      >
        <Segment key="search" label="Search" />
        <Segment key="query" label="Query" />
      </SegmentedControl>
      {queryParams.inputType === 'query' ? (
        <DomainWorkflowsQueryInput />
      ) : (
        <PageFilters
          searchQueryParamKey="search"
          searchPlaceholder="Search for Workflow ID, Run ID, or Workflow Type"
          pageFiltersConfig={domainWorkflowsFiltersConfig}
          pageQueryParamsConfig={domainPageQueryParamsConfig}
        />
      )}
    </styled.InputContainer>
  );
}
