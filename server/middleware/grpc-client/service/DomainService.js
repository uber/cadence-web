
const BaseService = require('./BaseService');

function DomainService(peers) {
  return new BaseService({
    peers,
    schemaPath: 'uber/cadence/api/v1/service_domain.proto',
    serviceName: 'uber.cadence.api.v1.DomainAPI',
  });
};

module.exports = DomainService;
