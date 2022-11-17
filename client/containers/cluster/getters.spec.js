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

import getterFns from './getters';
import {
  CLUSTER_ADVANCED_VISIBILITY_ENABLED,
  CLUSTER_FETCH_ERROR,
  CLUSTER_FETCH_EXPIRY_DATE_TIME,
  CLUSTER_VISIBILITY_FEATURES,
} from './getter-types';
import { initGetters } from '~test';

describe('cluster getters', () => {
  describe('CLUSTER_ADVANCED_VISIBILITY_ENABLED', () => {
    describe('state.cluster.data.persistenceInfo.visibilityStore.features is not set', () => {
      it('should return false.', () => {
        const state = {
          cluster: {},
        };

        const getters = initGetters({ getterFns, state });

        const output = getters[CLUSTER_ADVANCED_VISIBILITY_ENABLED];

        expect(output).toEqual(false);
      });
    });

    describe('state.cluster.data.persistenceInfo.visibilityStore.features is set', () => {
      it('should return advancedVisibilityEnabled enabled value.', () => {
        const state = {
          cluster: {
            data: {
              persistenceInfo: {
                visibilityStore: {
                  features: [
                    { enabled: true, key: 'advancedVisibilityEnabled' },
                  ],
                },
              },
            },
          },
        };

        const getters = initGetters({ getterFns, state });

        const output = getters[CLUSTER_ADVANCED_VISIBILITY_ENABLED];

        expect(output).toEqual(true);
      });
    });
  });

  describe('CLUSTER_FETCH_ERROR', () => {
    it('should return state.cluster.error.', () => {
      const state = {
        cluster: {
          error: 'an error message',
        },
      };

      const getters = initGetters({ getterFns, state });

      const output = getters[CLUSTER_FETCH_ERROR];

      expect(output).toEqual('an error message');
    });
  });

  describe('CLUSTER_FETCH_EXPIRY_DATE_TIME', () => {
    it('should return state.cluster.expiryDateTime', () => {
      const state = {
        cluster: {
          expiryDateTime: '2021-05-21T23:03:51.913Z',
        },
      };

      const getters = initGetters({ getterFns, state });

      const output = getters[CLUSTER_FETCH_EXPIRY_DATE_TIME];

      expect(output).toEqual('2021-05-21T23:03:51.913Z');
    });
  });

  describe('CLUSTER_VISIBILITY_FEATURES', () => {
    describe('state.cluster.data.persistenceInfo.visibilityStore.features is not set', () => {
      it('should return an empty array.', () => {
        const state = {
          cluster: {},
        };

        const getters = initGetters({ getterFns, state });

        const output = getters[CLUSTER_VISIBILITY_FEATURES];

        expect(output).toEqual([]);
      });
    });

    describe('state.cluster.data.persistenceInfo.visibilityStore.features is set', () => {
      it('should return state.cluster.data.persistenceInfo.visibilityStore.features.', () => {
        const state = {
          cluster: {
            data: {
              persistenceInfo: {
                visibilityStore: {
                  features: [
                    { enabled: true, key: 'advancedVisibilityEnabled' },
                  ],
                },
              },
            },
          },
        };

        const getters = initGetters({ getterFns, state });

        const output = getters[CLUSTER_VISIBILITY_FEATURES];

        expect(output).toEqual([
          { enabled: true, key: 'advancedVisibilityEnabled' },
        ]);
      });
    });
  });
});
