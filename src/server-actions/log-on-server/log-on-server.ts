'use server';

import logger from '@/utils/logger';

import { type LogParams } from './log-on-server.types';

export default async function logOnServer(params: LogParams) {
  logger[params.level]({ payload: params.payload }, params.message);
}
