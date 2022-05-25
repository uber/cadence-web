const formatTimestampToDatetime = require('../format-timestamp-to-datetime');

const formatPrevAutoResetPoints = prevAutoResetPoints => {
  const points = prevAutoResetPoints?.points;

  if (!points) {
    return null;
  }

  return {
    points: points.map(({
      createdTime,
      expiringTime,
      ...point
    }) => ({
      ...point,
      createdTimeNano: formatTimestampToDatetime(createdTime),
      expiringTimeNano: formatTimestampToDatetime(expiringTime),
    }))
  };
};

module.exports = formatPrevAutoResetPoints;