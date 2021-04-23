const workflowSignalHandler = async (ctx) => {
  ctx.body = await ctx.cadence.signalWorkflow({
    signalName: ctx.params.signal,
  });
};

module.exports = workflowSignalHandler;
