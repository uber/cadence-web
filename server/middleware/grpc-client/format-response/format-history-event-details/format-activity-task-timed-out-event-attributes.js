const formatPayload = require('./format-payload');

const formatActivityTaskTimedOutEventAttributes = ({
  details,
  lastFailure,
  scheduledEventId,
  startedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  details: formatPayload(details),
  lastFailureDetails: lastFailure.details || null,
  lastFailureReason: lastFailure.reason,
  scheduledEventId: parseInt(scheduledEventId),
  startedEventId: parseInt(startedEventId),
});

module.exports = formatActivityTaskTimedOutEventAttributes;
