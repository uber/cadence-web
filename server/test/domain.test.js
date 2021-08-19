// Copyright (c) 2017-2021 Uber Technologies Inc.
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

describe('Describe Domain', function() {
  it('should list domains', async function() {
    const responseDomains = [
      {
        domainInfo: {
          name: 'ci-test-domain',
          status: 'REGISTERED',
          description: 'domain for running CI tests',
          ownerEmail: 'cadence-dev@uber.com',
          data: null,
          uuid: null,
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
          workflowExecutionRetentionPeriodInDays: 14,
        },
        replicationConfiguration: {
          activeClusterName: 'ci-cluster',
          clusters: [],
        },
      },
    ];

    const expectedDomains = [
      {
        domainInfo: {
          name: 'ci-test-domain',
          status: 'REGISTERED',
          description: 'domain for running CI tests',
          ownerEmail: 'cadence-dev@uber.com',
        },
        isGlobalDomain: false,
        failoverVersion: {
          isLosslessNumber: true,
          type: 'LosslessNumber',
          value: '0',
        },
        configuration: {
          emitMetric: false,
          workflowExecutionRetentionPeriodInDays: 14,
        },
        replicationConfiguration: {
          activeClusterName: 'ci-cluster',
          clusters: [],
        },
      },
    ];

    this.test.ListDomains = ({ listRequest }) => {
      should.not.exist(listRequest.nextPageToken);

      return { domains: responseDomains };
    };

    return request()
      .get('/api/domains')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(expectedDomains);
  });

  it('should describe the domain', async function() {
    const domainDesc = {
      domainInfo: {
        name: 'test-domain',
        status: 'REGISTERED',
        description: 'ci test domain',
        ownerEmail: null,
        data: {},
        uuid: null,
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
        visibilityArchivalURI: null,
      },
      replicationConfiguration: {
        activeClusterName: 'ci-cluster',
        clusters: null,
      },
    };

    this.test.DescribeDomain = ({ describeRequest }) => {
      describeRequest.name.should.equal('test-domain');

      return domainDesc;
    };

    return request()
      .get('/api/domains/test-domain')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(domainDesc);
  });

  it('should return 404 if the domain is not found', async function() {
    this.test.DescribeDomain = ({ describeRequest }) => ({
      ok: false,
      body: { message: `domain "${describeRequest.name}" does not exist` },
      typeName: 'entityNotExistError',
    });

    return request()
      .get('/api/domains/nonexistant')
      .expect(404)
      .expect('Content-Type', /json/)
      .expect({
        message: 'domain "nonexistant" does not exist',
      });
  });
});
