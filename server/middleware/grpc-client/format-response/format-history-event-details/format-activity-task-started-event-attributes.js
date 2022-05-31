const formatActivityTaskStartedEventAttributes = ({
  lastFailure,
  scheduledEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  lastFailureDetails: lastFailure?.details || null,
  lastFailureReason: lastFailure?.reason || '',
  scheduledEventId: parseInt(scheduledEventId),
});

module.exports = formatActivityTaskStartedEventAttributes;
