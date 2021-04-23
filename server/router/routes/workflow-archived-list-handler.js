const moment = require('moment');
const { buildQueryString } = require('../helpers');

const workflowArchivedListHandler = async (ctx) => {
  const { nextPageToken, ...query } = ctx.query || {};
  let queryString;

  if (query.queryString) {
    queryString = query.queryString;
  } else {
    const startTime = moment(query.startTime || NaN);
    const endTime = moment(query.endTime || NaN);

    ctx.assert(startTime.isValid() && endTime.isValid(), 400);
    queryString = buildQueryString(startTime, endTime, query);
  }

  ctx.body = await ctx.cadence.archivedWorkflows({
    query: queryString,
    nextPageToken: nextPageToken
      ? Buffer.from(nextPageToken, 'base64')
      : undefined,
  });
};

module.exports = workflowArchivedListHandler;
