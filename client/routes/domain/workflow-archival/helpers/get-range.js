import moment from 'moment';
export default ({ endTime, range = 'last-30-days', startTime } = {}) =>
  startTime && endTime ?
    {
      endTime: moment(endTime),
      startTime: moment(startTime),
    } :
    range;
