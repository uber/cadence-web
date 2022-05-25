const formatTimestampToSeconds = require('../format-timestamp-to-seconds');

const formatRetryPolicy = retryPolicy => {
  if (!retryPolicy) {
    return null;
  }

  const {
    expirationInterval,
    initialInterval,
    maximumInterval,
    ...rest
  } = retryPolicy;

  return {
    expirationIntervalInSeconds: formatTimestampToSeconds(expirationInterval),
    initialIntervalInSeconds: formatTimestampToSeconds(initialInterval),
    maximumIntervalInSeconds: formatTimestampToSeconds(maximumInterval),
    ...rest,
  }
};

module.exports = formatRetryPolicy;
