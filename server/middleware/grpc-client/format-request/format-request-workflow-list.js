const formatLongToTimestamp = require('./format-long-to-timestamp');

const formatRequestWorkflowList = (payload) => {
  const { StartTimeFilter: { earliestTime, latestTime }, statusFilter, ...restOfPayload } = payload;

  return {
    ...restOfPayload,
    startTimeFilter: {
      earliestTime: formatLongToTimestamp(earliestTime),
      latestTime: formatLongToTimestamp(latestTime),
    },
    ...(statusFilter && {
      statusFilter: {
        status: `WORKFLOW_EXECUTION_CLOSE_STATUS_${statusFilter}`,
      }
    }),
  };
};

module.exports = formatRequestWorkflowList;
