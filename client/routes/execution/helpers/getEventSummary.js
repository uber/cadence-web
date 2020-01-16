// TODO - move these transforms into helpers folder
import { summarizeEvents } from './summarizeEvents';
import { getKeyValuePairs } from '../../../helpers';

const getEventSummary = event => {
  if (!event) {
    return event;
  }
  const { eventId, eventType } = event;
  const maps = summarizeEvents;
  const item = event.eventType in maps ? maps[event.eventType](event.details) : event.details;
  const kvps = getKeyValuePairs(item);
  return Object.assign({}, item, {
    eventId,
    eventType,
    kvps,
  });
};

export default getEventSummary;
