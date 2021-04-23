const { mapHistoryResponse } = require('../helpers');

const workflowHistoryHandler = async (ctx) => {
  const q = ctx.query || {};

  ctx.body = await ctx.cadence.getHistory({
    nextPageToken: q.nextPageToken
      ? Buffer.from(q.nextPageToken, 'base64')
      : undefined,
    waitForNewEvent: 'waitForNewEvent' in q ? true : undefined,
  });

  ctx.body.history.events = mapHistoryResponse(ctx.body.history);
};

module.exports = workflowHistoryHandler;
