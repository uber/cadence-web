import { getDatetimeFormattedString } from '~helpers';

const getTimeStampDisplay = ({
  dateFormat,
  event: { timestamp = null },
  index,
  timeFormat,
  timezone,
}) =>
  !timestamp || index === -1
    ? ''
    : getDatetimeFormattedString({
        date: timestamp,
        dateFormat,
        timeFormat,
        timezone,
      });

export default getTimeStampDisplay;
