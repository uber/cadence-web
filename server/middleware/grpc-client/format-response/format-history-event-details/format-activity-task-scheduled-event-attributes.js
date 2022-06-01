const formatPayload = require('../format-payload');
const formatPayloadMap = require('../format-payload-map');
const formatRetryPolicy = require('./format-retry-policy');
const formatTimestampToSeconds = require('../format-timestamp-to-seconds');

const formatActivityTaskScheduledEventAttributes = ({
  decisionTaskCompletedEventId,
  domain,
  header,
  heartbeatTimeout,
  input,
  retryPolicy,
  scheduleToCloseTimeout,
  scheduleToStartTimeout,
  startToCloseTimeout,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
  domain: domain || null,
  header: formatPayloadMap(header, 'fields'),
  heartbeatTimeoutSeconds: formatTimestampToSeconds(heartbeatTimeout),
  input: formatPayload(input),
  retryPolicy: formatRetryPolicy(retryPolicy),
  scheduleToCloseTimeoutSeconds: formatTimestampToSeconds(scheduleToCloseTimeout),
  scheduleToStartTimeoutSeconds: formatTimestampToSeconds(scheduleToStartTimeout),
  startToCloseTimeoutSeconds: formatTimestampToSeconds(startToCloseTimeout),
});

module.exports = formatActivityTaskScheduledEventAttributes;