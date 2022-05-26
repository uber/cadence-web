const formatPayload = require('./format-payload');

const formatWorkflowExecutionSignaledEventAttributes = ({
  input,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  input: formatPayload(input),
});

module.exports = formatWorkflowExecutionSignaledEventAttributes;
