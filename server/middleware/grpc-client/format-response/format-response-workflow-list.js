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
    closeStatus: closeStatus === 'WORKFLOW_EXECUTION_CLOSE_STATUS_INVALID' ? null : closeStatus.replace('WORKFLOW_EXECUTION_CLOSE_STATUS_', ''),
    closeTime: formatTimestampToDatetime(closeTime),
    execution: workflowExecution,
    executionTime: formatTimestampToDatetime(executionTime),
    historyLength: parseInt(historyLength),
    startTime: formatTimestampToDatetime(startTime)
  })),
  nextPageToken,
});

module.exports = formatResponseWorkflowList;
