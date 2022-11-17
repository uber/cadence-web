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
  ROUTE_PARAMS,
  ROUTE_PARAMS_CLUSTER_NAME,
  ROUTE_PARAMS_DOMAIN,
  ROUTE_PARAMS_WORKFLOW_ID,
  ROUTE_QUERY,
} from './getter-types';

const getters = {
  [ROUTE_PARAMS]: state => get(state, 'route.params', {}),
  [ROUTE_PARAMS_CLUSTER_NAME]: (_, getters) =>
    getters[ROUTE_PARAMS].clusterName,
  [ROUTE_PARAMS_DOMAIN]: (_, getters) => getters[ROUTE_PARAMS].domain,
  [ROUTE_PARAMS_WORKFLOW_ID]: (_, getters) => getters[ROUTE_PARAMS].workflowId,
  [ROUTE_QUERY]: state => get(state, 'route.query', {}),
};

export default getters;
