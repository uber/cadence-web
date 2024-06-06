import { type NextRequest, NextResponse } from 'next/server';

import decodeUrlParams from '@/utils/decode-url-params';
import * as grpcClient from '@/utils/grpc/grpc-client';
import type { Props, RouteParams } from './list-workflows.types';
import listWorkflowsQueryParamSchema from './schemas/list-workflows-query-params-schema';
import getListWorkflowExecutionsQuery from './helpers/get-list-workflow-executions-query';
import mapExecutionsToWorkflows from './helpers/map-executions-to-workflows';

export async function listWorkflows(request: NextRequest, props: Props) {
  const decodedParams = decodeUrlParams(props.params) as RouteParams;

  const { data: queryParams, error } = listWorkflowsQueryParamSchema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams)
  );
  if (error) {
    return NextResponse.json(
      {
        error: 'Invalid argument(s) for workflow search',
        validationErrors: error.errors,
      },
      { status: 400 }
    );
  }

  try {
    const res = await grpcClient.clusterMethods[
      decodedParams.cluster
    ].listWorkflows({
      domain: decodedParams.domain,
      pageSize: queryParams.pageSize,
      nextPageToken: queryParams.nextPage,
      query: getListWorkflowExecutionsQuery({
        search: queryParams.search,
        workflowStatus: queryParams.status,
        sortColumn: queryParams.sortColumn,
        sortOrder: queryParams.sortOrder,
        timeRangeStart: queryParams.timeRangeStart,
        timeRangeEnd: queryParams.timeRangeEnd,
      }),
    });
    return NextResponse.json({
      workflows: mapExecutionsToWorkflows(res.executions),
      nextPage: res.nextPageToken,
    });
  } catch (e: any) {
    // TODO: improve error formatting when we have a GRPC error type
    return NextResponse.json(
      {
        error: 'Error fetching workflows',
        message: e.toString(),
      },
      { status: e.httpStatusCode }
    );
  }
}
