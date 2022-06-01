const atob = require('atob');

const formatRequestCancelExternalWorkflowExecutionFailedEventAttributes = ({
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

module.exports = formatRequestCancelExternalWorkflowExecutionFailedEventAttributes;
