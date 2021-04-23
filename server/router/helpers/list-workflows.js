const moment = require('moment');
const momentToLong = require('./moment-to-long');

async function listWorkflows(state, ctx) {
  const q = ctx.query || {},
    startTime = moment(q.startTime || NaN),
    endTime = moment(q.endTime || NaN);

  ctx.assert(startTime.isValid() && endTime.isValid(), 400);

  ctx.body = await ctx.cadence[state + 'Workflows']({
    StartTimeFilter: {
      earliestTime: momentToLong(startTime),
      latestTime: momentToLong(endTime),
    },
    typeFilter: q.workflowName ? { name: q.workflowName } : undefined,
    executionFilter: q.workflowId ? { workflowId: q.workflowId } : undefined,
    statusFilter: q.status || undefined,
    nextPageToken: q.nextPageToken
      ? Buffer.from(q.nextPageToken, 'base64')
      : undefined,
  });
}

module.exports = listWorkflows;
