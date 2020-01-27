import moment from 'moment';
import getTimeElapsedDisplay from './get-time-elapsed-display';
import getTimeStampDisplay from './get-time-stamp-display';
import getEventDetails from './get-event-details';
import getEventFullDetails from './get-event-full-details';
import getEventSummary from './get-event-summary';

const getHistoryEvents = events => {
  if (!events) {
    return [];
  }

  return events
    .map(event => {
      const details = getEventDetails(event);
      const eventSummary = getEventSummary(event);
      const eventFullDetails = getEventFullDetails(event);
      const timestamp = moment(event.timestamp);
      return Object.assign({}, event, {
        details,
        eventSummary,
        eventFullDetails,
        timestamp,
      });
    })
    .map((event, index, eventList) => {
      const timeStampDisplay = getTimeStampDisplay(event);
      const timeElapsedDisplay = getTimeElapsedDisplay(event, index, eventList);
      return Object.assign({}, event, {
        timeStampDisplay,
        timeElapsedDisplay,
      });
    });
};

export default getHistoryEvents;
