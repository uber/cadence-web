const domainListHandler = async (ctx) => {
  ctx.body = await ctx.cadence.listDomains({
    pageSize: 50,
    nextPageToken: ctx.query.nextPageToken
      ? Buffer.from(ctx.query.nextPageToken, 'base64')
      : undefined,
  });
};

module.exports = domainListHandler;
