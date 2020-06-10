import moment from 'moment';
import { getDatetimeFormattedString } from '~helpers';

const getTimeElapsedDisplay = ({
  dateFormat,
  event: { timestamp = null },
  eventList,
  index,
  timeFormat,
  timezone,
}) => {
  if (!timestamp || index === -1) {
    return '';
  }

  if (index === 0) {
    return getDatetimeFormattedString({
      date: timestamp,
      dateFormat,
      timeFormat,
      timezone,
    });
  }

  const deltaFromPrev = moment.duration(
    timestamp - eventList[index - 1].timestamp
  );
  let elapsed = moment.duration(timestamp - eventList[0].timestamp).format();

  if (deltaFromPrev.asSeconds() >= 1) {
    elapsed += ` (+${deltaFromPrev.format()})`;
  }

  return elapsed;
};

export default getTimeElapsedDisplay;
