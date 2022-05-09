const get = require('lodash.get');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// configuration
const basePath = path.resolve('./server/idl/proto');
const ProtobufSchemaDomain = 'uber/cadence/api/v1/service_domain.proto';
const ProtobufSchemaWorkflow = 'uber/cadence/api/v1/service_workflow.proto';

const ServiceDomain = 'uber.cadence.api.v1.DomainAPI';

const grpcClient = ({ peers, requestConfig }) =>
  async function (ctx, next) {
    console.log('basePath =', basePath);

    const DomainServiceDefinition = get(
      grpc.loadPackageDefinition(
        protoLoader.loadSync(path.join(basePath, ProtobufSchemaDomain), {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
          includeDirs: [basePath],
        })
      ),
      ServiceDomain
    );

    const domainService = new DomainServiceDefinition(peers, grpc.credentials.createInsecure());

    console.log('domainService = ', domainService);

    ctx.cadence = {
      archivedWorkflows: () => { }, // TODO
      closedWorkflows: () => { }, // TODO
      describeCluster: () => { }, // TODO
      describeDomain: async (body) => {
        ctx.body = await domainService.DescribeDomain(body);
      },
      describeTaskList: () => { }, // TODO
      describeWorkflow: () => { }, // TODO
      exportHistory: () => { }, // TODO
      getHistory: () => { }, // TODO
      listDomains: () => { }, // TODO
      listTaskListPartitions: () => { }, // TODO
      listWorkflows: () => { }, // TODO
      openWorkflows: () => { }, // TODO
      queryWorkflow: () => { }, // TODO
      signalWorkflow: () => { }, // TODO
      startWorkflow: () => { }, // TODO
      terminateWorkflow: () => { }, // TODO
    };

    try {
      await next();
      grpc.getClientChannel(domainService).close();
    } catch (e) {
      grpc.getClientChannel(domainService).close();
      throw e;
    }
  };

module.exports = grpcClient;
