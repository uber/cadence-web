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

import moment from 'moment';
import {
  CLUSTER_FETCH_FAILED,
  CLUSTER_FETCH_START,
  CLUSTER_FETCH_SUCCESS,
} from './mutation-types';
import { CLUSTER_FETCH_EXPIRY_TTL } from './constants';

const mutations = {
  [CLUSTER_FETCH_FAILED]: (state, payload) => {
    state.cluster.error = payload;
  },
  [CLUSTER_FETCH_START]: state => {
    state.cluster.error = null;
  },
  [CLUSTER_FETCH_SUCCESS]: (state, payload) => {
    state.cluster.expiryDateTime = moment()
      .add(CLUSTER_FETCH_EXPIRY_TTL)
      .toISOString();
    state.cluster.data = payload;
  },
};

export default mutations;
