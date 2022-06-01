const formatCancelTimerFailedEventAttributes = ({
  decisionTaskCompletedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
});

module.exports = formatCancelTimerFailedEventAttributes;
