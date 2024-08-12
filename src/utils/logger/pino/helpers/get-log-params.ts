import { type Level, type LogEvent } from 'pino';

import { type LogParams } from '@/server-actions/log-to-server/log-to-server.types';

export default function getLogParams(level: Level, event: LogEvent): LogParams {
  return {
    level,
    message:
      event.messages.find((msg) => typeof msg === 'string') ??
      'Log from browser',
    payload: {
      browserTimestamp: event.ts,
      messages: event.messages,
      bindings: event.bindings,
      isBrowser: true,
    },
  };
}
