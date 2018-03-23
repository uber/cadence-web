describe('Describe Domain', function() {
  it('should describe the domain', async function () {
    const domainInfo = {
      name: 'test-domain',
      status: 'REGISTERED',
      description: 'ci test domain'
    }

    this.test.DescribeDomain = ({ describeRequest }) => {
      describeRequest.name.should.equal('test-domain')
      return { domainInfo }
    }

    return request()
      .get('/api/domain/test-domain')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(Object.assign({ ownerEmail: null }, domainInfo))
  })

  it('should return 404 if the domain is not found', async function () {
    this.test.DescribeDomain = ({ describeRequest }) => ({
      ok: false,
      body: { message: `domain "${describeRequest.name}" does not exist`},
      typeName: 'entityNotExistError'
    })

    return request()
      .get('/api/domain/nonexistant')
      .expect(404)
      .expect('Content-Type', /json/)
      .expect({
        message: 'domain "nonexistant" does not exist'
      })
  })
})