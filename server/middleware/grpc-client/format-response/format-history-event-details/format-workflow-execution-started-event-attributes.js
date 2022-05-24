const formatTimestampToDatetime = require('../format-timestamp-to-datetime');
const formatTimestampToSeconds = require('../format-timestamp-to-seconds');

const formatWorkflowExecutionStartedEventAttributes = ({
  executionStartToCloseTimeout,
  firstDecisionTaskBackoff,
  parentExecutionInfo,
  prevAutoResetPoints,
  taskStartToCloseTimeout,
  ...eventAttributes
}) => {
  return {
    ...eventAttributes,
    executionStartToCloseTimeoutSeconds: formatTimestampToSeconds(executionStartToCloseTimeout),
    firstDecisionTaskBackoffSeconds: formatTimestampToSeconds(firstDecisionTaskBackoff),
    parentInitiatedEventId: parentExecutionInfo?.initiatedId ? parseInt(parentExecutionInfo.initiatedId) : null,
    parentWorkflowDomain: parentExecutionInfo?.domainName ?? null,
    parentWorkflowExecution: parentExecutionInfo?.workflowExecution ?? null,
    prevAutoResetPoints: prevAutoResetPoints?.points ? {
      points: prevAutoResetPoints.points.map(({
        createdTime,
        expiringTime,
        ...point
      }) => ({
        ...point,
        createdTimeNano: formatTimestampToDatetime(createdTime),
        expiringTimeNano: formatTimestampToDatetime(expiringTime),
      }))
    } : null,
    taskStartToCloseTimeoutSeconds: formatTimestampToSeconds(taskStartToCloseTimeout)
  };
};

module.exports = formatWorkflowExecutionStartedEventAttributes;