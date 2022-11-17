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

const atob = require('atob');
const formatEnum = require('../format-enum');
const formatPayload = require('../format-payload');
const formatPayloadMap = require('../format-payload-map');
const formatDurationToSeconds = require('../format-duration-to-seconds');
const formatRetryPolicy = require('./format-retry-policy');

const formatStartChildWorkflowExecutionInitiatedEventAttributes = ({
  control,
  decisionTaskCompletedEventId,
  delayStart,
  executionStartToCloseTimeout,
  header,
  input,
  memo,
  parentClosePolicy,
  retryPolicy,
  searchAttributes,
  taskList,
  taskStartToCloseTimeout,
  workflowIdReusePolicy,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  control: control ? parseInt(atob(control)) : null,
  decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
  delayStartSeconds: formatDurationToSeconds(delayStart),
  executionStartToCloseTimeoutSeconds: formatDurationToSeconds(
    executionStartToCloseTimeout
  ),
  header: formatPayloadMap(header, 'fields'),
  input: formatPayload(input),
  memo: formatPayloadMap(memo, 'fields'),
  parentClosePolicy: formatEnum(parentClosePolicy, 'PARENT_CLOSE_POLICY'),
  retryPolicy: formatRetryPolicy(retryPolicy),
  searchAttributes: formatPayloadMap(searchAttributes, 'indexedFields'),
  taskList: {
    kind: formatEnum(taskList?.kind, 'TASK_LIST_KIND'),
    name: taskList?.name || null,
  },
  taskStartToCloseTimeoutSeconds: formatDurationToSeconds(
    taskStartToCloseTimeout
  ),
  workflowIdReusePolicy: formatEnum(
    workflowIdReusePolicy,
    'WORKFLOW_ID_REUSE_POLICY',
    'pascal'
  ),
});

module.exports = formatStartChildWorkflowExecutionInitiatedEventAttributes;
