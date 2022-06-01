const formatPayload = require('../format-payload');

const formatWorkflowExecutionCompletedEventAttributes = ({
  decisionTaskCompletedEventId,
  result,
}) => ({
  decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
  result: formatPayload(result),
});

module.exports = formatWorkflowExecutionCompletedEventAttributes;