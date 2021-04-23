const workflowTerminateHandler = async (ctx) => {
  ctx.body = await ctx.cadence.terminateWorkflow({
    reason: ctx.request.body && ctx.request.body.reason,
  });
};

module.exports = workflowTerminateHandler;
