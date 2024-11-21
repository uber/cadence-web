'use client';
import { useMemo } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import queryString from 'query-string';

import {
  type RouteParams as ListWorkflowsParams,
  type ListWorkflowsResponse,
  type ListWorkflowsRequestQueryParams,
} from '@/route-handlers/list-workflows/list-workflows.types';
import request from '@/utils/request';
import { type RequestError } from '@/utils/request/request-error';

import DOMAIN_WORKFLOWS_PAGE_SIZE from '../config/domain-workflows-page-size.config';

export default function useListWorkflows({
  params,
  requestQueryParams,
  pageSize = DOMAIN_WORKFLOWS_PAGE_SIZE,
}: {
  params: ListWorkflowsParams;
  requestQueryParams: Omit<ListWorkflowsRequestQueryParams, 'pageSize'>;
  pageSize?: number;
}) {
  const queryResult = useInfiniteQuery<ListWorkflowsResponse, RequestError>({
    queryKey: ['listWorkflows', { ...params, ...requestQueryParams, pageSize }],
    queryFn: async ({ pageParam }) =>
      request(
        queryString.stringifyUrl({
          url: `/api/domains/${params.domain}/${params.cluster}/workflows`,
          query: {
            ...requestQueryParams,
            pageSize: pageSize.toString(),
            nextPage: pageParam as string,
          } as const satisfies ListWorkflowsRequestQueryParams,
        })
      ).then((res) => res.json()),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.nextPage) return undefined;
      return lastPage.nextPage;
    },
    retry: false,
    refetchOnWindowFocus: (query) => query.state.status !== 'error',
  });

  const workflows = useMemo(() => {
    if (!queryResult.data) return [];
    return queryResult.data.pages.flatMap((page) => page.workflows ?? []);
  }, [queryResult.data]);

  return {
    workflows,
    ...queryResult,
  };
}
