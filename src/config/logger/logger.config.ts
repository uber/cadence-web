import { type LoggerOptions } from 'pino';

const isDevelopment = process.env.NODE_ENV === 'development';

const LOGGER_CONFIG: LoggerOptions = {
  level: isDevelopment ? 'debug' : 'info',
  formatters: {
    level(label, number) {
      return { level: isDevelopment ? number : label };
    },
  },
};

export default LOGGER_CONFIG;
