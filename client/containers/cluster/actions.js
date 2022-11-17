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

import { CLUSTER_FETCH } from './action-types';
import { CLUSTER_FETCH_EXPIRY_DATE_TIME } from './getter-types';
import { canFetchCluster } from './helpers';
import {
  CLUSTER_FETCH_FAILED,
  CLUSTER_FETCH_START,
  CLUSTER_FETCH_SUCCESS,
} from './mutation-types';
import { httpService } from '~services';

const actions = {
  [CLUSTER_FETCH]: async ({ commit, getters }) => {
    if (!canFetchCluster(getters[CLUSTER_FETCH_EXPIRY_DATE_TIME])) {
      return;
    }

    commit(CLUSTER_FETCH_START);

    try {
      const cluster = await httpService.get('/api/cluster');

      commit(CLUSTER_FETCH_SUCCESS, cluster);
    } catch (error) {
      commit(CLUSTER_FETCH_FAILED, error);
    }
  },
};

export default actions;
