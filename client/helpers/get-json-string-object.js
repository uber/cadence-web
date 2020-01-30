import getStringElipsis from './get-string-elipsis';

const getJsonStringObject = value => {
  const jsonStringFull = value ? JSON.stringify(value, null, 2) : '';
  const jsonStringDisplay = value ? getStringElipsis(jsonStringFull) : '';

  return {
    jsonStringDisplay,
    jsonStringFull,
  };
};

export default getJsonStringObject;
