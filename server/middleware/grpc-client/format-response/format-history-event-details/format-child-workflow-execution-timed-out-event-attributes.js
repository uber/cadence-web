const formatChildWorkflowExecutionTimedOutEventAttributes = ({
  initiatedEventId,
  startedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  initiatedEventId: parseInt(initiatedEventId),
  startedEventId: parseInt(startedEventId),
});

module.exports = formatChildWorkflowExecutionTimedOutEventAttributes;
