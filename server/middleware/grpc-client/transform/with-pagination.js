const withPagination = (ctx) => (payload = {}) => ({
  ...payload,
  nextPageToken: '',
  pageSize: 100,
});

module.exports = withPagination;
