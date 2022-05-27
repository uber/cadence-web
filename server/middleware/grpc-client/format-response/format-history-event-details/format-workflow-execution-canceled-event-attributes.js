const formatPayload = require('./format-payload');

const formatWorkflowExecutionCanceledEventAttributes = ({
  decisionTaskCompletedEventId,
  details,
}) => ({
  decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
  details: formatPayload(details),
});

module.exports = formatWorkflowExecutionCanceledEventAttributes;
