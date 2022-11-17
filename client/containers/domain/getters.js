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
  ROUTE_PARAMS_CLUSTER_NAME,
  ROUTE_PARAMS_DOMAIN,
} from '../route/getter-types';
import {
  CROSS_REGION,
  CROSS_REGION_ALLOWED_CROSS_ORIGIN,
  CROSS_REGION_CLUSTER_ORIGIN_LIST,
} from '../cross-region/getter-types';
import {
  DOMAIN_CROSS_ORIGIN,
  DOMAIN_CURRENT,
  DOMAIN_ERROR,
  DOMAIN_HASH,
  DOMAIN_IS_LOADING,
  DOMAIN_IS_READY,
  DOMAIN_NAMESPACE,
} from './getter-types';
import { statePrefix, getDomain, getCrossOrigin } from './helpers';
import { hasExpired } from '~helpers';

const getters = {
  [DOMAIN_CURRENT]: (_, getters) => {
    const clusterName = getters[ROUTE_PARAMS_CLUSTER_NAME];
    const domainNamespace = getters[DOMAIN_NAMESPACE];

    return getDomain({ clusterName, domainNamespace });
  },
  [DOMAIN_NAMESPACE]: (_, getters) => {
    const domainName = getters[ROUTE_PARAMS_DOMAIN];
    const domainHash = getters[DOMAIN_HASH];

    return domainHash[domainName];
  },
  [DOMAIN_ERROR]: (_, getters) => {
    const domainNamespace = getters[DOMAIN_NAMESPACE];

    return domainNamespace && domainNamespace.error;
  },
  [DOMAIN_HASH]: state => get(state, statePrefix('domainHash')),
  [DOMAIN_IS_LOADING]: (_, getters) =>
    getters[CROSS_REGION] &&
    getters[ROUTE_PARAMS_DOMAIN] &&
    !getters[DOMAIN_ERROR] &&
    hasExpired(get(getters[DOMAIN_CURRENT], 'expiryDateTime')),
  [DOMAIN_IS_READY]: (_, getters) =>
    !getters[DOMAIN_IS_LOADING] && !getters[DOMAIN_ERROR],
  [DOMAIN_CROSS_ORIGIN]: (_, getters) => {
    const allowedCrossOrigin = getters[CROSS_REGION_ALLOWED_CROSS_ORIGIN];
    const clusterName = getters[ROUTE_PARAMS_CLUSTER_NAME];
    const clusterOriginList = getters[CROSS_REGION_CLUSTER_ORIGIN_LIST];
    const crossRegion = getters[CROSS_REGION];
    const domain = getters[DOMAIN_CURRENT];

    return getCrossOrigin({
      allowedCrossOrigin,
      clusterName,
      clusterOriginList,
      crossRegion,
      domain,
    });
  },
};

export default getters;
