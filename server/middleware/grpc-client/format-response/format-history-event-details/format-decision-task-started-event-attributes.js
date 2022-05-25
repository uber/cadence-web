const formatDecisionTaskStartedEventAttributes = ({
  scheduledEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  scheduledEventId: parseInt(scheduledEventId),
});

module.exports = formatDecisionTaskStartedEventAttributes;
