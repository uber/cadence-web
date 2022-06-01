const formatPayload = require('../format-payload');

const formatPayloadMap = (map, fieldKey) => {
  if (!map?.[fieldKey]) {
    return null;
  }

  return {
    [fieldKey]: Object
      .keys(map[fieldKey])
      .map((key) => ({
        [key]: formatPayload(map[fieldKey][key]),
      }))
      .reduce((accumulator, value) => ({
        ...accumulator,
        ...value,
      }), {}),
  };
};

module.exports = formatPayloadMap;