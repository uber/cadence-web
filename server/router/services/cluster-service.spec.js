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

import ClusterService from './cluster-service';

describe('clusterService', () => {
  let clusterService;

  beforeEach(() => {
    const cacheManagerMock = {
      get: callback => callback(),
    };

    clusterService = new ClusterService(cacheManagerMock);
  });

  describe('getCluster', () => {
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
});
