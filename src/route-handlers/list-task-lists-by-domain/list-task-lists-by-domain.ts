import { type NextRequest, NextResponse } from 'next/server';

import decodeUrlParams from '@/utils/decode-url-params';
import * as grpcClient from '@/utils/grpc/grpc-client';
import { getHTTPStatusCode, GRPCError } from '@/utils/grpc/grpc-error';
import logger, { type RouteHandlerErrorPayload } from '@/utils/logger';

import mapTaskListsToArray from './helpers/map-task-lists-to-array';
import {
  type RequestParams,
  type RouteParams,
} from './list-task-lists-by-domain.types';

export async function listTaskListsByDomain(
  _: NextRequest,
  requestParams: RequestParams
) {
  const decodedParams = decodeUrlParams(requestParams.params) as RouteParams;

  try {
    const res = await grpcClient
      .getClusterMethods(decodedParams.cluster)
      .getTaskListsByDomain({ domain: decodedParams.domain });

    return NextResponse.json({
      taskLists: mapTaskListsToArray(res),
    });
  } catch (e) {
    logger.error<RouteHandlerErrorPayload>(
      { requestParams: decodedParams, cause: e },
      'Error fetching task lists by domain'
    );

    return NextResponse.json(
      {
        message:
          e instanceof GRPCError
            ? e.message
            : 'Error fetching task lists by domain',
        cause: e,
      },
      { status: getHTTPStatusCode(e) }
    );
  }
}
