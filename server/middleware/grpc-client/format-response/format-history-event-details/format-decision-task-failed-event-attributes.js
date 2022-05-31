const formatDecisionTaskFailedEventAttributes = ({
  failure,
  forkEventVersion,
  scheduledEventId,
  startedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  details: failure?.details || null,
  forkEventVersion: parseInt(forkEventVersion),
  reason: failure?.reason || '',
  scheduledEventId: parseInt(scheduledEventId),
  startedEventId: parseInt(startedEventId),
});

module.exports = formatDecisionTaskFailedEventAttributes;
