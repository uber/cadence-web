const formatWorkflowExecutionCancelRequestedEventAttributes = ({
  externalExecutionInfo: {
    initiatedId,
    workflowExecution,
  },
  ...eventAttributes
}) => ({
  ...eventAttributes,
  externalInitiatedEventId: parseInt(initiatedId),
  externalWorkflowExecution: workflowExecution,
});

module.exports = formatWorkflowExecutionCancelRequestedEventAttributes;
