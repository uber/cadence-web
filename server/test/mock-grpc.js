const path = require('path');
const get = require('lodash.get');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const peers = '127.0.0.1:11343';
const BASE_PATH = path.resolve('./server/idl/proto');
const MAX_MESSAGE_SIZE = 64 * 1024 * 1024;
const GRPC_OPTIONS = {
  'grpc.max_send_message_length': MAX_MESSAGE_SIZE,
  'grpc.max_receive_message_length': MAX_MESSAGE_SIZE,
};

const GRPCServiceMock = ({ methods, peers, schemaPath, servicePath }) => {
  const ServiceDefinition = get(
    grpc.loadPackageDefinition(
      protoLoader.loadSync(path.join(BASE_PATH, schemaPath), {
        bytes: String,
        defaults: true,
        enums: String,
        includeDirs: [BASE_PATH],
        longs: String,
        oneofs: true,
      })
    ),
    servicePath
  );

  return ServiceDefinition;
};

const formatRequest = (request) => Object
  .keys(request)
  .map((key) => {
    const value = request[key];
    if (value == '') {
      return { [key]: null };
    }
    return { [key]: value };
  })
  .reduce((accumulator, value) => {
    return {
      ...accumulator,
      ...value,
    };
  }, {});

const mockGRPC = (done) => {
  let currentTest;

  const setCurrentTest = (test) => {
    currentTest = test;
  }

  const domainServiceConfig = {
    peers,
    schemaPath: 'uber/cadence/api/v1/service_domain.proto',
    servicePath: 'uber.cadence.api.v1.DomainAPI',
  };
  const visibilityServiceConfig = {
    peers,
    schemaPath: 'uber/cadence/api/v1/service_visibility.proto',
    servicePath: 'uber.cadence.api.v1.VisibilityAPI',
  };
  const workflowServiceConfig = {
    peers,
    schemaPath: 'uber/cadence/api/v1/service_workflow.proto',
    servicePath: 'uber.cadence.api.v1.WorkflowAPI',
  };

  const domainServiceMock = GRPCServiceMock(domainServiceConfig);
  // const visibilityServiceMock = GRPCServiceMock(visibilityServiceConfig);
  // const workflowServiceMock = GRPCServiceMock(workflowServiceConfig);

  const handler = (method, requestName) => (call, callback) => {
    console.log('method', method);

    if (!currentTest[method]) {
      throw new Error(`unexpected request to ${req.endpoint}`);
    }

    console.log('mock = ', currentTest[method]);
    // console.log('call = ', call);
    console.log('callback = ', callback);
    console.log('body = ', call.request);

    const request = formatRequest(call.request);

    const bodyMock = currentTest[method]({ [requestName]: request }, null);

    console.log('bodyMock = ')
    console.dir(bodyMock, { depth: 10 });

    if (bodyMock instanceof Error) {
      console.log('error:', bodyMock);
      callback(bodyMock, null);
    } else if (bodyMock && bodyMock.ok === false) {
      callback(null, bodyMock.body);
    } else {
      callback(null, bodyMock);
    }
  };

  const server = new grpc.Server();
  server.addService(domainServiceMock.service, {
    ListDomains: handler('ListDomains', 'listRequest'),
    DescribeDomain: handler('DescribeDomain', 'describeRequest'),
  });

  server.bindAsync('127.0.0.1:11343', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    // setTimeout(() => {
    done();
    // }, 1300);
  });

  const client = new domainServiceMock(
    peers,
    grpc.credentials.createInsecure(),
    GRPC_OPTIONS
  );

  const closeClient = () => {
    grpc.closeClient(client);
  };

  const closeServer = () => {
    server.forceShutdown();
  };


  // const server = {
  //   close: () => {
  //     domainServiceMock.close();
  //   },
  //   listen: (port, address, callback) => {
  //     // domainServiceMock.listen(port, address, callback);
  //   },
  // };



  // visibility
  // [
  //   'ListOpenWorkflowExecutions',
  //   'ListClosedWorkflowExecutions',
  //   'ListWorkflowExecutions',
  // ].forEach(endpoint =>
  //   tchan.register(
  //     server,
  //     'WorkflowService::' + endpoint,
  //     {},
  //     handler('WorkflowService')
  //   )
  // );

  // // workflow
  // [
  //   'GetWorkflowExecutionHistory',
  //   'QueryWorkflow',
  //   'DescribeWorkflowExecution',
  //   'TerminateWorkflowExecution',
  //   'DescribeTaskList',
  // ].forEach(endpoint =>
  //   tchan.register(
  //     server,
  //     'WorkflowService::' + endpoint,
  //     {},
  //     handler('WorkflowService')
  //   )
  // );

  // // domain
  // [
  //   'ListDomains',
  //   'DescribeDomain',
  // ].forEach(endpoint =>
  //   tchan.register(
  //     server,
  //     'WorkflowService::' + endpoint,
  //     {},
  //     handler('WorkflowService')
  //   )
  // );

  return {
    client,
    closeClient,
    closeServer,
    server,
    setCurrentTest,
  }
};

module.exports = mockGRPC;
