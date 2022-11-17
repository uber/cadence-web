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

import filterVisitedDomainList from './filter-visited-domain-list';

describe('filterVisitedDomainList', () => {
  let visitedDomainList;

  beforeEach(() => {
    visitedDomainList = [
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
          name: 'other',
        },
      },
    ];
  });

  describe('when search = ""', () => {
    const search = '';

    it('should return all of visitedDomainList.', () => {
      const output = filterVisitedDomainList({ search, visitedDomainList });

      expect(output).toEqual(visitedDomainList);
    });
  });

  describe('when search = "domain"', () => {
    const search = 'domain';

    it('should only return domains which match search from visitedDomainList', () => {
      const output = filterVisitedDomainList({ search, visitedDomainList });

      expect(output).toEqual([
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
      ]);
    });
  });
});
