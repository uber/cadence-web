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

import mutations from './mutations';
import {
  CLUSTER_FETCH_FAILED,
  CLUSTER_FETCH_START,
  CLUSTER_FETCH_SUCCESS,
} from './mutation-types';

jest.mock('moment', () => () =>
  jest.requireActual('moment')('2020-01-01T00:00:00.000Z')
);

describe('cluster mutations', () => {
  describe('CLUSTER_FETCH_FAILED', () => {
    const state = {
      cluster: {
        error: null,
      },
    };

    it('should set state.cluster.error = payload.', () => {
      const payload = 'an error message';

      mutations[CLUSTER_FETCH_FAILED](state, payload);
      expect(state.cluster.error).toEqual('an error message');
    });
  });

  describe('CLUSTER_FETCH_START', () => {
    const state = {
      cluster: {
        error: 'an error message',
      },
    };

    it('should set state.cluster.error = null.', () => {
      mutations[CLUSTER_FETCH_START](state);
      expect(state.cluster.error).toEqual(null);
    });
  });

  describe('CLUSTER_FETCH_SUCCESS', () => {
    const state = {
      cluster: {
        data: null,
        expiryDateTime: null,
      },
    };

    it('should set state.cluster.data = payload and state.cluster.expiryDateTime = Date() + CLUSTER_FETCH_EXPIRY_TTL', () => {
      const payload = {};

      mutations[CLUSTER_FETCH_SUCCESS](state, payload);
      expect(state.cluster).toEqual({
        data: {},
        expiryDateTime: '2020-01-01T01:00:00.000Z',
      });
    });
  });
});
