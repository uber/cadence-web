import moment from 'moment';

export default (range, endTimeString) => {
  if (range && typeof range === 'string') {
    const [, , unit] = range.split('-');

    return moment()
      .endOf(unit)
      .toISOString();
  }

  return endTimeString;
};
