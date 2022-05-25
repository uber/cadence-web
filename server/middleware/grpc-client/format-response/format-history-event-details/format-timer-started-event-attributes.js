const formatTimestampToSeconds = require('../format-timestamp-to-seconds');

const formatTimerStartedEventAttributes = ({
  decisionTaskCompletedEventId,
  startToFireTimeout,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
  startToFireTimeoutSeconds: formatTimestampToSeconds(startToFireTimeout),
});

module.exports = formatTimerStartedEventAttributes;