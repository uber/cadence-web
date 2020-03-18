import { eventFullTransforms } from './event-full-transforms';
import { getKeyValuePairs } from '~helpers';

const getEventFullDetails = event => {
  if (!event) {
    return event;
  }

  const { eventId, eventType } = event;

  const maps = eventFullTransforms;

  const item =
    event.eventType in maps
      ? maps[event.eventType](event.details)
      : event.details;

  const kvps = getKeyValuePairs(item);

  return {
    ...item,
    eventId,
    eventType,
    kvps,
  };
};

export default getEventFullDetails;
