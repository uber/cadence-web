const atob = require('atob');
const formatInput = input => {
  const data = input?.data;
  if (!data) {
    return null;
  }

  const parsedData = atob(input.data);

  // try parsing as JSON
  try {
    const parsedJson = JSON.parse(parsedData);
    return parsedJson;
  } catch (e) {
    // otherwise return as an Array
    return parsedData
      .replace(/"/g, '')
      .split('\n')
      .filter(Boolean)
  }
}

module.exports = formatInput;
