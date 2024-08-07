import { pino, type Logger } from 'pino';

import LOGGER_CONFIG from '@/config/logger/logger.config';

export const logger: Logger = pino(LOGGER_CONFIG);
