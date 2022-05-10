const snakeCase = require('lodash.snakecase');

const formatPayload = (payload) => {
  // TODO - do we need to recursively format payload? is it ever more than 1 level deep?
  return Object
    .keys(payload)
    .reduce((accumulator, key) => {
      const formattedKey = snakeCase(key);
      accumulator[formattedKey] = payload[key];
      return accumulator;
    }, {});
};

module.exports = formatPayload;
