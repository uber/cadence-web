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
  ROUTE_PARAMS_CLUSTER_NAME,
  ROUTE_PARAMS_DOMAIN,
  ROUTE_QUERY,
} from '../route/getter-types';

import { PENDING_TASK_FILTER_TO_EMPTY_MESSAGE_MAP } from './constants';
import {
  WORKFLOW_PENDING_ACTIVE_FILTER,
  WORKFLOW_PENDING_ACTIVE_FILTER_EMPTY_MESSAGE,
  WORKFLOW_PENDING_ACTIVE_PENDING_TASK_LIST,
} from './getter-types';
import { mapFilterToGetterType, mapPendingTaskList } from './helpers';

const getters = {
  [WORKFLOW_PENDING_ACTIVE_FILTER]: (_, getters) =>
    getters[ROUTE_QUERY].filter || 'all',
  [WORKFLOW_PENDING_ACTIVE_FILTER_EMPTY_MESSAGE]: (_, getters) => {
    const filter = getters[WORKFLOW_PENDING_ACTIVE_FILTER];

    return PENDING_TASK_FILTER_TO_EMPTY_MESSAGE_MAP[filter] || 'No results';
  },
  [WORKFLOW_PENDING_ACTIVE_PENDING_TASK_LIST]: (_, getters) => {
    const clusterName = getters[ROUTE_PARAMS_CLUSTER_NAME];
    const domain = getters[ROUTE_PARAMS_DOMAIN];
    const filter = getters[WORKFLOW_PENDING_ACTIVE_FILTER];
    const getterType = mapFilterToGetterType(filter);
    const pendingTaskList = getters[getterType] || [];

    return mapPendingTaskList({
      clusterName,
      domain,
      pendingTaskList,
    });
  },
};

export default getters;
