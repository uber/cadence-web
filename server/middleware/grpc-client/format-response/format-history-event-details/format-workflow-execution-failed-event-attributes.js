const formatWorkflowExecutionFailedEventAttributes = ({
  failure,
  decisionTaskCompletedEventId,
}) => ({
  decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
  details: failure?.details || null,
  reason: failure?.reason || '',
});

module.exports = formatWorkflowExecutionFailedEventAttributes;
