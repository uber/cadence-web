const Long = require('long');
const losslessJSON = require('lossless-json');

const cliTransform = item => {
  if (!item || typeof item !== 'object') {
    return item;
  }

  Object.entries(item).forEach(([subkey, subvalue]) => {
    if (subvalue && typeof subvalue.unsigned === 'boolean') {
      item[subkey] = new losslessJSON.LosslessNumber(
        Long.fromValue(subvalue).toString()
      );
    } else if (Buffer.isBuffer(subvalue)) {
      item[subkey] = subvalue.toString('base64');
    } else if (Array.isArray(subvalue)) {
      subvalue.forEach(cliTransform);
    } else if (subvalue && typeof subvalue === 'object') {
      cliTransform(subvalue);
    } else if (subvalue === null || subvalue === undefined) {
      delete item[subkey];
    }
  });

  return item;
}

module.exports = cliTransform;
