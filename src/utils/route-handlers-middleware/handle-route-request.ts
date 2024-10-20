import { type NextRequest, NextResponse } from 'next/server';

import { GRPCError, getHTTPStatusCode } from '../grpc/grpc-error';
import logger from '../logger';

import type {
  CombineMiddlewareContextType,
  GetAllMiddlewaresReturnTypes,
  MiddlewareFunction,
  RequestHandlerFunction,
} from './route-handlers-middleware.types';

async function handleRouteRequest<
  M extends MiddlewareFunction[],
  Options extends { params: Record<string, string> },
>(
  request: NextRequest,
  options: Options,
  requestHandler: RequestHandlerFunction<M, Options>,
  middlewares: M
) {
  let context: Partial<
    CombineMiddlewareContextType<GetAllMiddlewaresReturnTypes<M>>
  > = {};
  for (const middlewareFunction of middlewares) {
    try {
      const result = await middlewareFunction(request, options, context);
      if (result instanceof NextResponse) {
        return result;
      } else if (Array.isArray(result) && typeof result[0] === 'string') {
        const [key, value] = result;
        context = {
          ...context,
          [key]: value,
        };
      }
    } catch (e) {
      logger.error({ cause: e }, `Error in Middlewares: ${request.url}`);

      return NextResponse.json(
        {
          message:
            e instanceof GRPCError ? e.message : 'Failed to handle request',
          cause: e,
        },
        { status: getHTTPStatusCode(e) }
      );
    }
  }
  return requestHandler(
    request,
    options,
    context as CombineMiddlewareContextType<GetAllMiddlewaresReturnTypes<M>>
  );
}

export default handleRouteRequest;
