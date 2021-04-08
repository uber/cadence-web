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

import { ROUTE_QUERY } from '../route/getter-types';
import {
  WORKFLOW_EXECUTION_PENDING_ACTIVITIES,
  WORKFLOW_EXECUTION_PENDING_CHILDREN,
  WORKFLOW_EXECUTION_PENDING_TASKS,
} from '../workflow/getter-types';
import {
  PENDING_TASK_KVPS_EXCLUDE_KEYS,
  PENDING_TASK_FILTER_TO_EMPTY_MESSAGE_MAP,
} from './constants';
import {
  WORKFLOW_PENDING_ACTIVE_FILTER,
  WORKFLOW_PENDING_ACTIVE_FILTER_EMPTY_MESSAGE,
  WORKFLOW_PENDING_ACTIVE_PENDING_TASK_LIST,
} from './getter-types';
import { getKeyValuePairs } from '~helpers';

const WORKFLOW_PENDING_FILTER_TO_GETTER_TYPE_MAP = {
  activities: WORKFLOW_EXECUTION_PENDING_ACTIVITIES,
  children: WORKFLOW_EXECUTION_PENDING_CHILDREN,
};

const mapFilterToGetterType = filter =>
  WORKFLOW_PENDING_FILTER_TO_GETTER_TYPE_MAP[filter] || WORKFLOW_EXECUTION_PENDING_TASKS;

const mapWithKvps = item => {
  const kvps = getKeyValuePairs({
    excludes: PENDING_TASK_KVPS_EXCLUDE_KEYS,
    item,
  });

  return {
    ...item,
    kvps,
  };
};

const getters = {
  [WORKFLOW_PENDING_ACTIVE_FILTER]: (_, getters) =>
    getters[ROUTE_QUERY].filter || 'all',
  [WORKFLOW_PENDING_ACTIVE_FILTER_EMPTY_MESSAGE]: (_, getters) => {
    const filter = getters[WORKFLOW_PENDING_ACTIVE_FILTER];
    return PENDING_TASK_FILTER_TO_EMPTY_MESSAGE_MAP[filter];
  },
  [WORKFLOW_PENDING_ACTIVE_PENDING_TASK_LIST]: (_, getters) => {
    const filter = getters[WORKFLOW_PENDING_ACTIVE_FILTER];
    const getterType = mapFilterToGetterType(filter);
    const pendingTaskList = getters[getterType];
    const mappedPendingTaskList = pendingTaskList.map(mapWithKvps);

    return mappedPendingTaskList;
  },
};

export default getters;
