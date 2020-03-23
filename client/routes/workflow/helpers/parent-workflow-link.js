export default function(wfStartDetails) {
  if (wfStartDetails && wfStartDetails.parentWorkflowExecution) {
    return {
      to: {
        name: 'workflow/summary',
        params: {
          domain: wfStartDetails.parentWorkflowDomain,
          workflowId: wfStartDetails.parentWorkflowExecution.workflowId,
          runId: wfStartDetails.parentWorkflowExecution.runId,
        },
      },
      text: wfStartDetails.parentWorkflowExecution.workflowId,
    };
  }

  return null;
}
