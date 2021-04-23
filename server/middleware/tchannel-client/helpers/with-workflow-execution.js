const get = require('lodash.get');

const withWorkflowExecution = ctx => body => {
  const { domain, runId, workflowId } = get(ctx, 'params', {});

  const execution = (workflowId || runId) && {
    workflowId,
    runId,
  };

  return Object.assign(
    {
      domain,
      execution,
    },
    body
  );
};

module.exports = withWorkflowExecution;
