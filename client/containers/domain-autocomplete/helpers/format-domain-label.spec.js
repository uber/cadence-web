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

import formatDomainLabel from './format-domain-label';

describe('formatDomainLabel', () => {
  describe('when passed domain object with only name defined', () => {
    const domain = {
      domainInfo: {
        name: 'domainName',
      },
    };

    it('should render only the domainName.', () => {
      const output = formatDomainLabel(domain);

      expect(output).toEqual('domainName');
    });
  });

  describe('when passed a local domain object', () => {
    it('should return "domainName - Local - activeCluster"', () => {
      const domain = {
        domainInfo: {
          name: 'domainName',
        },
        isGlobalDomain: false,
        replicationConfiguration: {
          activeClusterName: 'activeCluster',
        },
      };

      const output = formatDomainLabel(domain);

      expect(output).toEqual('domainName - Local - activeCluster');
    });
  });

  describe('when passed a global domain object', () => {
    it('should return "domainName - Global - activeCluster"', () => {
      const domain = {
        domainInfo: {
          name: 'domainName',
        },
        isGlobalDomain: true,
        replicationConfiguration: {
          activeClusterName: 'activeCluster',
        },
      };

      const output = formatDomainLabel(domain);

      expect(output).toEqual('domainName - Global - activeCluster');
    });
  });
});
