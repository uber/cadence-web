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

import migrateRecentDomains from './migrate-recent-domains';

describe('migrateRecentDomains', () => {
  describe('when passed domainList array of strings', () => {
    it('should format to array objects.', () => {
      const domainList = ['domainA', 'domainB', 'domainC'];
      const output = migrateRecentDomains(domainList);

      expect(output).toEqual([
        {
          domainInfo: {
            name: 'domainA',
          },
        },
        {
          domainInfo: {
            name: 'domainB',
          },
        },
        {
          domainInfo: {
            name: 'domainC',
          },
        },
      ]);
    });
  });

  describe('when passed domainList array of objects', () => {
    it('should not change the array.', () => {
      const domainList = [
        {
          domainInfo: {
            name: 'domainA',
            uuid: 1,
          },
        },
        {
          domainInfo: {
            name: 'domainB',
            uuid: 2,
          },
        },
        {
          domainInfo: {
            name: 'domainC',
            uuid: 2,
          },
        },
      ];
      const output = migrateRecentDomains(domainList);

      expect(output).toEqual([
        {
          domainInfo: {
            name: 'domainA',
            uuid: 1,
          },
        },
        {
          domainInfo: {
            name: 'domainB',
            uuid: 2,
          },
        },
        {
          domainInfo: {
            name: 'domainC',
            uuid: 2,
          },
        },
      ]);
    });
  });

  describe('when passed domainList array of mixed strings and objects', () => {
    it('should only change the strings to objects and leave the rest.', () => {
      const domainList = [
        {
          domainInfo: {
            name: 'domainA',
            uuid: 1,
          },
        },
        {
          domainInfo: {
            name: 'domainB',
            uuid: 2,
          },
        },
        'domainC',
      ];
      const output = migrateRecentDomains(domainList);

      expect(output).toEqual([
        {
          domainInfo: {
            name: 'domainA',
            uuid: 1,
          },
        },
        {
          domainInfo: {
            name: 'domainB',
            uuid: 2,
          },
        },
        {
          domainInfo: {
            name: 'domainC',
          },
        },
      ]);
    });
  });
});
