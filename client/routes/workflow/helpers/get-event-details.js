import getEventKvpsHighlight from './get-event-kvps-highlight';
import { getKeyValuePairs } from '~helpers';

const getEventDetails = ({
  event,
  workflowHistoryEventHighlightList = [],
  workflowHistoryEventHighlightListEnabled = false,
}) => {
  const { details, eventId, eventType, timeStampDisplay } = event;

  const { kvps, isHighlighted } = getEventKvpsHighlight({
    eventType,
    kvps: getKeyValuePairs({
      timestamp: timeStampDisplay,
      eventId,
      ...details,
    }),
    workflowHistoryEventHighlightList,
    workflowHistoryEventHighlightListEnabled,
  });

  return {
    ...details,
    eventId,
    eventType,
    isHighlighted,
    kvps,
    timestamp: timeStampDisplay,
  };
};

export default getEventDetails;
