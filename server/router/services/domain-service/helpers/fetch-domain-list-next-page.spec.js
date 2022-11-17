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

import { delay } from '../../../helpers';
import fetchDomainListNextPage from './fetch-domain-list-next-page';

jest.mock('../../../helpers', () => ({
  delay: jest.fn(),
}));

describe('fetchDomainListNextPage', () => {
  const getMockContext = domainResponse => {
    const ctx = {
      cadence: {
        listDomains: jest.fn().mockImplementation(() => domainResponse),
      },
    };

    return ctx;
  };

  describe('when no nextPageToken returned', () => {
    it('should return domainList.', async () => {
      const domains = ['domain1', 'domain2'];
      const domainResponse = {
        domains,
        nextPageToken: null,
      };

      const ctx = getMockContext(domainResponse);

      const domainList = await fetchDomainListNextPage({
        ctx,
      });

      expect(domainList).toEqual(domains);
    });
  });

  describe('when nextPageToken is returned', () => {
    it('should call delay and should call itself again to get next domain list page.', async () => {
      const nextPageToken = '1234';
      const domains1 = ['domain1', 'domain2'];
      const domains2 = ['domain3', 'domain4'];
      const domainResponse = {
        domains: domains1,
        nextPageToken,
      };

      const ctx = getMockContext(domainResponse);

      delay.mockImplementation(() => {
        domainResponse.domains = domains2;
        domainResponse.nextPageToken = null;
      });

      const domainList = await fetchDomainListNextPage({
        ctx,
      });

      expect(domainList).toEqual([...domains1, ...domains2]);
    });
  });
});
