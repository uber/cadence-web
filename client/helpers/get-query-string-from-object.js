const getQueryStringFromObject = (params = {}) => {
  const paramKeys = Object.keys(params);
  if (paramKeys.length === 0) {
    return '';
  }
  return '?' + paramKeys.map((queryName) =>
    encodeURIComponent(queryName) + '=' + encodeURIComponent(params[queryName])
  ).join('&');
};

export default getQueryStringFromObject;
