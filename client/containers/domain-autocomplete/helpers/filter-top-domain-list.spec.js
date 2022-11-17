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

import { TOP_DOMAIN_LIST_LIMIT } from '../constants';
import filterTopDomainList from './filter-top-domain-list';

describe('filterTopDomainList', () => {
  const createDomainList = size => {
    const newDomainList = [];

    for (let i = 1; i < size + 1; i++) {
      newDomainList.push(`domain${i}`);
    }

    return newDomainList;
  };

  describe('when domainList is greater than TOP_DOMAIN_LIST_LIMIT', () => {
    let domainList;

    beforeEach(() => {
      domainList = createDomainList(TOP_DOMAIN_LIST_LIMIT * 2);
    });

    it('should return only the first domains of size = TOP_DOMAIN_LIST_LIMIT', () => {
      const output = filterTopDomainList(domainList);

      expect(output.length).toEqual(TOP_DOMAIN_LIST_LIMIT);
      expect(output[0]).toEqual('domain1');
      expect(output[output.length - 1]).toEqual(
        `domain${TOP_DOMAIN_LIST_LIMIT}`
      );
    });
  });
});
