import moment from 'moment';
import { DEFAULT_RANGE } from '../constants';

export default ({ endTime, range = DEFAULT_RANGE, startTime } = {}) =>
  startTime && endTime
    ? {
        endTime: moment(endTime),
        startTime: moment(startTime),
      }
    : range;
