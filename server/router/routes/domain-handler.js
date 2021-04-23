const domainHandler = async (ctx) => {
  ctx.body = await ctx.cadence.describeDomain({ name: ctx.params.domain });
};

module.exports = domainHandler;
