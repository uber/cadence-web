const formatPayload = require('./format-payload');

const formatWorkflowExecutionTerminatedEventAttributes = ({
  details,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  details: formatPayload(details),
});

module.exports = formatWorkflowExecutionTerminatedEventAttributes;
