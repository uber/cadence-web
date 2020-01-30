import { getKeyValuePairs } from '../../../helpers';
import { summarizeEvents } from './summarize-events';

const getEventSummary = event => {
  if (!event) {
    return event;
  }

  if (!event.details) {
    return event.details;
  }

  const { eventId, eventType } = event;

  const maps = summarizeEvents;

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

export default getEventSummary;
