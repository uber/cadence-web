const formatCloseStatus = require('./format-close-status');
const formatTimestampToDatetime = require('./format-timestamp-to-datetime');

const formatResponseWorkflowList = ({ executions, nextPageToken }) => ({
  executions: executions.map(({
    closeStatus,
    closeTime,
    executionTime,
    historyLength,
    startTime,
    workflowExecution,
    ...execution
  }) => ({
    ...execution,
    closeStatus: formatCloseStatus(closeStatus),
    closeTime: formatTimestampToDatetime(closeTime),
    execution: workflowExecution,
    executionTime: formatTimestampToDatetime(executionTime),
    historyLength: parseInt(historyLength),
    startTime: formatTimestampToDatetime(startTime)
  })),
  nextPageToken,
});

module.exports = formatResponseWorkflowList;
