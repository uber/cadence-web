// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

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

const formatRequest = request =>
  Object.keys(request)
    .map(key => {
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

const mockGRPC = done => {
  let currentTest;

  const setCurrentTest = test => {
    currentTest = test;
  };

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

    console.log('bodyMock = ');
    console.dir(bodyMock, { depth: 10 });

    if (bodyMock instanceof Error) {
      console.log('error:', bodyMock);
      callback(bodyMock);
    } else if (bodyMock && bodyMock.ok === false) {
      callback(bodyMock.body);
    } else {
      callback(null, bodyMock);
    }
  };

  const server = new grpc.Server();

  server.addService(domainServiceMock.service, {
    ListDomains: handler('ListDomains', 'listRequest'),
    DescribeDomain: handler('DescribeDomain', 'describeRequest'),
  });

  server.bindAsync(
    '127.0.0.1:11343',
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      done();
    }
  );

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

  return {
    closeClient,
    closeServer,
    setCurrentTest,
  };
};

module.exports = mockGRPC;
