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

import combineDomainList from './combine-domain-list';

describe('combineDomainList', () => {
  describe('when passed domainList & visitedDomainList', () => {
    const visitedDomainList = [
      {
        domainInfo: {
          name: 'domain1',
        },
      },
      {
        domainInfo: {
          name: 'domain2',
          uuid: 2,
        },
      },
      {
        domainInfo: {
          name: 'domain3',
        },
      },
      {
        domainInfo: {
          name: 'domain4',
          uuid: 4,
        },
      },
    ];

    const domainList = [
      {
        domainInfo: {
          name: 'domain0',
          uuid: 0,
        },
      },
      {
        domainInfo: {
          name: 'domain1',
          uuid: 1,
        },
      },
      {
        domainInfo: {
          name: 'domain2',
          uuid: 2,
        },
      },
    ];

    it('should combine the two lists into a single list by removing any duplicates from the visitedDomainList.', () => {
      const output = combineDomainList({ domainList, visitedDomainList });

      expect(output).toEqual([
        {
          domainInfo: {
            name: 'domain0',
            uuid: 0,
          },
        },
        {
          domainInfo: {
            name: 'domain1',
            uuid: 1,
          },
        },
        {
          domainInfo: {
            name: 'domain2',
            uuid: 2,
          },
        },
        {
          domainInfo: {
            name: 'domain3',
          },
        },
        {
          domainInfo: {
            name: 'domain4',
            uuid: 4,
          },
        },
      ]);
    });
  });
});
