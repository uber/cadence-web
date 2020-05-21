export default ({ isAuthorized, isWorkflowRunning }) => {
  if (!isAuthorized) {
    return true;
  }

  if (!isWorkflowRunning) {
    return true;
  }

  return false;
};
