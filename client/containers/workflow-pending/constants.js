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

import {
  PENDING_TASK_TYPE_ACTIVITY,
  PENDING_TASK_TYPE_CHILD_WORKFLOW,
} from '../workflow/constants';

export const PENDING_TASK_FILTER_TO_EMPTY_MESSAGE_MAP = {
  all: 'No pending tasks',
  activities: 'No pending activities',
  children: 'No pending child workflows',
};

export const PENDING_TASK_KVPS_EXCLUDE_KEYS = [
  'pendingTaskId',
  'pendingTaskType',
  'pendingTaskTypeDisplay',
];

export const PENDING_TASK_TYPE_TO_ID_MAP = {
  [PENDING_TASK_TYPE_ACTIVITY]: 'activityID',
  [PENDING_TASK_TYPE_CHILD_WORKFLOW]: 'initiatedID',
};

export const PENDING_TASK_TYPE_TO_DISPLAY_MAP = {
  [PENDING_TASK_TYPE_ACTIVITY]: 'PendingActivityTask',
  [PENDING_TASK_TYPE_CHILD_WORKFLOW]: 'PendingChildWorkflowTask',
};
