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

describe('Workflow Execution', function() {
  it('should describe the workflow', async function() {
    this.test.DescribeWorkflowExecution = ({ describeRequest }) => {
      const response = {
        tchannel: {
          executionConfiguration: {
            taskList: { name: 'ci-task-list' },
            taskStartToCloseTimeoutSeconds: 10,
          },
        },
        grpc: {
          executionConfiguration: {
            taskList: { name: 'ci-task-list' },
            taskStartToCloseTimeout: { seconds: 10 },
          },
        },
      };

      return response[process.env.TRANSPORT_CLIENT_TYPE];
    };

    return request()
      .get('/api/domains/canary/workflows/ci%2Fdemo/run1')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        executionConfiguration: {
          taskList: {
            name: 'ci-task-list',
            kind: null,
          },
          taskStartToCloseTimeoutSeconds: 10,
          executionStartToCloseTimeoutSeconds: null,
        },
        workflowExecutionInfo: null,
        pendingChildren: null,
        pendingActivities: null,
        pendingDecision: null,
      });
  });
  it('should terminate a workflow', async function() {
    let reason;

    this.test.TerminateWorkflowExecution = ({ terminateRequest }) => {
      terminateRequest.workflowExecution.workflowId.should.equal('ci/demo');
      terminateRequest.workflowExecution.runId.should.equal('run1');
      reason = terminateRequest.reason;

      return {};
    };

    return request()
      .post('/api/domains/canary/workflows/ci%2Fdemo/run1/terminate')
      .send({ reason: 'example reason' })
      .expect(204)
      .expect(() => reason.should.equal('example reason'));
  });
  it('should signal a workflow without input', async function() {
    let signal;

    this.test.SignalWorkflowExecution = ({ signalRequest }) => {
      signalRequest.workflowExecution.workflowId.should.equal('ci/demo');
      signalRequest.workflowExecution.runId.should.equal('run2');
      signal = signalRequest.signalName;

      return {};
    };

    return request()
      .post('/api/domains/canary/workflows/ci%2Fdemo/run2/signal/firealarm')
      .expect(204)
      .expect(() => signal.should.equal('firealarm'));
  });
});
