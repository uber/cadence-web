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
import {
  CLUSTER_ADVANCED_VISIBILITY_ENABLED,
  CLUSTER_FETCH_ERROR,
  CLUSTER_FETCH_EXPIRY_DATE_TIME,
  CLUSTER_VISIBILITY_FEATURES,
} from './getter-types';
import { CLUSTER_VISIBILITY_FEATURES_ADVANCED_VISIBILITY_ENABLED_KEY } from './constants';

const getters = {
  [CLUSTER_ADVANCED_VISIBILITY_ENABLED]: (_, getters) => {
    const advancedVisibilityEnabledFeature = getters[
      CLUSTER_VISIBILITY_FEATURES
    ].find(
      ({ key }) =>
        key === CLUSTER_VISIBILITY_FEATURES_ADVANCED_VISIBILITY_ENABLED_KEY
    );

    if (advancedVisibilityEnabledFeature) {
      return advancedVisibilityEnabledFeature.enabled;
    }

    return false;
  },
  [CLUSTER_FETCH_ERROR]: state => get(state, 'cluster.error'),
  [CLUSTER_FETCH_EXPIRY_DATE_TIME]: state =>
    get(state, 'cluster.expiryDateTime'),
  [CLUSTER_VISIBILITY_FEATURES]: state =>
    get(state, 'cluster.data.persistenceInfo.visibilityStore.features') || [],
};

export default getters;
