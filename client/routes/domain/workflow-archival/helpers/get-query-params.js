export default ({
  endTime,
  workflowName,
  statusName,
  startTime,
  workflowId,
}) => {
  if (!startTime || !endTime) {
    return null;
  }

  const includeStatus = statusName !== 'CLOSED';

  return {
    endTime,
    startTime,
    ...(includeStatus && { status: statusName }),
    ...(workflowId && { workflowId }),
    ...(workflowName && { workflowName }),
  };
};
