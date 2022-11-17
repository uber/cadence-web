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

import canFetchCluster from './can-fetch-cluster';

describe('canFetchCluster', () => {
  describe('expiryDateTime = null', () => {
    const expiryDateTime = null;

    it('should return true.', () => {
      const output = canFetchCluster(expiryDateTime);

      expect(output).toEqual(true);
    });
  });

  describe('expiryDateTime = 1 hour from now', () => {
    const expiryDateTime = new Date(Date.UTC(2020, 2, 31, 1));

    beforeEach(() => {
      jest
        .spyOn(Date, 'now')
        .mockImplementation(() => new Date(Date.UTC(2020, 2, 31)).getTime());
    });

    it('should return false.', () => {
      const output = canFetchCluster(expiryDateTime);

      expect(output).toEqual(false);
    });
  });

  describe('expiryDateTime = 1 hour past from now', () => {
    const expiryDateTime = new Date(Date.UTC(2020, 2, 31, 0));

    beforeEach(() => {
      jest
        .spyOn(Date, 'now')
        .mockImplementation(() => new Date(Date.UTC(2020, 2, 31, 1)).getTime());
    });

    it('should return true.', () => {
      const output = canFetchCluster(expiryDateTime);

      expect(output).toEqual(true);
    });
  });
});
