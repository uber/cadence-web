const withWorkflowExecution = ctx => payload => ({
  ...payload,
  workflowExecution: {
    workflowId: ctx.params.workflowId,
    runId: ctx.params.runId,
  },
});

module.exports = withWorkflowExecution;
