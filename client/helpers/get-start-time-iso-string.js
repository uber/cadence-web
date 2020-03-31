import moment from 'moment';

export default (range, startTimeString) => {
  if (range && typeof range === 'string') {
    const [, count, unit] = range.split('-');

    return moment()
      .subtract(count, unit)
      .startOf(unit)
      .toISOString();
  }

  return startTimeString;
};
