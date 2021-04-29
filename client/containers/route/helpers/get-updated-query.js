
// omits entries from payload with empty string to be removed from original URL query params
const getUpdatedQuery = ({ payload, query }) => {
  const omittedKeys = [];
  const omittedPayload = Object.entries(payload).reduce(
    (accumulator, [key, value]) => {
      if (value === '') {
        omittedKeys.push(key);

        return accumulator;
      }

      accumulator[key] = value;

      return accumulator;
    },
    {}
  );

  const omittedQuery = Object.entries(query).reduce(
    (accumulator, [key, value]) => {
      if (omittedKeys.includes(key)) {
        return accumulator;
      }

      accumulator[key] = value;

      return accumulator;
    },
    {}
  );

  return {
    ...omittedQuery,
    ...omittedPayload,
  };
};

export default getUpdatedQuery;
