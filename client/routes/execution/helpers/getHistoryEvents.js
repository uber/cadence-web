import moment from 'moment';
import getTimeElapsedDisplay from './getTimeElapsedDisplay';
import getTimeStampDisplay from './getTimeStampDisplay';
import getEventDetails from './getEventDetails';
import getEventFullDetails from './getEventFullDetails';
import getEventSummary from './getEventSummary';

const getHistoryEvents = (events) => {
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
    // TODO - not ideal solution but will do for now and come back and refactor later...
    .map((event, index, eventList) => {
      const timeStampDisplay = getTimeStampDisplay(event);
      const timeElapsedDisplay = getTimeElapsedDisplay(event, index, eventList);
      return Object.assign({}, event, {
        timeStampDisplay,
        timeElapsedDisplay
      });
    });
};

export default getHistoryEvents;