const formatRequestName = requestName => `${requestName ? requestName + 'R' : 'r'}equest`;

module.exports = formatRequestName;
