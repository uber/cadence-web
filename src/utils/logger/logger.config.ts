const isDevelopment = process.env.NODE_ENV === 'development';
import type { LoggerOptions } from 'pino';

const LOGGER_CONFIG: LoggerOptions = {
  level: isDevelopment ? 'debug' : 'info',
  formatters: {
    level(label, number) {
      return { level: isDevelopment ? number : label };
    },
  },
  browser: {
    transmit: {
      level: 'warn',
      send: (level, info) => {
        // testing send
        // eslint-disable-next-line no-console
        console.log(level, info);
      },
    },
  },
};

export default LOGGER_CONFIG;
