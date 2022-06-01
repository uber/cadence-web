const formatPayload = require('../format-payload');

const formatActivityTaskCompletedEventAttributes = ({
  result,
  scheduledEventId,
  startedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  result: formatPayload(result),
  scheduledEventId: parseInt(scheduledEventId),
  startedEventId: parseInt(startedEventId),
});

module.exports = formatActivityTaskCompletedEventAttributes;