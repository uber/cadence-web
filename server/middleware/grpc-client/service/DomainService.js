
const BaseService = require('./BaseService');

function DomainService({ peers, requestConfig }) {
  return new BaseService({
    peers,
    requestConfig,
    schemaPath: 'uber/cadence/api/v1/service_domain.proto',
    servicePath: 'uber.cadence.api.v1.DomainAPI',
  });
};

module.exports = DomainService;
