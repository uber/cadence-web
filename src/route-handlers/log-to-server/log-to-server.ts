import { NextResponse, type NextRequest } from 'next/server';

import logger from '@/utils/logger';

import logToServerPayloadSchema from './schemas/log-to-server-payload-schema';

export default async function logToServer(request: NextRequest) {
  if (request.method !== 'POST') {
    return NextResponse.json(
      {
        error: 'Method not allowed',
      },
      { status: 405 }
    );
  }

  const requestBodyJSON = request.json();
  const { data, error } = logToServerPayloadSchema.safeParse(requestBodyJSON);
  if (error) {
    return NextResponse.json(
      {
        error: 'Invalid argument(s) for workflow search',
        validationErrors: error.errors,
      },
      {
        status: 400,
      }
    );
  }

  const { level, message, payload } = data;
  // @ts-expect-error logger is not indexable by string, but we need to use the appropriate logger anyway
  const logFn = logger[level] ?? logger.error;
  logFn(payload, message);
}
