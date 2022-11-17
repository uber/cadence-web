// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const path = require('path');
const TChannel = require('tchannel');
const TChannelAsThrift = require('tchannel/as/thrift');

const mockTChannel = done => {
  let currentTest;

  const setCurrentTest = test => {
    currentTest = test;
  };

  server = new TChannel({ serviceName: 'cadence-frontend' });

  client = new TChannel();
  const cadenceChannel = client.makeSubChannel({
    serviceName: 'cadence-frontend',
  });
  const tchan = TChannelAsThrift({
    channel: cadenceChannel,
    entryPoint: path.join(__dirname, '../idl/thrift/cadence.thrift'),
  });
  const adminTChannel = TChannelAsThrift({
    channel: cadenceChannel,
    entryPoint: path.join(__dirname, '../idl/thrift/admin.thrift'),
  });

  const handler = serviceName => (ctx, req, head, body, cb) => {
    const mockName = req.endpoint.replace(`${serviceName}::`, '');

    if (!currentTest[mockName]) {
      throw new Error(`unexpected request to ${req.endpoint}`);
    }

    const bodyMock = currentTest[mockName](body, req);

    if (bodyMock instanceof Error) {
      cb(bodyMock);
    } else if (bodyMock && bodyMock.ok === false) {
      cb(null, bodyMock);
    } else {
      cb(null, { ok: true, head, body: bodyMock });
    }
  };

  [
    'ListOpenWorkflowExecutions',
    'ListClosedWorkflowExecutions',
    'ListWorkflowExecutions',
    'GetWorkflowExecutionHistory',
    'QueryWorkflow',
    'DescribeWorkflowExecution',
    'TerminateWorkflowExecution',
    'SignalWorkflowExecution',
    'ListDomains',
    'DescribeDomain',
    'DescribeTaskList',
  ].forEach(endpoint =>
    tchan.register(
      server,
      'WorkflowService::' + endpoint,
      {},
      handler('WorkflowService')
    )
  );

  adminTChannel.register(
    server,
    'AdminService::DescribeCluster',
    {},
    handler('AdminService')
  );

  server.listen(11343, '127.0.0.1', () => done());

  const closeClient = () => {
    client.close();
  };

  const closeServer = () => {
    server.close();
  };

  return {
    closeClient,
    closeServer,
    setCurrentTest,
  };
};

module.exports = mockTChannel;
