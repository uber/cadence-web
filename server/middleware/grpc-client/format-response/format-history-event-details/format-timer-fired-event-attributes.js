const formatTimerFiredEventAttributes = ({
  startedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  startedEventId: parseInt(startedEventId),
});

module.exports = formatTimerFiredEventAttributes;
