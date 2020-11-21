export default ({
  endTime,
  workflowName,
  statusValue,
  startTime,
  workflowId,
  isDateRangeFilterSupported,
  isCloseStatusFilterSupported,
}) => {
  if (isDateRangeFilterSupported) {
    // start and end time must be set when supported
    if (!startTime || !endTime) {
      return null;
    }
  }

  const includeStatus = isCloseStatusFilterSupported && statusValue !== '-1';

  const queryParams = {
    ...(isDateRangeFilterSupported && { endTime }),
    ...(isDateRangeFilterSupported && { startTime }),
    ...(includeStatus && { status: statusValue }),
    ...(workflowId && { workflowId }),
    ...(workflowName && { workflowName }),
  };

  // Represent empty query param with null
  return Object.keys(queryParams).length > 0 ? queryParams : null;
};
