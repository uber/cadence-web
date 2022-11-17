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

import { DOMAIN_LIST_SEARCH_SIZE } from '../constants';
import getMatchingDomains from './get-matching-domains';

describe('getMatchingDomains', () => {
  const createDomains = ({ prefix = '', size }) => {
    const domainList = [];

    for (let i = 0; i < size; i++) {
      domainList.push({
        domainInfo: {
          name: prefix + i,
        },
      });
    }

    return domainList;
  };

  describe('when querystring = ""', () => {
    const querystring = '';

    it('should return the first domains of size = DOMAIN_LIST_SEARCH_SIZE.', () => {
      const domainList = createDomains({ size: DOMAIN_LIST_SEARCH_SIZE * 2 });
      const output = getMatchingDomains({ domainList, querystring });

      expect(output).toEqual(domainList.slice(0, DOMAIN_LIST_SEARCH_SIZE));
    });
  });

  describe('when querystring = "domain"', () => {
    const querystring = 'domain';

    it('should return the first domains matching "domain" of size = DOMAIN_LIST_SEARCH_SIZE.', () => {
      const notMatchedDomains = createDomains({
        prefix: 'not-matched',
        size: 2 * DOMAIN_LIST_SEARCH_SIZE,
      });
      const matchedDomains = createDomains({
        prefix: 'domain',
        size: 2 * DOMAIN_LIST_SEARCH_SIZE,
      });
      const domainList = [...notMatchedDomains, ...matchedDomains];
      const output = getMatchingDomains({ domainList, querystring });

      expect(output).toEqual(matchedDomains.slice(0, DOMAIN_LIST_SEARCH_SIZE));
    });
  });
});
