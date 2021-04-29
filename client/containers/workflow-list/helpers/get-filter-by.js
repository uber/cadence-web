import {
  FILTER_BY_CLOSE_TIME,
  FILTER_BY_START_TIME,
  STATUS_ALL,
  STATUS_OPEN,
} from '../constants';

const getFilterBy = statusName => [STATUS_ALL, STATUS_OPEN].includes(statusName)
  ? FILTER_BY_START_TIME
  : FILTER_BY_CLOSE_TIME;

export default getFilterBy;
