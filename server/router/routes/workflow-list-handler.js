const workflowListHandler = async (ctx) => {
  const q = ctx.query || {};

  ctx.body = await ctx.cadence.listWorkflows({
    query: q.queryString || undefined,
    nextPageToken: q.nextPageToken
      ? Buffer.from(q.nextPageToken, 'base64')
      : undefined,
  });
};

module.exports = workflowListHandler;
