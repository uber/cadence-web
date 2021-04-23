const workflowQueryHandler = async (ctx) => {
  // workaround implementation until https://github.com/uber/cadence/issues/382 is resolved
  try {
    await ctx.cadence.queryWorkflow({
      query: {
        queryType: '__cadence_web_list',
      },
    });

    ctx.throw(500);
  } catch (e) {
    ctx.body = ((e.message || '').match(
      /(KnownQueryTypes|knownTypes)=\[(.*)\]/
    ) || [null, null, ''])[2]
      .split(/, | /)
      .filter(q => q);
  }
};

module.exports = workflowQueryHandler;
