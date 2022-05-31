const formatActivityTaskFailedEventAttributes = ({
  failure,
  scheduledEventId,
  startedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  details: failure.details || null,
  reason: failure.reason,
  scheduledEventId: parseInt(scheduledEventId),
  startedEventId: parseInt(startedEventId),
});

module.exports = formatActivityTaskFailedEventAttributes;
