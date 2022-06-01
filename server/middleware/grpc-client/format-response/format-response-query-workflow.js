const formatPayload = require('./format-payload');

const formatResponseQueryWorkflow = ({
  queryResult,
  ...response
}) => ({
  ...response,
  queryResult: formatPayload(queryResult),
});

module.exports = formatResponseQueryWorkflow;
