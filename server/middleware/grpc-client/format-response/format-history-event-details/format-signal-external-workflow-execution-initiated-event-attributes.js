const atob = require('atob');
const formatPayload = require('../format-payload');

const formatSignalExternalWorkflowExecutionInitiatedEventAttributes = ({
  control,
  decisionTaskCompletedEventId,
  input,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  control: control ? parseInt(atob(control)) : null,
  decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
  input: formatPayload(input),
});

module.exports = formatSignalExternalWorkflowExecutionInitiatedEventAttributes;
