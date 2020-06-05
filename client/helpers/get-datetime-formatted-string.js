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

export const getDateFormat = (dateFormat) => {
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

export const getTimeFormat = (timeFormat) => {
  switch (timeFormat) {
    case TIME_FORMAT_24:
      return 'HH:mm';
    case TIME_FORMAT_12:
    default:
      return 'h:mm A';
  }
};

export const getDateTimeFormat = (dateFormat, timeFormat) => `${getDateFormat(dateFormat)} ${getTimeFormat(timeFormat)}`;

export const getMomentFn = (timezone) => timezone === TIMEZONE_UTC ?
  moment.utc :
  moment;

export default ({ date, dateFormat, timeFormat, timezone }) => {
  const dateTimeFormat = getDateTimeFormat(dateFormat, timeFormat);
  const momentFn = getMomentFn(timezone);

  return momentFn(date).format(dateTimeFormat);
};
