// Copyright (c) 2021 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import clusterService from './cluster-service';

describe('cluster service', () => {
  describe('getCluster', () => {
    beforeEach(() => {
      clusterService.clearCache();
    });

    describe('cache = null', () => {
      it('should return data from ctx.cadence.describeCluster.', async () => {
        const cluster = {
          persistenceInfo: {},
          membershipInfo: null,
          version: 1,
        };

        const ctx = {
          cadence: {
            describeCluster: jest.fn().mockImplementation(() => cluster),
          },
        };

        const data = await clusterService.getCluster(ctx);

        expect(data).toEqual(cluster);
      });
    });

    describe('cache is set', () => {
      it('should return cache on the second attempt.', async () => {
        const clusterCache = {
          persistenceInfo: {},
          membershipInfo: null,
          version: 1,
        };

        const ctx = {
          cadence: {
            describeCluster: jest.fn().mockImplementation(() => clusterCache),
          },
        };

        const data = await clusterService.getCluster(ctx);

        expect(data).toEqual(clusterCache);

        const clusterUpdated = {
          persistenceInfo: {},
          membershipInfo: null,
          version: 2,
        };

        ctx.cadence.describeCluster.mockImplementation(() => clusterUpdated);

        const updatedData = await clusterService.getCluster(ctx);

        expect(updatedData).toEqual(clusterCache);
      });

      describe('and time passes over CLUSTER_CACHE_TTL', () => {
        it('should return data from ctx.cadence.describeCluster.', async () => {
          const clusterCache = {
            persistenceInfo: {},
            membershipInfo: null,
            version: 1,
          };

          const ctx = {
            cadence: {
              describeCluster: jest.fn().mockImplementation(() => clusterCache),
            },
          };

          // set current time
          jest
            .spyOn(Date, 'now')
            .mockImplementation(() =>
              new Date(Date.UTC(2020, 2, 10)).getTime()
            );

          const data = await clusterService.getCluster(ctx);

          expect(data).toEqual(clusterCache);

          const clusterUpdated = {
            persistenceInfo: {},
            membershipInfo: null,
            version: 2,
          };

          ctx.cadence.describeCluster.mockImplementation(() => clusterUpdated);

          // set current time to an hour into the future
          jest
            .spyOn(Date, 'now')
            .mockImplementation(() =>
              new Date(Date.UTC(2020, 2, 10, 2)).getTime()
            );

          const updatedData = await clusterService.getCluster(ctx);

          expect(updatedData).toEqual(clusterUpdated);
        });
      });
    });
  });
});
