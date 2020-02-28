describe('Workflow Execution', function() {
  it('should describe the workflow', async function () {
    this.test.DescribeWorkflowExecution = ({ describeRequest }) => {
      return {
        executionConfiguration: {
          taskList: { name: 'ci-task-list' },
          taskStartToCloseTimeoutSeconds: 10
        }
      }
    }

    return request()
      .get('/api/domain/canary/workflows/ci%2Fdemo/run1')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        executionConfiguration: {
          taskList: {
            name: 'ci-task-list',
            kind: null
          },
          taskStartToCloseTimeoutSeconds: 10,
          executionStartToCloseTimeoutSeconds: null
        },
        workflowExecutionInfo: null,
        pendingChildren: null,
        pendingActivities: null
      })
  })

  it('should terminate a workflow', async function() {
    let reason
    this.test.TerminateWorkflowExecution = ({ terminateRequest }) => {
      terminateRequest.workflowExecution.workflowId.should.equal('ci/demo')
      terminateRequest.workflowExecution.runId.should.equal('run1')
      reason = terminateRequest.reason
      return {}
    }

    return request()
      .post('/api/domain/canary/workflows/ci%2Fdemo/run1/terminate')
      .send({ reason: 'example reason' })
      .expect(204)
      .expect(() => reason.should.equal('example reason'))
  })

  it('should signal a workflow without input', async function() {
    let signal
    this.test.SignalWorkflowExecution = ({ signalRequest }) => {
      signalRequest.workflowExecution.workflowId.should.equal('ci/demo')
      signalRequest.workflowExecution.runId.should.equal('run2')
      signal = signalRequest.signalName
      return {}
    }

    return request()
      .post('/api/domain/canary/workflows/ci%2Fdemo/run2/signal/firealarm')
      .expect(204)
      .expect(() => signal.should.equal('firealarm'))
  })
})
