describe('Query Workflow', function() {
  it('should list workflows using a temporary hack of parsing out the available workflows from a NotFoundError', async function () {
    this.timeout(50000)
    this.test.QueryWorkflow = ({ queryRequest }) => {
      queryRequest.query.queryType.should.equal('__cadence_web_list')

      return {
        ok: false,
        body: { message: '__cadence_web_list not found. KnownQueryTypes=[foo bar ]' },
        typeName: 'badRequestError'
      }
    }

    return request(global.app)
      .get('/api/domains/canary/workflows/ci%2Fdemo/run1/query')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(['foo', 'bar'])
  })

  it('should forward the query to the workflow', async function () {
    this.test.QueryWorkflow = ({ queryRequest }) => {
      queryRequest.should.deep.equal({
        domain: 'canary',
        execution: {
          workflowId: 'ci/demo',
          runId: 'run1'
        },
        query: {
          queryType: 'state',
          queryArgs: null
        },
        queryConsistencyLevel: null,
        queryRejectCondition: null,
      })

      return { queryResult: Buffer.from('foobar') }
    }

    return request(global.app)
      .post('/api/domains/canary/workflows/ci%2Fdemo/run1/query/state')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        queryRejected: null,
        queryResult: 'foobar',
        queryResult_base64: Buffer.from('foobar').toString('base64')
      })
  })

  it('should forward the body as the query input')

  it('should turn bad requests into 400s', async function () {
    this.test.QueryWorkflow = () => ({
      ok: false,
      body: { message: 'that does not make sense' },
      typeName: 'badRequestError'
    })

    return request(global.app)
      .post('/api/domains/canary/workflows/ci%2Fdemo/run1/query/state')
      .expect(400)
      .expect('Content-Type', /json/)
      .expect({
        message: 'that does not make sense'
      })
  })
})
