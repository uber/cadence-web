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
  PENDING_TASK_TYPE_ACTIVITY,
  PENDING_TASK_TYPE_CHILD_WORKFLOW,
  PENDING_TASK_TYPE_DECISION,
} from '../workflow/constants';
import {
  WORKFLOW_EXECUTION_PENDING_ACTIVITIES,
  WORKFLOW_EXECUTION_PENDING_CHILDREN,
  WORKFLOW_EXECUTION_PENDING_TASKS,
  WORKFLOW_EXECUTION_PENDING_DECISIONS,
} from '../workflow/getter-types';

export const PENDING_TASK_FILTER_ACTIVITIES = 'activities';
export const PENDING_TASK_FILTER_ALL = 'all';
export const PENDING_TASK_FILTER_CHILDREN = 'child workflows';
export const PENDING_TASK_FILTER_DECISIONS = 'decisions';

export const PENDING_TASK_FILTERS = [
  PENDING_TASK_FILTER_ALL,
  PENDING_TASK_FILTER_ACTIVITIES,
  PENDING_TASK_FILTER_CHILDREN,
  PENDING_TASK_FILTER_DECISIONS,
];

export const PENDING_TASK_FILTER_TO_EMPTY_MESSAGE_MAP = {
  [PENDING_TASK_FILTER_ACTIVITIES]: 'No pending activities',
  [PENDING_TASK_FILTER_ALL]: 'No pending tasks',
  [PENDING_TASK_FILTER_CHILDREN]: 'No pending child workflows',
  [PENDING_TASK_FILTER_DECISIONS]: 'No pending decisions',
};

export const PENDING_TASK_FILTER_TO_GETTER_TYPE_MAP = {
  [PENDING_TASK_FILTER_ACTIVITIES]: WORKFLOW_EXECUTION_PENDING_ACTIVITIES,
  [PENDING_TASK_FILTER_ALL]: WORKFLOW_EXECUTION_PENDING_TASKS,
  [PENDING_TASK_FILTER_CHILDREN]: WORKFLOW_EXECUTION_PENDING_CHILDREN,
  [PENDING_TASK_FILTER_DECISIONS]: WORKFLOW_EXECUTION_PENDING_DECISIONS,
};

export const PENDING_TASK_KVPS_EXCLUDE_KEYS = [
  'pendingTaskId',
  'pendingTaskType',
  'pendingTaskTypeDisplay',
];

export const PENDING_TASK_TYPE_TO_ID_MAP = {
  [PENDING_TASK_TYPE_ACTIVITY]: 'activityID',
  [PENDING_TASK_TYPE_CHILD_WORKFLOW]: 'initiatedID',
  [PENDING_TASK_TYPE_DECISION]: 'scheduledTimestamp',
};

export const PENDING_TASK_TYPE_TO_DISPLAY_MAP = {
  [PENDING_TASK_TYPE_ACTIVITY]: 'PendingActivityTask',
  [PENDING_TASK_TYPE_CHILD_WORKFLOW]: 'PendingChildWorkflowTask',
  [PENDING_TASK_TYPE_DECISION]: 'PendingDecisionTask',
};
