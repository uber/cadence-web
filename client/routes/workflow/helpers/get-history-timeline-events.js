import getEventDetails from './get-event-details';
import mapTimelineEvents from './map-timeline-events';

const getHistoryTimelineEvents = events =>
  mapTimelineEvents(events).map(event => {
    const details = getEventDetails(event);

    return { ...event, details };
  });

export default getHistoryTimelineEvents;
