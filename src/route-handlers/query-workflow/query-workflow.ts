import { type NextRequest, NextResponse } from 'next/server';

import decodeUrlParams from '@/utils/decode-url-params';
import * as grpcClient from '@/utils/grpc/grpc-client';
import { getHTTPStatusCode, GRPCError } from '@/utils/grpc/grpc-error';
import logger, { type RouteHandlerErrorPayload } from '@/utils/logger';

import {
  type QueryWorkflowResponse,
  type RequestParams,
} from './query-workflow.types';

export async function queryWorkflow(
  request: NextRequest,
  requestParams: RequestParams
) {
  logger.info({ request }, 'test0');
  const requestBody = await request.text();
  logger.info({ requestBody }, 'test1');

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
          data: Buffer.from(requestBody),
        },
      },
    });

    logger.info({ res }, 'test2');

    return Response.json({
      result: res.queryResult
        ? JSON.parse(
            Buffer.from(res.queryResult.data, 'base64').toString('utf-8')
          )
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
