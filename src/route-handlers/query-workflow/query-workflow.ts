import { type NextRequest, NextResponse } from 'next/server';

import decodeUrlParams from '@/utils/decode-url-params';
import * as grpcClient from '@/utils/grpc/grpc-client';
import { getHTTPStatusCode, GRPCError } from '@/utils/grpc/grpc-error';
import logger, { type RouteHandlerErrorPayload } from '@/utils/logger';

import {
  type QueryWorkflowResponse,
  type RequestParams,
} from './query-workflow.types';
import { queryWorkflowResultDataSchema } from './schemas/query-workflow-result-data-schema';

export async function queryWorkflow(
  request: NextRequest,
  requestParams: RequestParams
) {
  const requestBody = await request.json();

  const decodedParams = decodeUrlParams(requestParams.params);

  try {
    const res = await grpcClient.clusterMethods[
      decodedParams.cluster
    ].queryWorkflow({
      domain: decodedParams.domain,
      workflowExecution: {
        workflowId: decodedParams.workflowId,
        runId: decodedParams.runId,
      },
      query: {
        queryType: decodedParams.queryName,
        queryArgs: {
          data: requestBody,
        },
      },
    });

    return Response.json({
      result: res.queryResult
        ? queryWorkflowResultDataSchema.parse(res.queryResult.data)
        : null,
      rejected: res.queryRejected,
    } satisfies QueryWorkflowResponse);
  } catch (e) {
    logger.error<RouteHandlerErrorPayload>(
      { requestParams: decodedParams, cause: e },
      'Error querying workflow'
    );

    return NextResponse.json(
      {
        message: e instanceof GRPCError ? e.message : 'Error querying workflow',
        cause: e,
      },
      { status: getHTTPStatusCode(e) }
    );
  }
}
