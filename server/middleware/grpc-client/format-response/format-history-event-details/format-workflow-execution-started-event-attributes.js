const formatInput = require('./format-input');
const formatTimestampToDatetime = require('../format-timestamp-to-datetime');
const formatTimestampToSeconds = require('../format-timestamp-to-seconds');

const formatWorkflowExecutionStartedEventAttributes = ({
  continuedFailure,
  executionStartToCloseTimeout,
  firstDecisionTaskBackoff,
  input,
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
  input: formatInput(input),
  parentInitiatedEventId: parentExecutionInfo?.initiatedId ? parseInt(parentExecutionInfo.initiatedId) : null,
  parentWorkflowDomain: parentExecutionInfo?.domainName ?? null,
  parentWorkflowExecution: parentExecutionInfo?.workflowExecution ?? null,
  prevAutoResetPoints: prevAutoResetPoints?.points
    ? {
      points: prevAutoResetPoints.points.map(({
        createdTime,
        expiringTime,
        ...point
      }) => ({
        ...point,
        createdTimeNano: formatTimestampToDatetime(createdTime),
        expiringTimeNano: formatTimestampToDatetime(expiringTime),
      }))
    }
    : null,
  taskStartToCloseTimeoutSeconds: formatTimestampToSeconds(taskStartToCloseTimeout),
});

module.exports = formatWorkflowExecutionStartedEventAttributes;