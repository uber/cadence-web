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

import { VISITED_DOMAIN_LIST_LIMIT } from '../constants';
import updateVisitedDomainList from './update-visited-domain-list';

describe('updateVisitedDomainList', () => {
  const getVisitedDomainList = () => [
    {
      domainInfo: {
        name: 'domainString',
      },
    },
    {
      domainInfo: {
        uuid: 2,
        name: 'domainObject',
      },
    },
  ];

  const getVisitedDomainListOfSize = size => {
    const visitedDomainList = [];

    for (let i = 1; i < size + 1; i++) {
      visitedDomainList.push({
        domainInfo: {
          uuid: i,
          name: `domain${i}`,
        },
      });
    }

    return visitedDomainList;
  };

  describe('when value does not exist in visitedDomainList', () => {
    describe('and the visited domain list does not equal the limit', () => {
      it('should add the value to the end of the visitedDomainList.', () => {
        const value = {
          domainInfo: {
            uuid: 3,
            name: 'domain3',
          },
        };
        const visitedDomainList = getVisitedDomainListOfSize(2);
        const output = updateVisitedDomainList({ value, visitedDomainList });

        expect(output).toEqual([
          {
            domainInfo: {
              uuid: 1,
              name: 'domain1',
            },
          },
          {
            domainInfo: {
              uuid: 2,
              name: 'domain2',
            },
          },
          {
            domainInfo: {
              uuid: 3,
              name: 'domain3',
            },
          },
        ]);
      });
    });

    describe('and the visited domain list equals the limit', () => {
      it('should remove the first item and add the value to the end of the visitedDomainList.', () => {
        const value = {
          domainInfo: {
            uuid: VISITED_DOMAIN_LIST_LIMIT + 1,
            name: `domain${VISITED_DOMAIN_LIST_LIMIT + 1}`,
          },
        };
        const visitedDomainList = getVisitedDomainListOfSize(
          VISITED_DOMAIN_LIST_LIMIT
        );

        const output = updateVisitedDomainList({ value, visitedDomainList });

        expect(output).toEqual([
          ...getVisitedDomainListOfSize(VISITED_DOMAIN_LIST_LIMIT).slice(1),
          value,
        ]);
      });
    });

    describe('and the visited domain list exceeds the limit', () => {
      it('should remove the first three items and add the value to the end of the visitedDomainList.', () => {
        const value = {
          domainInfo: {
            uuid: VISITED_DOMAIN_LIST_LIMIT + 3,
            name: `domain${VISITED_DOMAIN_LIST_LIMIT + 3}`,
          },
        };
        const visitedDomainList = getVisitedDomainListOfSize(
          VISITED_DOMAIN_LIST_LIMIT + 2
        );

        const output = updateVisitedDomainList({ value, visitedDomainList });

        expect(output).toEqual([
          ...getVisitedDomainListOfSize(VISITED_DOMAIN_LIST_LIMIT + 2).slice(3),
          value,
        ]);
      });
    });
  });

  describe('when value does exist in visitedDomainList', () => {
    it('should update the matchedDomain in visitedDomainList with the value object and place it at the end of the visitedDomainList.', () => {
      const value = {
        domainInfo: {
          uuid: 1,
          name: 'domainString',
        },
      };
      const visitedDomainList = getVisitedDomainList();
      const output = updateVisitedDomainList({ value, visitedDomainList });

      expect(output).toEqual([
        {
          domainInfo: {
            uuid: 2,
            name: 'domainObject',
          },
        },
        {
          domainInfo: {
            uuid: 1,
            name: 'domainString',
          },
        },
      ]);
    });
  });
});
