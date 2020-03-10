import moment from 'moment';
import {
  ALLOWED_PERIOD_TYPES,
  DATETIME_FORMAT,
  RANGE_OPTIONS,
} from './constants';

export const getMaxStartDate = (maxDays) => moment()
  .startOf('day')
  .subtract(maxDays, 'days');

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

export const getRangeDisplayText = (dateRange) => {
  if (!dateRange) {
    return '';
  }

  if (typeof dateRange !== 'string') {
    return `${dateRange.startTime.format(
      DATETIME_FORMAT
    )} - ${dateRange.endTime.format(DATETIME_FORMAT)}`;
  }

  const [, count, unit] = dateRange.split('-');

  const parsedCount = parseInt(count);

  if (!parsedCount) {
    return '';
  }

  if (!ALLOWED_PERIOD_TYPES.includes(unit)) {
    return '';
  }

  return `Last ${parsedCount} ${unit}`;
};

export const getShortcuts = (maxDays, onClickHandler) => {
  let options = RANGE_OPTIONS.slice();

  if (maxDays && maxDays < 90) {
    options = options.filter(o => o.daysAgo < maxDays);
    const periodType = maxDays === 1 ? 'day' : 'days';

    const option = {
      daysAgo: maxDays,
      text: `Last ${maxDays} ${periodType}`,
      value: `last-${maxDays}-${periodType}`,
    };

    options.push(option);
    options.sort((a, b) => a.daysAgo - b.daysAgo);
  }

  options = options.map(option => ({
    ...option,
    onClick: () => onClickHandler(option),
  }));

  return options;
};

export const getTimePanelLabel = (showTimePanel) => showTimePanel ? 'select date' : 'select time';

export const isDayDisabled = (maxStartDate) => (date) => {
  const momentDate = moment(date);

  if (maxStartDate) {
    if (momentDate.isBefore(maxStartDate)) {
      return true;
    }
  }

  return momentDate.isAfter(moment().endOf('day'));
};
