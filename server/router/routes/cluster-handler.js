

const clusterHandler = async (ctx) => {
  // TODO - Check cached response before calling API
  // if cached, returned cache
  // if not request and then save to cache.

  ctx.body = await ctx.cadence.describeCluster();
};

module.exports = clusterHandler;
