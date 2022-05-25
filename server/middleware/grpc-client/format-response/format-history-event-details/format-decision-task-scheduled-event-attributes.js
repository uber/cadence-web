const formatTimestampToSeconds = require('../format-timestamp-to-seconds');

const formatDecisionTaskScheduledEventAttributes = ({
  startToCloseTimeout,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  startToCloseTimeoutSeconds: formatTimestampToSeconds(startToCloseTimeout),
});

module.exports = formatDecisionTaskScheduledEventAttributes;