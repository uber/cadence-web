const formatWorkflowExecutionCancelRequestedEventAttributes = ({
  externalExecutionInfo,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  externalInitiatedEventId: externalExecutionInfo?.initiatedId ? parseInt(externalExecutionInfo.initiatedId) : null,
  externalWorkflowExecution: externalExecutionInfo?.workflowExecution,
});

module.exports = formatWorkflowExecutionCancelRequestedEventAttributes;
