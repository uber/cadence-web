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

import { CROSS_REGION_FETCH } from './action-types';
import { CROSS_REGION_IS_READY } from './getter-types';
import {
  CROSS_REGION_RESET_STATE,
  CROSS_REGION_SET_ALLOWED_CROSS_ORIGIN,
  CROSS_REGION_SET_CLUSTER_ORIGIN_LIST,
  CROSS_REGION_SET_CROSS_REGION,
  CROSS_REGION_SET_IS_READY,
} from './mutation-types';
import { featureFlagService } from '~services';

const actions = {
  [CROSS_REGION_FETCH]: async ({ commit, getters }) => {
    const ready = getters[CROSS_REGION_IS_READY];

    if (ready) {
      return;
    }

    commit(CROSS_REGION_RESET_STATE);

    const crossRegion = await featureFlagService.isFeatureFlagEnabled({
      name: 'crossRegion',
    });

    commit(CROSS_REGION_SET_CROSS_REGION, crossRegion);

    if (!crossRegion) {
      commit(CROSS_REGION_SET_IS_READY, true);

      return;
    }

    const { origin } = window.location;
    const [allowedCrossOrigin, clusterOriginList] = await Promise.all([
      featureFlagService.isFeatureFlagEnabled({
        name: 'crossRegion.allowedCrossOrigin',
        params: {
          origin,
        },
      }),
      featureFlagService.getConfiguration({
        name: 'crossRegion.clusterOriginList',
      }),
    ]);

    commit(CROSS_REGION_SET_ALLOWED_CROSS_ORIGIN, allowedCrossOrigin);
    commit(CROSS_REGION_SET_CLUSTER_ORIGIN_LIST, clusterOriginList);
    commit(CROSS_REGION_SET_IS_READY, true);
  },
};

export default actions;
