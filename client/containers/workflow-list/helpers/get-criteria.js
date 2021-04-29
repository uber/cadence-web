import { FILTER_MODE_ADVANCED } from '../constants';

const getCriteria = ({
  endTime,
  filterMode,
  queryString,
  startTime,
  status,
  workflowId,
  workflowName,
}) => {
  if (!startTime || !endTime) {
    return null;
  }

  if (filterMode === FILTER_MODE_ADVANCED) {
    return {
      queryString: queryString.trim(),
    };
  }

  const criteria = {
    startTime,
    endTime,
    status,
    ...(workflowId && { workflowId: workflowId.trim() }),
    ...(workflowName && { workflowName: workflowName.trim() }),
  };

  return criteria;
};

export default getCriteria;
