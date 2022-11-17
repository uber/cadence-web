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

import { ROUTE_PARAMS_DOMAIN, ROUTE_QUERY } from '../route/getter-types';
import { FILTER_MODE_BASIC } from './constants';
import {
  WORKFLOW_LIST_FETCH_WORKFLOW_LIST_URL,
  WORKFLOW_LIST_FILTER_BY,
  WORKFLOW_LIST_FILTER_MODE,
  WORKFLOW_LIST_FILTER_MODE_BUTTON_LABEL,
  WORKFLOW_LIST_IS_CRON,
  WORKFLOW_LIST_QUERY_STRING,
  WORKFLOW_LIST_STATE,
  WORKFLOW_LIST_STATUS,
  WORKFLOW_LIST_STATUS_NAME,
  WORKFLOW_LIST_WORKFLOW_ID,
  WORKFLOW_LIST_WORKFLOW_NAME,
} from './getter-types';
import {
  getFetchWorkflowListUrl,
  getFilterBy,
  getFilterModeButtonLabel,
  getIsCron,
  getState,
  getStatus,
} from './helpers';

const getters = {
  [WORKFLOW_LIST_FETCH_WORKFLOW_LIST_URL]: (_, getters) =>
    getFetchWorkflowListUrl({
      domain: getters[ROUTE_PARAMS_DOMAIN],
      filterMode: getters[WORKFLOW_LIST_FILTER_MODE],
      state: getters[WORKFLOW_LIST_STATE],
    }),
  [WORKFLOW_LIST_FILTER_BY]: (_, getters) =>
    getFilterBy(getters[WORKFLOW_LIST_STATUS_NAME]),
  [WORKFLOW_LIST_FILTER_MODE]: (_, getters) =>
    getters[ROUTE_QUERY].filterMode || FILTER_MODE_BASIC,
  [WORKFLOW_LIST_FILTER_MODE_BUTTON_LABEL]: (_, getters) =>
    getFilterModeButtonLabel(getters[WORKFLOW_LIST_FILTER_MODE]),
  [WORKFLOW_LIST_IS_CRON]: (_, getters) =>
    getIsCron(getters[ROUTE_QUERY].isCron),
  [WORKFLOW_LIST_QUERY_STRING]: (_, getters) =>
    getters[ROUTE_QUERY].queryString || '',
  [WORKFLOW_LIST_STATE]: (_, getters) =>
    getState(getters[WORKFLOW_LIST_STATUS_NAME]),
  [WORKFLOW_LIST_STATUS]: (_, getters) =>
    getStatus(getters[ROUTE_QUERY].status),
  [WORKFLOW_LIST_STATUS_NAME]: (_, getters) =>
    getters[WORKFLOW_LIST_STATUS].value,
  [WORKFLOW_LIST_WORKFLOW_ID]: (_, getters) => getters[ROUTE_QUERY].workflowId,
  [WORKFLOW_LIST_WORKFLOW_NAME]: (_, getters) =>
    getters[ROUTE_QUERY].workflowName,
};

export default getters;
