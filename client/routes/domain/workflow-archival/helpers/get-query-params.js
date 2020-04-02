export default ({
  endTime,
  workflowName,
  statusValue,
  startTime,
  workflowId,
}) => {
  if (!startTime || !endTime) {
    return null;
  }

  const includeStatus = statusValue !== 'CLOSED';

  return {
    endTime,
    startTime,
    ...(includeStatus && { status: statusValue }),
    ...(workflowId && { workflowId }),
    ...(workflowName && { workflowName }),
  };
};
