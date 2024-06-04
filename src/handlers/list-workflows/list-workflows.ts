import { useServerComponentQueryParams } from '@/hooks/use-server-component-page-params';
import decodeUrlParams from '@/utils/decode-url-params';
import * as grpcClient from '@/utils/grpc/grpc-client';
import { NextRequest } from 'next/server';

import type { Props, RouteParams } from './list-workflows.types';
import listWorkflowsQueryParamConfig from './list-workflows-query-param-config';
import getListWorkflowExecutionsQuery from './helpers/get-list-workflow-executions-query';
import mapExecutionsToWorkflows from './helpers/map-executions-to-workflows';
import { PAGE_SIZE } from './list-workflows.constants';

export async function GET(request: NextRequest, props: Props) {
  const decodedParams = decodeUrlParams(props.params) as RouteParams;
  const queryParams = useServerComponentQueryParams(
    listWorkflowsQueryParamConfig,
    request.nextUrl.searchParams
  );

  const res = await grpcClient.clusterMethods[
    decodedParams.cluster
  ].listWorkflows({
    domain: decodedParams.domain,
    pageSize: PAGE_SIZE,
    nextPageToken: queryParams.nextPage,
    query: getListWorkflowExecutionsQuery({
      search: queryParams.search,
      workflowStatus: queryParams.status,
      sortColumn: queryParams.sortColumn,
      sortOrder: queryParams.sortOrder,
      startTimeRangeStart: queryParams.startTimestamp,
      startTimeRangeEnd: queryParams.endTimestamp,
    }),
  });

  return Response.json({
    workflows: mapExecutionsToWorkflows(res.executions),
    nextPage: res.nextPageToken,
  });
}
