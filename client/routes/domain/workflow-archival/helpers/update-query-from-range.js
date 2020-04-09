export default ({
  query: { endTime, startTime, range, ...query } = {},
  updatedRange,
}) => {
  if (typeof updatedRange === 'string') {
    query.range = updatedRange;
  } else if (
    typeof updatedRange === 'object' &&
    updatedRange.endTime &&
    updatedRange.startTime
  ) {
    query.endTime = updatedRange.endTime.toISOString();
    query.startTime = updatedRange.startTime.toISOString();
  }

  return query;
};
