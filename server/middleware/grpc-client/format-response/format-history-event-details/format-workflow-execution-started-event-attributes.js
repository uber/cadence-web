const formatPayload = require('../format-payload');
const formatPayloadMap = require('../format-payload-map');
const formatRetryPolicy = require('./format-retry-policy');
const formatTimestampToSeconds = require('../format-timestamp-to-seconds');
const formatPrevAutoResetPoints = require('./format-prev-auto-reset-points');

const formatWorkflowExecutionStartedEventAttributes = ({
  continuedFailure,
  executionStartToCloseTimeout,
  firstDecisionTaskBackoff,
  input,
  memo,
  parentExecutionInfo,
  prevAutoResetPoints,
  retryPolicy,
  searchAttributes,
  taskStartToCloseTimeout,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  continuedFailureDetails: continuedFailure?.details || null,
  continuedFailureReason: continuedFailure?.reason || null,
  executionStartToCloseTimeoutSeconds: formatTimestampToSeconds(executionStartToCloseTimeout),
  firstDecisionTaskBackoffSeconds: formatTimestampToSeconds(firstDecisionTaskBackoff),
  input: formatPayload(input),
  memo: formatPayloadMap(memo, 'fields'),
  parentInitiatedEventId: parentExecutionInfo?.initiatedId ? parseInt(parentExecutionInfo.initiatedId) : null,
  parentWorkflowDomain: parentExecutionInfo?.domainName || null,
  parentWorkflowExecution: parentExecutionInfo?.workflowExecution || null,
  prevAutoResetPoints: formatPrevAutoResetPoints(prevAutoResetPoints),
  retryPolicy: formatRetryPolicy(retryPolicy),
  searchAttributes: formatPayloadMap(searchAttributes, 'indexedFields'),
  taskStartToCloseTimeoutSeconds: formatTimestampToSeconds(taskStartToCloseTimeout),
});

module.exports = formatWorkflowExecutionStartedEventAttributes;