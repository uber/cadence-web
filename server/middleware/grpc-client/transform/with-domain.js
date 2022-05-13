const withDomain = (ctx) => (payload = {}) => ({
  ...payload,
  domain: ctx.params.domain,
});

module.exports = withDomain;
