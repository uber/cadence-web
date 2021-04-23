const get = require('lodash.get');

const withVerboseWorkflowExecution = ctx => body => {
  const { domain, runId, workflowId } = get(ctx, 'params', {});

  const workflowExecution = (workflowId || runId) && {
    workflowId,
    runId,
  };

  return Object.assign(
    {
      domain,
      workflowExecution,
    },
    body
  );
};

module.exports = withVerboseWorkflowExecution;
