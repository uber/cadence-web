const formatTimestampToSeconds = timestamp => !timestamp ? 0 : parseInt(timestamp.seconds);

module.exports = formatTimestampToSeconds;
