import moment from 'moment';

const getTimeElapsedDisplay = (event, index, eventList) => {
  const { timestamp } = event;
  if (!timestamp || index === -1) {
    return '';
  }

  if (index === 0) {
    return timestamp.format('MMM Do h:mm:ss a');
  }

  let deltaFromPrev = moment.duration(timestamp - eventList[index - 1].timestamp),
    elapsed = moment.duration(timestamp - eventList[0].timestamp).format();

  if (deltaFromPrev.asSeconds() >= 1) {
    elapsed += ` (+${deltaFromPrev.format()})`;
  }
  return elapsed;
};

export default getTimeElapsedDisplay;
