export default (query, updatedRange) => {
  const { endTime, startTime, range, ...updatedQuery } = query;

  if (typeof updatedRange === 'string') {
    updatedQuery.range = updatedRange;
  } else if (
    typeof updatedRange === 'object' &&
    updatedRange.endTime &&
    updatedRange.startTime
  ) {
    updatedQuery.endTime = updatedRange.endTime.toISOString();
    updatedQuery.startTime = updatedRange.startTime.toISOString();
  }

  return updatedQuery;
};
