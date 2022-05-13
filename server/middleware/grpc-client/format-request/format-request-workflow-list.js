const formatLongToTimestamp = require('./format-long-to-timestamp');

const formatRequestWorkflowList = (payload) => {
  const { StartTimeFilter: { earliestTime, latestTime }, ...restOfPayload } = payload;

  // TODO - Need to pass other filter parameters
  // e.g. workflowID, workflowType
  // not sure how it behaves when both are passed?

  return {
    ...restOfPayload,
    startTimeFilter: {
      earliestTime: formatLongToTimestamp(earliestTime),
      latestTime: formatLongToTimestamp(latestTime),
    },
    // executionFilter: {
    //   workflowId: 'cadence.canary.cron',
    //   //   runId: '2ba91e9e-53a8-4b52-8fa8-01e403635efe',
    // },
  };
};

module.exports = formatRequestWorkflowList;
