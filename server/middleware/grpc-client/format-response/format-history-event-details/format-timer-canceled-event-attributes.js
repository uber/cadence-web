const formatTimerCanceledEventAttributes = ({
  decisionTaskCompletedEventId,
  startedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
  startedEventId: parseInt(startedEventId),
});

module.exports = formatTimerCanceledEventAttributes;
