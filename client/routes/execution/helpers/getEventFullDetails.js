import { eventFullTransforms } from './eventFullTransforms';
import getKeyValuePairs from './getKeyValuePairs';

const getEventFullDetails = (event) => {
  if (!event) {
    return event;
  }
  const maps = eventFullTransforms;
  const item = event.eventType in maps ? maps[event.eventType](event.details) : event.details;
  const kvps = getKeyValuePairs(item);
  return Object.assign({}, item, {
    kvps,
  });
};

export default getEventFullDetails;
