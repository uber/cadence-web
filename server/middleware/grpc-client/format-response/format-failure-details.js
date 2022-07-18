const atob = require('atob');

const formatFailureDetails = failure => {
  if (!failure?.details) {
    return null;
  }

  const decodedFailureDetails = atob(failure.details);

  try {
    return JSON.parse(decodedFailureDetails);
  } catch (e) {
    return decodedFailureDetails;
  }
};

module.exports = formatFailureDetails;
