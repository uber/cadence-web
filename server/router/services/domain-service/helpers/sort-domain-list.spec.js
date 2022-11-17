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
  const createDomain = name => ({
    domainInfo: {
      name,
    },
  });

  it('should sort domainNames alphabetically.', () => {
    const domain1 = createDomain('domain1');
    const domain2 = createDomain('domain2');
    const domain3 = createDomain('domain3');

    const output = sortDomainList([domain3, domain2, domain1]);

    expect(output).toEqual([domain1, domain2, domain3]);
  });
});
