const formatExternalWorkflowExecutionCancelRequestedEventAttributes = ({
  initiatedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  initiatedEventId: parseInt(initiatedEventId),
});

module.exports = formatExternalWorkflowExecutionCancelRequestedEventAttributes;
