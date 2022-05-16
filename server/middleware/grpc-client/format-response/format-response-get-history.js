const formatHistoryEventDetails = require('./format-history-event-details');
const formatHistoryEventType = require('./format-history-event-type');
const formatTimestampToDatetime = require('./format-timestamp-to-datetime');

const formatResponseGetHistory = ({
  history: {
    events,
  },
  ...response
}) => ({
  ...response,
  history: {
    events: events.map(({
      eventId,
      eventTime,
      ...event
    }) => ({
      ...event,
      ...formatHistoryEventDetails(event),
      eventType: formatHistoryEventType(event),
      eventId: parseInt(eventId),
      timestamp: formatTimestampToDatetime(eventTime),
    })),
  },
});

module.exports = formatResponseGetHistory;
