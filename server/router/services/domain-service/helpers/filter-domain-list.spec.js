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

import filterDomainList from './filter-domain-list';

describe('filterDomainList', () => {
  describe('when a registered domain is in domainList', () => {
    const domainList = [
      {
        domainInfo: {
          status: 'REGISTERED',
        },
      },
    ];

    it('should return this domain in the returned list.', () => {
      const output = filterDomainList(domainList);

      expect(output.length).toEqual(1);
    });
  });

  describe('when a deprecated domain is in the domainList', () => {
    const domainList = [
      {
        domainInfo: {
          status: 'DEPRECATED',
        },
      },
    ];

    it('should not return this domain in the returned list.', () => {
      const output = filterDomainList(domainList);

      expect(output.length).toEqual(0);
    });
  });
});
