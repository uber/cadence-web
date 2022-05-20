const formatTimestampToDatetime = require('./format-timestamp-to-datetime');

const formatResponseDescribeTaskList = ({ pollers }) => ({
  pollers: pollers.map(({
    lastAccessTime,
    ...poller
  }) => ({
    ...poller,
    lastAccessTime: formatTimestampToDatetime(lastAccessTime),
  })),
});

module.exports = formatResponseDescribeTaskList;