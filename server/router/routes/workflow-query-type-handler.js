const workflowQueryTypeHandler = async (ctx) => {
  ctx.body = await ctx.cadence.queryWorkflow({
    query: {
      queryType: ctx.params.queryType,
    },
  });
};

module.exports = workflowQueryTypeHandler;
