// eslint-disable-next-line @typescript-eslint/no-var-requires
const pino = require('pino');

const isDevelopment = process.env.NODE_ENV === 'development';

const logger = (defaultConfig) =>
  pino({
    ...defaultConfig,
    level: isDevelopment ? 'debug' : 'info',
    formatters: {
      level(label, number) {
        return { level: isDevelopment ? number : label };
      },
    },
  });

module.exports = {
  logger,
};
