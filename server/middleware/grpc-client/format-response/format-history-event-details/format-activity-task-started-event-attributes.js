const formatActivityTaskStartedEventAttributes = ({
  lastFailure: {
    details: lastFailureDetails,
    reason: lastFailureReason,
  },
  scheduledEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  lastFailureDetails: lastFailureDetails ? lastFailureDetails : null,
  lastFailureReason,
  scheduledEventId: parseInt(scheduledEventId),
});

module.exports = formatActivityTaskStartedEventAttributes;
