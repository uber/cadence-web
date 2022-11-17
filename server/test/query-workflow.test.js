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

const btoa = require('btoa');
const grpc = require('@grpc/grpc-js');

describe('Query Workflow', function() {
  it('should list workflows using a temporary hack of parsing out the available workflows from a NotFoundError', async function() {
    this.timeout(50000);
    this.test.QueryWorkflow = ({ queryRequest }) => {
      queryRequest.query.queryType.should.equal('__cadence_web_list');
      const message =
        '__cadence_web_list not found. KnownQueryTypes=[foo bar ]';
      const error = {
        tchannel: {
          ok: false,
          body: {
            message,
          },
          typeName: 'badRequestError',
        },
        grpc: {
          code: grpc.status.INVALID_ARGUMENT,
          message,
        },
      };

      return error[process.env.TRANSPORT_CLIENT_TYPE];
    };

    return request(global.app)
      .get('/api/domains/canary/workflows/ci%2Fdemo/run1/query')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(['foo', 'bar']);
  });
  it('should forward the query to the workflow', async function() {
    this.test.QueryWorkflow = ({ queryRequest }) => {
      const expectedRequest = {
        tchannel: {
          domain: 'canary',
          execution: {
            workflowId: 'ci/demo',
            runId: 'run1',
          },
          query: {
            queryType: 'state',
            queryArgs: null,
          },
          queryConsistencyLevel: null,
          queryRejectCondition: null,
        },
        grpc: {
          domain: 'canary',
          workflowExecution: {
            workflowId: 'ci/demo',
            runId: 'run1',
          },
          query: {
            queryType: 'state',
            queryArgs: null,
          },
          queryConsistencyLevel: 'QUERY_CONSISTENCY_LEVEL_INVALID',
          queryRejectCondition: 'QUERY_REJECT_CONDITION_INVALID',
        },
      };

      queryRequest.should.deep.equal(
        expectedRequest[process.env.TRANSPORT_CLIENT_TYPE]
      );

      const response = {
        tchannel: {
          queryResult: Buffer.from('foobar'),
        },
        grpc: {
          queryResult: {
            data: btoa('foobar'),
          },
        },
      };

      return response[process.env.TRANSPORT_CLIENT_TYPE];
    };

    return request(global.app)
      .post('/api/domains/canary/workflows/ci%2Fdemo/run1/query/state')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        queryRejected: null,
        queryResult: 'foobar',
        queryResult_base64: Buffer.from('foobar').toString('base64'),
      });
  });
  it('should turn bad requests into 400s', async function() {
    const message = 'that does not make sense';
    const response = {
      tchannel: {
        ok: false,
        body: {
          message,
        },
        typeName: 'badRequestError',
      },
      grpc: {
        code: grpc.status.INVALID_ARGUMENT,
        message,
      },
    };

    this.test.QueryWorkflow = () => response[process.env.TRANSPORT_CLIENT_TYPE];

    return request(global.app)
      .post('/api/domains/canary/workflows/ci%2Fdemo/run1/query/state')
      .expect(400)
      .expect('Content-Type', /json/)
      .expect({
        message: 'that does not make sense',
      });
  });
});
