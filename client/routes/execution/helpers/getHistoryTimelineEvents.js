import getEventDetails from './getEventDetails';
import mapTimelineEvents from './mapTimelineEvents';

const getHistoryTimelineEvents = (events) =>
  mapTimelineEvents(events)
    .map((event) => {
      const details = getEventDetails(event);
      return Object.assign({}, event, {
        details,
      });
    });

export default getHistoryTimelineEvents;