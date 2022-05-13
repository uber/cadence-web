const withPagination = (ctx) => (payload = {}) => ({
  ...payload,
  nextPageToken: '',
  pageSize: 1000,
});

module.exports = withPagination;
