import moment from 'moment';

export default ({ endTime, range = 'last-24-hours', startTime } = {}) =>
  startTime && endTime
    ? {
        endTime: moment(endTime),
        startTime: moment(startTime),
      }
    : range;
