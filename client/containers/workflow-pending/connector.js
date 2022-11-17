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
import { WORKFLOW_EXECUTION_IS_LOADING } from '../workflow/getter-types';
import { WORKFLOW_PENDING_FILTER_CHANGED } from './action-types';
import {
  WORKFLOW_PENDING_ACTIVE_FILTER,
  WORKFLOW_PENDING_ACTIVE_FILTER_EMPTY_MESSAGE,
  WORKFLOW_PENDING_ACTIVE_PENDING_TASK_LIST,
} from './getter-types';

const actionsToEvents = {
  filterChanged: WORKFLOW_PENDING_FILTER_CHANGED,
};

const gettersToProps = {
  emptyMessage: WORKFLOW_PENDING_ACTIVE_FILTER_EMPTY_MESSAGE,
  filter: WORKFLOW_PENDING_ACTIVE_FILTER,
  isLoading: WORKFLOW_EXECUTION_IS_LOADING,
  pendingTaskList: WORKFLOW_PENDING_ACTIVE_PENDING_TASK_LIST,
};

export default connect({
  actionsToEvents,
  gettersToProps,
});
