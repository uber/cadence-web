import moment from 'moment';
import { RANGE_OPTIONS } from './constants';

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

export const getShortcuts = (maxDays, onClickHandler) => {
  let options = RANGE_OPTIONS.slice();

  if (maxDays && maxDays < 90) {
    options = options.filter(o => o.daysAgo < maxDays);

    const option = {
      daysAgo: maxDays,
      text: `Last ${maxDays} days`,
      value: `last-${maxDays}-days`,
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
