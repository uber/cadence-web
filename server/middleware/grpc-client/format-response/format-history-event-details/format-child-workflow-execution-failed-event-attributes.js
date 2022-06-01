const formatChildWorkflowExecutionFailedEventAttributes = ({
  failure,
  initiatedEventId,
  startedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  details: failure?.details || null,
  initiatedEventId: parseInt(initiatedEventId),
  reason: failure?.reason || '',
  startedEventId: parseInt(startedEventId),
});

module.exports = formatChildWorkflowExecutionFailedEventAttributes;
