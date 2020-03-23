describe('Describe Domain', function() {
  it('should list domains', async function() {
    const domains = [{
      domainInfo: {
        name: 'ci-test-domain',
        status: 'REGISTERED',
        description: 'domain for running CI tests',
        ownerEmail: 'cadence-dev@uber.com',
        data: null,
        uuid: null
      },
      isGlobalDomain: false,
      failoverVersion: 0,
      configuration: {
        badBinaries: null,
        emitMetric: false,
        historyArchivalStatus: null,
        historyArchivalURI: null,
        visibilityArchivalStatus: null,
        visibilityArchivalURI: null,
        workflowExecutionRetentionPeriodInDays: 14
      },
      replicationConfiguration: {
        activeClusterName: 'ci-cluster',
        clusters: []
      }
    }]

    this.test.ListDomains = ({ listRequest }) => {
      should.not.exist(listRequest.nextPageToken)
      return { domains }
    }

    return request()
      .get('/api/domains')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({ domains, nextPageToken: null })
  })

  it('should describe the domain', async function () {
    const domainDesc = {
      domainInfo: {
        name: 'test-domain',
        status: 'REGISTERED',
        description: 'ci test domain',
        ownerEmail: null,
        data: {},
        uuid: null
      },
      failoverVersion: 0,
      isGlobalDomain: true,
      configuration: {
        badBinaries: null,
        workflowExecutionRetentionPeriodInDays: 14,
        emitMetric: true,
        historyArchivalStatus: null,
        historyArchivalURI: null,
        visibilityArchivalStatus: null,
        visibilityArchivalURI: null
      },
      replicationConfiguration: {
        activeClusterName: 'ci-cluster',
        clusters: null
      }
    }

    this.test.DescribeDomain = ({ describeRequest }) => {
      describeRequest.name.should.equal('test-domain')
      return domainDesc
    }

    return request()
      .get('/api/domains/test-domain')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(domainDesc)
  })

  it('should return 404 if the domain is not found', async function () {
    this.test.DescribeDomain = ({ describeRequest }) => ({
      ok: false,
      body: { message: `domain "${describeRequest.name}" does not exist`},
      typeName: 'entityNotExistError'
    })

    return request()
      .get('/api/domains/nonexistant')
      .expect(404)
      .expect('Content-Type', /json/)
      .expect({
        message: 'domain "nonexistant" does not exist'
      })
  })
})
