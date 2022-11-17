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

import { ONE_HOUR_IN_MILLISECONDS } from '../constants';
import CacheManager from './cache-manager';

describe('cacheManager', () => {
  describe('get', () => {
    let cacheManager;

    beforeEach(() => {
      cacheManager = new CacheManager(ONE_HOUR_IN_MILLISECONDS);
    });

    describe('cache = null', () => {
      it('should call fetchCallback.', async () => {
        const mockData = {
          hello: 'world',
        };
        const fetchCallback = jest.fn().mockImplementation(() => mockData);

        const data = await cacheManager.get(fetchCallback);

        expect(fetchCallback).toHaveBeenCalled();
        expect(data.hello).toEqual('world');
      });
    });

    describe('cache is set', () => {
      it('should return cache on the second attempt and not call fetchCallback twice.', async () => {
        const mockData = {
          hello: 'world',
        };
        const fetchCallback1 = jest.fn().mockImplementation(() => mockData);

        const data1 = await cacheManager.get(fetchCallback1);

        const updatedMockData = {
          foo: 'bar',
        };
        const fetchCallback2 = jest
          .fn()
          .mockImplementation(() => updatedMockData);

        const data2 = await cacheManager.get(fetchCallback2);

        expect(fetchCallback1).toHaveBeenCalled();
        expect(fetchCallback2).not.toHaveBeenCalled();
        expect(data1.hello).toEqual('world');
        expect(data2.hello).toEqual('world');
        expect(data2.foo).toEqual(undefined);
      });

      describe('and time passes over ONE_HOUR_IN_MILLISECONDS', () => {
        it('should call the second fetchCallback and return data.', async () => {
          const mockData = {
            hello: 'world',
          };
          const fetchCallback1 = jest.fn().mockImplementation(() => mockData);

          // set current time
          jest
            .spyOn(Date, 'now')
            .mockImplementation(() =>
              new Date(Date.UTC(2020, 2, 10)).getTime()
            );

          const data1 = await cacheManager.get(fetchCallback1);

          const updatedMockData = {
            foo: 'bar',
          };
          const fetchCallback2 = jest
            .fn()
            .mockImplementation(() => updatedMockData);

          // set current time to an hour into the future
          jest
            .spyOn(Date, 'now')
            .mockImplementation(() =>
              new Date(Date.UTC(2020, 2, 10, 2)).getTime()
            );

          const data2 = await cacheManager.get(fetchCallback2);

          expect(fetchCallback1).toHaveBeenCalled();
          expect(fetchCallback2).toHaveBeenCalled();
          expect(data1.hello).toEqual('world');
          expect(data2.hello).toEqual(undefined);
          expect(data2.foo).toEqual('bar');
        });
      });
    });
  });
});
