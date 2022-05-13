const formatLongToTimestamp = long => ({ seconds: Math.floor(long.toNumber() / 1000000000) })

module.exports = formatLongToTimestamp;
