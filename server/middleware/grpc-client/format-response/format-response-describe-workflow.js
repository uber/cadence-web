const formatCloseStatus = require('./format-close-status');
const formatTimestampToDatetime = require('./format-timestamp-to-datetime');
const formatTimestampToSeconds = require('./format-timestamp-to-seconds');

const formatResponseDescribeWorkflow = ({
  executionConfiguration: {
    executionStartToCloseTimeout,
    taskList,
    taskStartToCloseTimeout
  },
  workflowExecutionInfo: {
    autoResetPoints: {
      points,
    },
    closeStatus,
    closeTime,
    executionTime,
    historyLength,
    startTime,
    workflowExecution,
    ...workflowExecutionInfo
  },
  ...response
}) => ({
  ...response,
  executionConfiguration: {
    executionStartToCloseTimeoutSeconds: formatTimestampToSeconds(executionStartToCloseTimeout),
    taskList,
    taskStartToCloseTimeoutSeconds: formatTimestampToSeconds(taskStartToCloseTimeout),
  },
  workflowExecutionInfo: {
    ...workflowExecutionInfo,
    autoResetPoints: {
      points: points.map(({
        createdTime,
        expiringTime,
        ...point
      }) => ({
        ...point,
        createdTimeNano: formatTimestampToDatetime(createdTime),
        expiringTimeNano: formatTimestampToDatetime(expiringTime),
      })),
    },
    closeStatus: formatCloseStatus(closeStatus),
    closeTime: formatTimestampToDatetime(closeTime),
    execution: workflowExecution,
    executionTime: formatTimestampToDatetime(executionTime),
    historyLength: parseInt(historyLength),
    startTime: formatTimestampToDatetime(startTime),
  }
});

module.exports = formatResponseDescribeWorkflow;
