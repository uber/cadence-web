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

import { DOMAIN_IS_READY, DOMAIN_HASH } from '../domain/getter-types';
import {
  ROUTE_PARAMS_WORKFLOW_ID,
  ROUTE_PARAMS_CLUSTER_NAME,
  ROUTE_PARAMS_DOMAIN,
} from '../route/getter-types';
import {
  CROSS_REGION,
  CROSS_REGION_ALLOWED_CROSS_ORIGIN,
  CROSS_REGION_CLUSTER_ORIGIN_LIST,
} from '../cross-region/getter-types';
import {
  ACTIVE_STATUS_CLASSNAME,
  ACTIVE_STATUS_CLUSTER,
  ACTIVE_STATUS_CLUSTER_LIST,
  ACTIVE_STATUS_LABEL,
  ACTIVE_STATUS_SELECT_LIST,
  ACTIVE_STATUS_TAG,
} from './getter-types';
import {
  getClusterFromClusterList,
  getClusterListFromDomainConfigList,
  getFilteredClusterList,
} from './helpers';

const getters = {
  [ACTIVE_STATUS_CLASSNAME]: (_, getters) => {
    const cluster = getters[ACTIVE_STATUS_CLUSTER];

    return cluster && cluster.isActive ? 'active' : 'passive';
  },
  [ACTIVE_STATUS_CLUSTER]: (_, getters) => {
    const allowedCrossOrigin = getters[CROSS_REGION_ALLOWED_CROSS_ORIGIN];
    const clusterList = getters[ACTIVE_STATUS_CLUSTER_LIST];
    const clusterName = getters[ROUTE_PARAMS_CLUSTER_NAME];
    const { origin } = window.location;

    return getClusterFromClusterList({
      allowedCrossOrigin,
      clusterList,
      clusterName,
      origin,
    });
  },
  [ACTIVE_STATUS_CLUSTER_LIST]: (_, getters) => {
    const clusterOriginList = getters[CROSS_REGION_CLUSTER_ORIGIN_LIST];
    const crossRegion = getters[CROSS_REGION];
    const domainHash = getters[DOMAIN_HASH];
    const domainName = getters[ROUTE_PARAMS_DOMAIN];
    const isReady = getters[DOMAIN_IS_READY];

    const domainNamespace = domainHash[domainName];

    if (!crossRegion || !isReady) {
      return [];
    }

    const domainConfigList = domainNamespace.global
      ? [domainNamespace.global]
      : domainNamespace.local;

    return getClusterListFromDomainConfigList({
      clusterOriginList,
      domainConfigList,
    });
  },
  [ACTIVE_STATUS_LABEL]: (_, getters) => {
    const cluster = getters[ACTIVE_STATUS_CLUSTER];

    return cluster && cluster.label;
  },
  [ACTIVE_STATUS_SELECT_LIST]: (_, getters) => {
    const allowedCrossOrigin = getters[CROSS_REGION_ALLOWED_CROSS_ORIGIN];
    const clusterList = getters[ACTIVE_STATUS_CLUSTER_LIST];
    const clusterName = getters[ROUTE_PARAMS_CLUSTER_NAME];
    const { origin } = window.location;

    return getFilteredClusterList({
      allowedCrossOrigin,
      clusterList,
      clusterName,
      origin,
    });
  },
  [ACTIVE_STATUS_TAG]: (_, getters) => {
    const cluster = getters[ACTIVE_STATUS_CLUSTER];
    const isReady = getters[DOMAIN_IS_READY];
    const selectList = getters[ACTIVE_STATUS_SELECT_LIST];
    const workflowId = getters[ROUTE_PARAMS_WORKFLOW_ID];

    if (!isReady || !cluster) {
      return 'span';
    }

    const { isGlobalDomain } = cluster;

    return (selectList && selectList.length === 0) ||
      (!isGlobalDomain && workflowId)
      ? 'span'
      : 'select-input';
  },
};

export default getters;
