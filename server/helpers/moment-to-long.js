const Long = require('long');

const momentToLong = m => Long.fromValue(m.unix()).mul(1000000000);

module.exports = momentToLong;
