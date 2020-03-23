const getSummaryWorkflowStatus = ({
  isWorkflowRunning,
  workflow,
  workflowCompletedEvent,
}) => {
  if (isWorkflowRunning) {
    return 'running';
  }

  if (!workflowCompletedEvent) {
    return (
      (workflow && workflow.workflowExecutionInfo.closeStatus) ||
      'running'
    ).toLowerCase();
  }

  if (workflowCompletedEvent.eventType === 'WorkflowExecutionContinuedAsNew') {
    return {
      to: {
        name: 'workflow/summary',
        params: {
          runId: workflowCompletedEvent.details.newExecutionRunId,
        },
      },
      text: 'Continued As New',
      status: 'continued-as-new',
    };
  }

  return workflowCompletedEvent.eventType
    .replace('WorkflowExecution', '')
    .toLowerCase();
};

export default getSummaryWorkflowStatus;
