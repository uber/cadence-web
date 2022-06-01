const formatPayload = require('./format-payload');

const formatActivityTaskCanceledEventAttributes = ({
  details,
  latestCancelRequestedEventId,
  scheduledEventId,
  startedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  details: formatPayload(details),
  latestCancelRequestedEventId: parseInt(latestCancelRequestedEventId),
  scheduledEventId: parseInt(scheduledEventId),
  startedEventId: parseInt(startedEventId),
});

module.exports = formatActivityTaskCanceledEventAttributes;
