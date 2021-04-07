// Copyright (c) 2021 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { get } from 'lodash-es';
import { ROUTE_PARAMS } from '../route/getter-types';
import {
  WORKFLOW_EXECUTION,
  WORKFLOW_EXECUTION_IS_LOADING,
  WORKFLOW_EXECUTION_PENDING_ACTIVITIES,
  WORKFLOW_EXECUTION_PENDING_CHILDREN,
  WORKFLOW_EXECUTION_PENDING_TASK_COUNT,
  WORKFLOW_EXECUTION_PENDING_TASKS,
  WORKFLOW_EXECUTION_TASK_LIST_NAME,
} from './getter-types';
import { mapPendingTaskList } from './helpers';

const getters = {
  [WORKFLOW_EXECUTION]: ({ workflow }) => workflow.execution,
  [WORKFLOW_EXECUTION_IS_LOADING]: ({ workflow }) => workflow.isLoading,
  [WORKFLOW_EXECUTION_TASK_LIST_NAME]: ({ workflow }) =>
    get(workflow, 'execution.executionConfiguration.taskList.name'),
  [WORKFLOW_EXECUTION_PENDING_ACTIVITIES]: ({ workflow }, getters) =>
    mapPendingTaskList({
      domain: getters[ROUTE_PARAMS].domain,
      pendingTaskType: 'activity',
      pendingTaskList: get(workflow, 'execution.pendingActivities') || [],
    }),
  [WORKFLOW_EXECUTION_PENDING_CHILDREN]: ({ workflow }, getters) =>
    mapPendingTaskList({
      domain: getters[ROUTE_PARAMS].domain,
      pendingTaskType: 'childWorkflow',
      pendingTaskList: get(workflow, 'execution.pendingChildren') || [],
    }),
  [WORKFLOW_EXECUTION_PENDING_TASK_COUNT]: (_, getters) =>
    getters[WORKFLOW_EXECUTION_PENDING_TASKS].length,
  [WORKFLOW_EXECUTION_PENDING_TASKS]: (_, getters) => [
    ...getters[WORKFLOW_EXECUTION_PENDING_ACTIVITIES],
    ...getters[WORKFLOW_EXECUTION_PENDING_CHILDREN],
  ],
};

export default getters;
