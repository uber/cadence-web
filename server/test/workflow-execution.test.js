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
          childPolicy: null,
          taskList: {
            name: 'ci-task-list',
            kind: null
          },
          taskStartToCloseTimeoutSeconds: 10,
          executionStartToCloseTimeoutSeconds: null
        },
        workflowExecutionInfo: null,
        pendingActivities: null
      })
  })

  it('should terminate a workflow', async function() {
    let reason
    this.test.TerminateWorkflowExecution = ({ terminateRequest }) => {
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
      signal = signalRequest.signalName
      return {}
    }

    return request()
      .post('/api/domain/canary/workflows/ci%2Fdemo/run1/signal/firealarm')
      .expect(204)
      .expect(() => signal.should.equal('firealarm'))
  })
})