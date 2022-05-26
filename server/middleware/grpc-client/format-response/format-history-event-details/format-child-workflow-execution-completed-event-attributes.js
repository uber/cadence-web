const formatPayload = require('./format-payload');

const formatChildWorkflowExecutionCompletedEventAttributes = ({
  initiatedEventId,
  result,
  startedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  initiatedEventId: parseInt(initiatedEventId),
  result: formatPayload(result),
  startedEventId: parseInt(startedEventId),
});

module.exports = formatChildWorkflowExecutionCompletedEventAttributes;
