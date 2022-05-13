const formatTimestampToDatetime = timestamp => !timestamp ? null : new Date((parseInt(timestamp.seconds) * 1000) + (parseInt(timestamp.nanos) / 1e6));

module.exports = formatTimestampToDatetime;
