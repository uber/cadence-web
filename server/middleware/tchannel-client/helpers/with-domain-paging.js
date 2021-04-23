const get = require('lodash.get');

const withDomainPaging = ctx => body => {
  const { domain } = get(ctx, 'params', {});

  return Object.assign(
    {
      domain,
      maximumPageSize: 100,
    },
    body
  );
};

module.exports = withDomainPaging;
