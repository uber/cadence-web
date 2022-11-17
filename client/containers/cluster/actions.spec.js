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

import actions from './actions';
import { CLUSTER_FETCH } from './action-types';
import {
  CLUSTER_FETCH_FAILED,
  CLUSTER_FETCH_START,
  CLUSTER_FETCH_SUCCESS,
} from './mutation-types';
import { canFetchCluster } from './helpers';
import { httpService } from '~services';

jest.mock('./helpers', () => ({
  canFetchCluster: jest.fn(),
}));

jest.mock('~services', () => ({
  httpService: {
    get: jest.fn(),
  },
}));

describe('cluster actions', () => {
  describe('CLUSTER_FETCH', () => {
    describe('canFetchCluster returns false', () => {
      beforeEach(() => {
        canFetchCluster.mockImplementation(() => false);
      });

      it('should not commit CLUSTER_FETCH_START', () => {
        const commit = jest.fn();
        const getters = {};

        actions[CLUSTER_FETCH]({ commit, getters });

        expect(commit).not.toHaveBeenCalled();
      });
    });

    describe('canFetchCluster returns true', () => {
      beforeEach(() => {
        canFetchCluster.mockImplementation(() => true);
      });

      it('should commit CLUSTER_FETCH_START', () => {
        const commit = jest.fn();
        const getters = {};

        actions[CLUSTER_FETCH]({ commit, getters });

        expect(commit).toHaveBeenCalledWith(CLUSTER_FETCH_START);
      });

      describe('when API throws an error', () => {
        beforeEach(() => {
          httpService.get.mockImplementation(() => {
            throw new Error();
          });
        });

        it('should commit CLUSTER_FETCH_FAILED', () => {
          const commit = jest.fn();
          const getters = {};

          actions[CLUSTER_FETCH]({ commit, getters });

          expect(commit).toHaveBeenCalledWith(
            CLUSTER_FETCH_FAILED,
            new Error()
          );
        });
      });

      describe('when API returns cluster', () => {
        const cluster = {
          persistenceInfo: {},
        };

        beforeEach(() => {
          httpService.get.mockImplementation(() => cluster);
        });

        it('should commit CLUSTER_FETCH_SUCCESS with cluster', async () => {
          const commit = jest.fn();
          const getters = {};

          await actions[CLUSTER_FETCH]({ commit, getters });

          expect(commit).toHaveBeenCalledWith(CLUSTER_FETCH_SUCCESS, cluster);
        });
      });
    });
  });
});
