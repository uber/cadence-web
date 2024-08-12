import { pino } from 'pino';

import LOGGER_CONFIG from './pino.config';

const logger = pino(LOGGER_CONFIG);

export default logger;
