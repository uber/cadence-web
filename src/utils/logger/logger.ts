import { type LoggerOptions, pino } from 'pino';

import LOGGER_CONFIG from './logger.config';

export const getBaseLogger = (config?: LoggerOptions) =>
  pino({ ...config, ...LOGGER_CONFIG });

const logger = getBaseLogger();

export default logger;
