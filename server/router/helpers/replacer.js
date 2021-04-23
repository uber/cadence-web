const replacer = (key, value) => {
  if (value && value.type && value.type === 'Buffer') {
    return Buffer.from(value)
      .toString()
      .replace(/["]/g, '')
      .trim();
  }

  return value;
};

module.exports = replacer;
