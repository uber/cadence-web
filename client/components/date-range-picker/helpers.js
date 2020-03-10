import moment from 'moment';

export const getRange = (dateRange) => {
  if (!dateRange) {
    return [];
  }

  if (typeof dateRange !== 'string') {
    return [
      dateRange.startTime.toDate(),
      dateRange.endTime.toDate(),
    ];
  }

  const [, count, unit] = dateRange.split('-');

  const startTime = moment()
    .subtract(count, unit)
    .startOf(unit)
    .toDate();

  const endTime = moment()
    .endOf(unit)
    .toDate();

  return [startTime, endTime];
};

