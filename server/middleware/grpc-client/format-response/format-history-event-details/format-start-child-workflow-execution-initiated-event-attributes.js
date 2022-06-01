const atob = require('atob');
const formatPayload = require('./format-payload')
const formatPayloadMap = require('./format-payload-map');
const formatRetryPolicy = require('./format-retry-policy');
const formatTimestampToSeconds = require('../format-timestamp-to-seconds');

const formatStartChildWorkflowExecutionInitiatedEventAttributes = ({
  control,
  decisionTaskCompletedEventId,
  delayStart,
  executionStartToCloseTimeout,
  header,
  input,
  memo,
  retryPolicy,
  searchAttributes,
  taskStartToCloseTimeout,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  control: control ? parseInt(atob(control)) : null,
  decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
  delayStartSeconds: formatTimestampToSeconds(delayStart),
  executionStartToCloseTimeoutSeconds: formatTimestampToSeconds(executionStartToCloseTimeout),
  header: formatPayloadMap(header, 'fields'),
  input: formatPayload(input),
  memo: formatPayloadMap(memo, 'fields'),
  retryPolicy: formatRetryPolicy(retryPolicy),
  searchAttributes: formatPayloadMap(searchAttributes, 'indexedFields'),
  taskStartToCloseTimeoutSeconds: formatTimestampToSeconds(taskStartToCloseTimeout),
});

module.exports = formatStartChildWorkflowExecutionInitiatedEventAttributes;