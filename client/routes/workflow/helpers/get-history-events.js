import moment from 'moment';
import getTimeElapsedDisplay from './get-time-elapsed-display';
import getTimeStampDisplay from './get-time-stamp-display';
import getEventDetails from './get-event-details';
import getEventFullDetails from './get-event-full-details';
import getEventSummary from './get-event-summary';

const getHistoryEvents = ({ dateFormat, events, timeFormat, timezone }) => {
  if (!events) {
    return [];
  }

  return events
    .map(event => {
      const timestamp = moment(event.timestamp);

      return {
        ...event,
        timestamp,
      };
    })
    .map((event, index, eventList) => {
      const timeStampDisplay = getTimeStampDisplay({
        dateFormat,
        event,
        index,
        timeFormat,
        timezone,
      });
      const timeElapsedDisplay = getTimeElapsedDisplay({
        dateFormat,
        event,
        eventList,
        index,
        timeFormat,
        timezone,
      });

      return {
        ...event,
        timeStampDisplay,
        timeElapsedDisplay,
      };
    })
    .map(event => {
      const details = getEventDetails(event);
      const eventSummary = getEventSummary(event);
      const eventFullDetails = getEventFullDetails(event);

      return {
        ...event,
        details,
        eventSummary,
        eventFullDetails,
      };
    });
};

export default getHistoryEvents;
