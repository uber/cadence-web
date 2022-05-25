const atob = require('atob');
const formatInput = input => input?.data
  ? atob(input.data)
    .replace(/"/g, '')
    .split('\n')
    .filter(Boolean)
  : null;

module.exports = formatInput;
