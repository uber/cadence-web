const withPagination = (ctx) => (payload = {}) => ({
  ...payload,
  pageSize: 1000,
});

module.exports = withPagination;
