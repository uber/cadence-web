const formatDecisionTaskTimedOutEventAttributes = ({
  forkEventVersion,
  scheduledEventId,
  startedEventId,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  forkEventVersion: parseInt(forkEventVersion),
  scheduledEventId: parseInt(scheduledEventId),
  startedEventId: parseInt(startedEventId),
});

module.exports = formatDecisionTaskTimedOutEventAttributes;
