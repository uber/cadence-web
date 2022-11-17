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

const grpc = require('@grpc/grpc-js');

describe('Describe Domain', function() {
  it('should list domains', async function() {
    const domains = {
      tchannel: [
        {
          domainInfo: {
            name: 'ci-test-domain',
            status: 'REGISTERED',
            description: 'domain for running CI tests',
            ownerEmail: 'cadence-dev@uber.com',
            data: {},
            uuid: null,
          },
          isGlobalDomain: false,
          failoverInfo: null,
          failoverVersion: 0,
          configuration: {
            badBinaries: null,
            emitMetric: true,
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
      ],
      grpc: [
        {
          id: '',
          name: 'ci-test-domain',
          status: 'DOMAIN_STATUS_REGISTERED',
          description: 'domain for running CI tests',
          ownerEmail: 'cadence-dev@uber.com',
          data: {},
          workflowExecutionRetentionPeriod: { seconds: '1209600', nanos: '0' },
          badBinaries: null,
          historyArchivalStatus: 'ARCHIVAL_STATUS_INVALID',
          historyArchivalUri: '',
          visibilityArchivalStatus: 'ARCHIVAL_STATUS_INVALID',
          visibilityArchivalUri: '',
          activeClusterName: 'ci-cluster',
          clusters: [],
          failoverVersion: '0',
          isGlobalDomain: false,
          failoverInfo: null,
        },
      ],
    };

    this.test.ListDomains = ({ listRequest }) => {
      should.not.exist(listRequest.nextPageToken);

      return { domains: domains[process.env.TRANSPORT_CLIENT_TYPE] };
    };

    return request()
      .get('/api/domains')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(domains.tchannel);
  });

  it('should describe the domain', async function() {
    const domainDesc = {
      tchannel: {
        domainInfo: {
          name: 'test-domain',
          status: 'REGISTERED',
          description: 'ci test domain',
          ownerEmail: null,
          data: {},
          uuid: null,
        },
        failoverInfo: null,
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
          clusters: [],
        },
      },
      grpc: {
        domain: {
          id: '',
          name: 'test-domain',
          status: 'DOMAIN_STATUS_REGISTERED',
          description: 'ci test domain',
          ownerEmail: '',
          data: {},
          workflowExecutionRetentionPeriod: { seconds: '1209600', nanos: '0' },
          badBinaries: null,
          historyArchivalStatus: 'ARCHIVAL_STATUS_INVALID',
          historyArchivalUri: '',
          visibilityArchivalStatus: 'ARCHIVAL_STATUS_INVALID',
          visibilityArchivalUri: '',
          activeClusterName: 'ci-cluster',
          clusters: [],
          failoverVersion: '0',
          isGlobalDomain: true,
          failoverInfo: null,
        },
      },
    };

    this.test.DescribeDomain = ({ describeRequest }) => {
      describeRequest.name.should.equal('test-domain');

      return domainDesc[process.env.TRANSPORT_CLIENT_TYPE];
    };

    return request()
      .get('/api/domains/test-domain')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(domainDesc.tchannel);
  });

  it('should return 404 if the domain is not found', async function() {
    const errorHandler = ({ describeRequest }) => {
      const message = `domain "${describeRequest.name}" does not exist`;
      const error = {
        tchannel: {
          ok: false,
          body: {
            message,
          },
          typeName: 'entityNotExistError',
        },
        grpc: {
          code: grpc.status.NOT_FOUND,
          message,
        },
      };

      return error[process.env.TRANSPORT_CLIENT_TYPE];
    };

    this.test.DescribeDomain = errorHandler;

    return request()
      .get('/api/domains/nonexistant')
      .expect(404)
      .expect('Content-Type', /json/)
      .expect({
        message: 'domain "nonexistant" does not exist',
      });
  });
});
