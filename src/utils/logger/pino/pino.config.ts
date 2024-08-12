import type { LoggerOptions } from 'pino';

import getLogBody from './helpers/get-log-body';

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
        navigator.sendBeacon(
          '/log',
          JSON.stringify(getLogBody(level, logEvent))
        );
      },
    },
  },
};

export default LOGGER_CONFIG;
