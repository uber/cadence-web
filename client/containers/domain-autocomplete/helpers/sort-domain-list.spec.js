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

import sortDomainList from './sort-domain-list';

describe('sortDomainList', () => {
  const createDomainObject = domainName => ({
    domainInfo: {
      name: domainName,
    },
  });

  describe('when passed an unsorted domainList', () => {
    it('should return an alphabetically sorted domainList', () => {
      const domainA = createDomainObject('domainA');
      const domainB = createDomainObject('domainB');
      const domainC = createDomainObject('domainC');
      const domainD = createDomainObject('domainD');
      const domainE = createDomainObject('domainE');
      const domainF = createDomainObject('domainF');

      const domainList = [domainF, domainD, domainB, domainE, domainA, domainC];

      const output = sortDomainList(domainList);

      expect(output).toEqual([
        domainA,
        domainB,
        domainC,
        domainD,
        domainE,
        domainF,
      ]);
    });
  });
});
