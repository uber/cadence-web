import { type LogLevel } from '@/utils/logger/logger.types';

export type LogParams = {
  level: LogLevel;
  message: string;
  payload: any;
};
