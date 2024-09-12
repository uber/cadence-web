import { NextResponse, type NextRequest } from 'next/server';

import decodeUrlParams from '@/utils/decode-url-params';
import * as grpcClient from '@/utils/grpc/grpc-client';
import { getHTTPStatusCode, GRPCError } from '@/utils/grpc/grpc-error';
import logger, { type RouteHandlerErrorPayload } from '@/utils/logger';

import { type RequestParams } from './fetch-workflow-query-types.types';
import parseErrorMessageForQueryTypes from './helpers/parse-error-message-for-query-types';

export default async function fetchWorkflowQueryTypes(
  _: NextRequest,
  requestParams: RequestParams
) {
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
        queryType: '__query_types',
      },
    });

    // You need to unmarshal this from base64
    logger.info(res, 'result');

    return Response.json({ queryTypes: res.queryResult?.data });
  } catch (e) {
    if (e instanceof Error) {
      logger.error(e.message, 'error message');
      const parsedQueryTypes = parseErrorMessageForQueryTypes(e.message);
      if (parsedQueryTypes.length > 0) {
        return Response.json({ queryTypes: parsedQueryTypes });
      }
    }

    logger.error<RouteHandlerErrorPayload>(
      { requestParams: decodedParams, cause: e },
      'Error querying workflow for query types'
    );

    return NextResponse.json(
      {
        message:
          e instanceof GRPCError
            ? e.message
            : 'Error querying workflow for query types',
        cause: e,
      },
      { status: getHTTPStatusCode(e) }
    );
  }
}
