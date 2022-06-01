const atob = require('atob');

const formatSignalExternalWorkflowExecutionFailedEventAttributes = ({
  control,
  decisionTaskCompletedEventId,
  initiatedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  control: control ? parseInt(atob(control)) : null,
  decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
  initiatedEventId: parseInt(initiatedEventId),
});

module.exports = formatSignalExternalWorkflowExecutionFailedEventAttributes;
