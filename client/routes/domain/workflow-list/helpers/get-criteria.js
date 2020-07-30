const getCriteria = ({
  endTime,
  queryString,
  startTime,
  statusName: status,
  workflowId,
  workflowName,
}) => {
  if (!startTime || !endTime) {
    return null;
  }

  const includeStatus = !['OPEN', 'CLOSED'].includes(status);

  const criteria = {
    startTime,
    endTime,
    ...(queryString && { queryString }),
    ...(includeStatus && { status }),
    ...(workflowId && { workflowId }),
    ...(workflowName && { workflowName }),
  };

  return criteria;
};

export default getCriteria;
