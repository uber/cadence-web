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

import { connect } from 'vuex-connect';
import { CLUSTER_FETCH } from '../cluster/action-types';
import { CLUSTER_ADVANCED_VISIBILITY_ENABLED } from '../cluster/getter-types';
import {
  WORKFLOW_LIST_ON_FILTER_CHANGE,
  WORKFLOW_LIST_ON_FILTER_MODE_CLICK,
} from './action-types';
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

const actionsToEvents = {
  onFilterChange: WORKFLOW_LIST_ON_FILTER_CHANGE,
  onFilterModeClick: WORKFLOW_LIST_ON_FILTER_MODE_CLICK,
};

const gettersToProps = {
  fetchWorkflowListUrl: WORKFLOW_LIST_FETCH_WORKFLOW_LIST_URL,
  filterBy: WORKFLOW_LIST_FILTER_BY,
  filterMode: WORKFLOW_LIST_FILTER_MODE,
  filterModeButtonEnabled: CLUSTER_ADVANCED_VISIBILITY_ENABLED,
  filterModeButtonLabel: WORKFLOW_LIST_FILTER_MODE_BUTTON_LABEL,
  isCron: WORKFLOW_LIST_IS_CRON,
  isCronInputVisible: CLUSTER_ADVANCED_VISIBILITY_ENABLED,
  queryString: WORKFLOW_LIST_QUERY_STRING,
  state: WORKFLOW_LIST_STATE,
  status: WORKFLOW_LIST_STATUS,
  statusName: WORKFLOW_LIST_STATUS_NAME,
  workflowId: WORKFLOW_LIST_WORKFLOW_ID,
  workflowName: WORKFLOW_LIST_WORKFLOW_NAME,
};

const lifecycle = {
  created: ({ dispatch }) => dispatch(CLUSTER_FETCH),
};

export default connect({
  actionsToEvents,
  gettersToProps,
  lifecycle,
});
