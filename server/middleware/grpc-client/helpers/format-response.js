const camelCase = require('lodash.camelcase');

const formatResponse = (response) => {
  if (!response || typeof response !== 'object') {
    return response;
  }

  if (Array.isArray(response)) {
    return response.map(formatResponse);
  }

  return Object
    .keys(response)
    .reduce((accumulator, key) => {
      const formattedKey = camelCase(key);
      const formattedValue = formatResponse(response[key]);
      accumulator[formattedKey] = formattedValue;
      return accumulator;
    }, {});
};

module.exports = formatResponse;
