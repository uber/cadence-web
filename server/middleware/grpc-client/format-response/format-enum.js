const formatEnum = (value, prefix) => value.includes('INVALID')
  ? null
  : value.replace(`${prefix}_`, '');

module.exports = formatEnum;
