import type { LoggerOptions } from 'pino';

import logToServer from '@/server-actions/log-to-server/log-to-server';

import getLogParams from './helpers/get-log-params';

const isDevelopment = process.env.NODE_ENV === 'development';

const LOGGER_CONFIG: LoggerOptions = {
  level: isDevelopment ? 'trace' : 'info',
  formatters: {
    level(label, number) {
      return { level: isDevelopment ? number : label };
    },
  },
  browser: {
    transmit: {
      level: 'warn',
      send: (level, logEvent) => {
        logToServer(getLogParams(level, logEvent));
      },
    },
  },
};

export default LOGGER_CONFIG;
