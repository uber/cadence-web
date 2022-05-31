const formatDecisionTaskCompletedEventAttributes = ({
  executionContext,
  scheduledEventId,
  startedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  executionContext: executionContext || null,
  scheduledEventId: parseInt(scheduledEventId),
  startedEventId: parseInt(startedEventId),
});

module.exports = formatDecisionTaskCompletedEventAttributes;
