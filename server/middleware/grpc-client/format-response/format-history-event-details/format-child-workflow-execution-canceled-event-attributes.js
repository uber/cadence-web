const formatPayload = require('./format-payload');

const formatChildWorkflowExecutionCanceledEventAttributes = ({
  details,
  initiatedEventId,
  startedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  details: formatPayload(details),
  initiatedEventId: parseInt(initiatedEventId),
  startedEventId: parseInt(startedEventId),
});

module.exports = formatChildWorkflowExecutionCanceledEventAttributes;
