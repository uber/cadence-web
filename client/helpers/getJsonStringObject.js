import getStringElipsis from './getStringElipsis';

const getJsonStringObject = (value) => {
  const jsonStringFull = JSON.stringify(value, null, 2);
  const jsonStringDisplay = getStringElipsis(jsonStringFull);
  return {
    jsonStringDisplay,
    jsonStringFull
  };
};

export default getJsonStringObject;