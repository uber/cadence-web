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

import { get } from 'lodash-es';
import { statePrefix } from './helpers';
import {
  CROSS_REGION,
  CROSS_REGION_ALLOWED_CROSS_ORIGIN,
  CROSS_REGION_CLUSTER_ORIGIN_LIST,
  CROSS_REGION_IS_LOADING,
  CROSS_REGION_IS_READY,
} from './getter-types';

const getters = {
  [CROSS_REGION]: state => get(state, statePrefix('crossRegion')),
  [CROSS_REGION_ALLOWED_CROSS_ORIGIN]: state =>
    get(state, statePrefix('allowedCrossOrigin')),
  [CROSS_REGION_CLUSTER_ORIGIN_LIST]: state =>
    get(state, statePrefix('clusterOriginList')),
  [CROSS_REGION_IS_LOADING]: (_, getters) => !getters[CROSS_REGION_IS_READY],
  [CROSS_REGION_IS_READY]: state => get(state, statePrefix('isReady')),
};

export default getters;
