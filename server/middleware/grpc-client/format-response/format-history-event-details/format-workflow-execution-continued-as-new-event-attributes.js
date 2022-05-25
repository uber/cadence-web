const formatPayload = require('./format-payload');
const formatPayloadMap = require('./format-payload-map');
const formatTimestampToSeconds = require('../format-timestamp-to-seconds');

const formatWorkflowExecutionContinuedAsNewEventAttributes = ({
  backoffStartInterval,
  decisionTaskCompletedEventId,
  executionStartToCloseTimeout,
  failure,
  header,
  input,
  memo,
  searchAttributes,
  taskStartToCloseTimeout,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  backoffStartIntervalInSeconds: formatTimestampToSeconds(backoffStartInterval),
  decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
  executionStartToCloseTimeoutSeconds: formatTimestampToSeconds(executionStartToCloseTimeout),
  failureDetails: failure?.details ?? null,
  failureReason: failure?.reason ?? null,
  header: formatPayloadMap(header, 'fields'),
  input: formatPayload(input),
  memo: formatPayloadMap(memo, 'fields'),
  searchAttributes: formatPayloadMap(searchAttributes, 'indexedFields'),
  taskStartToCloseTimeoutSeconds: formatTimestampToSeconds(taskStartToCloseTimeout),
});

module.exports = formatWorkflowExecutionContinuedAsNewEventAttributes;