export default ({ isAuthorized, isWorkflowRunning }) => {
  if (!isAuthorized) {
    return 'You are not authorized to terminate this workflow.';
  }

  if (!isWorkflowRunning) {
    return 'Workflow needs to be running to be able to terminate.';
  }
};
