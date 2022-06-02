// Copyright (c) 2017-2022 Uber Technologies Inc.
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
const supertest = require('supertest');
const TChannel = require('tchannel');
const TChannelAsThrift = require('tchannel/as/thrift');
const Long = require('long');
const { TRANSPORT_CLIENT_TYPE_DEFAULT } = require('../constants');

let server, currTest, client, app;

global.should = require('chai').should();

global.dateToLong = d => Long.fromValue(Number(new Date(d))).mul(1000000);

before(function (done) {
  if (TRANSPORT_CLIENT_TYPE_DEFAULT === 'tchannel') {
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

      if (!currTest[mockName]) {
        throw new Error(`unexpected request to ${req.endpoint}`);
      }

      const bodyMock = currTest[mockName](body, req);

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

    process.env.CADENCE_TCHANNEL_PEERS = '127.0.0.1:11343';
    server.listen(11343, '127.0.0.1', () => done());
  } else if (TRANSPORT_CLIENT_TYPE_DEFAULT === 'grpc') {

  } else {
    throw new Error(`Unsupported client type: "${TRANSPORT_CLIENT_TYPE_DEFAULT}"`);
  }

  app = require('../')
    .init({ useWebpack: false, logErrors: false })
    .listen();
  global.request = supertest.bind(supertest, app);
});

after(function () {
  app.close();
  server.close();
  client.close();
});

beforeEach(function () {
  currTest = this.currentTest;
});
