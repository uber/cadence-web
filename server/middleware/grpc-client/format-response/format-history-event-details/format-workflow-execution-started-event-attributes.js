const formatPayload = require('./format-payload');
const formatMemo = require('./format-memo');
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
  taskStartToCloseTimeout,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  continuedFailureDetails: continuedFailure?.details ?? null,
  continuedFailureReason: continuedFailure?.reason ?? null,
  executionStartToCloseTimeoutSeconds: formatTimestampToSeconds(executionStartToCloseTimeout),
  firstDecisionTaskBackoffSeconds: formatTimestampToSeconds(firstDecisionTaskBackoff),
  input: formatPayload(input),
  memo: formatMemo(memo),
  parentInitiatedEventId: parentExecutionInfo?.initiatedId ? parseInt(parentExecutionInfo.initiatedId) : null,
  parentWorkflowDomain: parentExecutionInfo?.domainName ?? null,
  parentWorkflowExecution: parentExecutionInfo?.workflowExecution ?? null,
  prevAutoResetPoints: formatPrevAutoResetPoints(prevAutoResetPoints),
  taskStartToCloseTimeoutSeconds: formatTimestampToSeconds(taskStartToCloseTimeout),
});

module.exports = formatWorkflowExecutionStartedEventAttributes;