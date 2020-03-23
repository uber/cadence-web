import { shortName } from '~helpers';

const workflowLink = (d, short) => {
  const text = [
    d.workflowType ? shortName(d.workflowType.name) : '',
    short ? '' : d.workflowExecution.workflowId,
  ]
    .filter(x => x)
    .join(' - ');

  return {
    routeLink: {
      name: 'workflow/summary',
      params: {
        domain: d.domain,
        workflowId: d.workflowExecution.workflowId,
        runId: d.workflowExecution.runId,
      },
    },
    text,
  };
};

export default workflowLink;
