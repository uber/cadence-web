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

import { CROSS_REGION_ALLOWED_CROSS_ORIGIN } from '../cross-region/getter-types';
import {
  ROUTE_PARAMS_CLUSTER_NAME,
  ROUTE_PARAMS_DOMAIN,
} from '../route/getter-types';
import { ACTIVE_STATUS_ON_CHANGE } from './action-types';
import { getHrefFromCluster } from './helpers';

const actions = {
  [ACTIVE_STATUS_ON_CHANGE]: ({ dispatch, getters }, cluster) => {
    const allowedCrossOrigin = getters[CROSS_REGION_ALLOWED_CROSS_ORIGIN];
    const clusterName = getters[ROUTE_PARAMS_CLUSTER_NAME];
    const domainName = getters[ROUTE_PARAMS_DOMAIN];
    const { origin, pathname } = window.location;

    const href = getHrefFromCluster({
      allowedCrossOrigin,
      cluster,
      clusterName,
      domainName,
      origin,
      pathname,
    });

    window.location = href;
  },
};

export default actions;
