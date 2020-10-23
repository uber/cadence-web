import { eventFullTransforms } from './event-full-transforms';
import getEventKvpsHighlight from './get-event-kvps-highlight';
import { getKeyValuePairs } from '~helpers';

const getEventFullDetails = ({
  event,
  workflowHistoryEventHighlightList,
  workflowHistoryEventHighlightListEnabled,
} = {}) => {
  if (!event) {
    return event;
  }

  const { eventId, eventType } = event;

  const maps = eventFullTransforms;

  const item =
    event.eventType in maps
      ? maps[event.eventType](event.details)
      : event.details;

  const { kvps, isHighlighted } = getEventKvpsHighlight({
    eventType,
    kvps: getKeyValuePairs(item),
    workflowHistoryEventHighlightList,
    workflowHistoryEventHighlightListEnabled,
  });

  return {
    ...item,
    eventId,
    eventType,
    isHighlighted,
    kvps,
  };
};

export default getEventFullDetails;
