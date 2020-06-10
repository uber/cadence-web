import getEventDetails from './get-event-details';
import mapTimelineEvents from './map-timeline-events';

const getHistoryTimelineEvents = ({ historyEvents }) =>
  mapTimelineEvents(historyEvents).map(event => {
    const details = getEventDetails(event);

    return { ...event, details };
  });

export default getHistoryTimelineEvents;
