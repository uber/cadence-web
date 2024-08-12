export { registerLoggers } from './logger.register';
import logger from './pino/pino';
export { default as getNextLogger } from './pino/pino-next-logger';

export default logger;
