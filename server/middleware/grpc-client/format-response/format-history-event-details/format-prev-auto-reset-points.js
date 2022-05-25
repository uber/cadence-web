const formatTimestampToDatetime = require('../format-timestamp-to-datetime');

const formatPrevAutoResetPoints = prevAutoResetPoints => {
  if (!prevAutoResetPoints?.points) {
    return null;
  }

  return {
    points: prevAutoResetPoints.points.map(({
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