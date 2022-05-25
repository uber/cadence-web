const formatPayload = require('./format-payload');

const formatMemo = (memo) => {
  if (!memo?.fields) {
    return null;
  }

  return {
    fields: Object
      .keys(memo.fields)
      .map((key) => ({
        [key]: formatPayload(memo.fields[key]),
      }))
      .reduce((accumulator, value) => ({
        ...accumulator,
        ...value,
      }), {}),
  }
};

module.exports = formatMemo;
