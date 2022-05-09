const get = require('lodash.get');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const BASE_PATH = path.resolve('./server/idl/proto');

function BaseService({ peers, schemaPath, serviceName }) {
  const ServiceDefinition = get(
    grpc.loadPackageDefinition(
      protoLoader.loadSync(path.join(BASE_PATH, schemaPath), {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
        includeDirs: [BASE_PATH],
      })
    ),
    serviceName
  );

  console.log(serviceName, ': ', ServiceDefinition);

  const service = new ServiceDefinition(peers, grpc.credentials.createInsecure());

  return {
    ...service,
    close: () => grpc.getClientChannel(service).close(),
  };
};

module.exports = BaseService;
