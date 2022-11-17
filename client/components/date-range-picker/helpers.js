// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import moment from 'moment';
import {
  ALLOWED_PERIOD_TYPES,
  DATETIME_FORMAT,
  RANGE_OPTIONS,
} from './constants';

export const getDateString = date => moment(date).format(DATETIME_FORMAT);

export const getMaxEndDate = now => moment(now).endOf('day');

export const getRange = dateRange => {
  if (!dateRange) {
    return [];
  }

  if (typeof dateRange !== 'string') {
    return [dateRange.startTime.toDate(), dateRange.endTime.toDate()];
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

export const getRangeDisplayText = dateRange => {
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

export const getShortcuts = (maxDays, minStartDate) => {
  let options = RANGE_OPTIONS;

  if (!minStartDate) {
    return options;
  }

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

  return options;
};

export const getTimePanelLabel = showTimePanel =>
  showTimePanel ? 'Select date' : 'Select time';

export const isDateValid = (date, minStartDate, maxEndDate) =>
  (date.isValid &&
    !date.isAfter(maxEndDate) &&
    !(minStartDate && date.isBefore(minStartDate))) ||
  false;

export const isDayDisabled = minStartDate => date => {
  const momentDate = moment(date);

  if (minStartDate) {
    if (momentDate.isBefore(minStartDate)) {
      return true;
    }
  }

  return momentDate.isAfter(moment().endOf('day'));
};
