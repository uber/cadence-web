const atob = require('atob');
const parseJsonLines = require('../../../helpers/parse-json-lines');

const formatInputPayload = (
  payload
) => {
  const data = payload?.data;
  
  if (!data) {
    return null;
  }

  const parsedData = atob(data);
  return parseJsonLines(parsedData);
};

module.exports = formatInputPayload;
