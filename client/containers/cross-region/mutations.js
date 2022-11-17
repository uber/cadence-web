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

import {
  CROSS_REGION_SET_ALLOWED_CROSS_ORIGIN,
  CROSS_REGION_SET_CLUSTER_ORIGIN_LIST,
  CROSS_REGION_SET_CROSS_REGION,
  CROSS_REGION_SET_IS_READY,
  CROSS_REGION_RESET_STATE,
} from './mutation-types';
import getDefaultState from './get-default-state';

const mutations = {
  [CROSS_REGION_RESET_STATE]: state => {
    const defaultState = getDefaultState();

    state.crossRegion = defaultState;
  },
  [CROSS_REGION_SET_ALLOWED_CROSS_ORIGIN]: (state, payload) =>
    (state.crossRegion.allowedCrossOrigin = payload),
  [CROSS_REGION_SET_CLUSTER_ORIGIN_LIST]: (state, payload) =>
    (state.crossRegion.clusterOriginList = payload),
  [CROSS_REGION_SET_CROSS_REGION]: (state, payload) =>
    (state.crossRegion.crossRegion = payload),
  [CROSS_REGION_SET_IS_READY]: (state, payload) =>
    (state.crossRegion.isReady = payload),
};

export default mutations;
