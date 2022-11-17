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
  PENDING_TASK_TYPE_ACTIVITY,
  PENDING_TASK_TYPE_CHILD_WORKFLOW,
  PENDING_TASK_TYPE_DECISION,
} from './constants';
import {
  WORKFLOW_EXECUTION,
  WORKFLOW_EXECUTION_IS_LOADING,
  WORKFLOW_EXECUTION_PENDING_ACTIVITIES,
  WORKFLOW_EXECUTION_PENDING_CHILDREN,
  WORKFLOW_EXECUTION_PENDING_DECISIONS,
  WORKFLOW_EXECUTION_PENDING_TASK_COUNT,
  WORKFLOW_EXECUTION_PENDING_TASKS,
  WORKFLOW_EXECUTION_TASK_LIST_NAME,
} from './getter-types';

const getters = {
  [WORKFLOW_EXECUTION]: state => get(state, 'workflow.execution'),
  [WORKFLOW_EXECUTION_IS_LOADING]: state =>
    get(state, 'workflow.isLoading') || false,
  [WORKFLOW_EXECUTION_PENDING_ACTIVITIES]: state =>
    (get(state, 'workflow.execution.pendingActivities') || []).map(item => ({
      ...item,
      pendingTaskType: PENDING_TASK_TYPE_ACTIVITY,
    })),
  [WORKFLOW_EXECUTION_PENDING_CHILDREN]: state =>
    (get(state, 'workflow.execution.pendingChildren') || []).map(item => ({
      ...item,
      pendingTaskType: PENDING_TASK_TYPE_CHILD_WORKFLOW,
    })),
  [WORKFLOW_EXECUTION_PENDING_DECISIONS]: state => {
    const pendingDecision = get(state, 'workflow.execution.pendingDecision');

    if (!pendingDecision) {
      return [];
    }

    return [
      {
        ...pendingDecision,
        pendingTaskType: PENDING_TASK_TYPE_DECISION,
      },
    ];
  },
  [WORKFLOW_EXECUTION_PENDING_TASK_COUNT]: (_, getters) =>
    getters[WORKFLOW_EXECUTION_PENDING_TASKS].length,
  [WORKFLOW_EXECUTION_PENDING_TASKS]: (_, getters) => [
    ...getters[WORKFLOW_EXECUTION_PENDING_ACTIVITIES],
    ...getters[WORKFLOW_EXECUTION_PENDING_CHILDREN],
    ...getters[WORKFLOW_EXECUTION_PENDING_DECISIONS],
  ],
  [WORKFLOW_EXECUTION_TASK_LIST_NAME]: state =>
    get(state, 'workflow.execution.executionConfiguration.taskList.name') || '',
};

export default getters;
