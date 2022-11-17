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
  DATE_FORMAT_YYYY_MM_DD,
  DATE_FORMAT_MMM_D_YYYY,
  DATE_FORMAT_D_MMM_YYYY,
  TIME_FORMAT_12,
  TIME_FORMAT_24,
  TIMEZONE_LOCAL,
  TIMEZONE_UTC,
} from '../constants';

export const getDateFormat = dateFormat => {
  switch (dateFormat) {
    case DATE_FORMAT_YYYY_MM_DD:
      return 'YYYY-MM-DD';
    case DATE_FORMAT_D_MMM_YYYY:
      return 'D MMM, YYYY';
    case DATE_FORMAT_MMM_D_YYYY:
    default:
      return 'MMM D, YYYY';
  }
};

export const getTimeFormat = timeFormat => {
  switch (timeFormat) {
    case TIME_FORMAT_24:
      return 'HH:mm:ss';
    case TIME_FORMAT_12:
    default:
      return 'h:mm:ss A';
  }
};

export const getDateTimeFormat = (dateFormat, timeFormat) =>
  `${getDateFormat(dateFormat)} ${getTimeFormat(timeFormat)}`;

export const getMomentFn = timezone => {
  switch (timezone) {
    case TIMEZONE_UTC:
      return moment.utc;
    case TIMEZONE_LOCAL:
    default:
      return moment;
  }
};

export default ({ date, dateFormat, timeFormat, timezone }) => {
  const dateTimeFormat = getDateTimeFormat(dateFormat, timeFormat);
  const momentFn = getMomentFn(timezone);

  return momentFn(date).format(dateTimeFormat);
};
