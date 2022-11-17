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

const formatEnum = require('../format-enum');
const formatPayload = require('../format-payload');
const formatPayloadMap = require('../format-payload-map');
const formatDurationToSeconds = require('../format-duration-to-seconds');
const formatRetryPolicy = require('./format-retry-policy');

const formatActivityTaskScheduledEventAttributes = ({
  decisionTaskCompletedEventId,
  domain,
  header,
  heartbeatTimeout,
  input,
  retryPolicy,
  scheduleToCloseTimeout,
  scheduleToStartTimeout,
  startToCloseTimeout,
  taskList,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
  domain: domain || null,
  header: formatPayloadMap(header, 'fields'),
  heartbeatTimeoutSeconds: formatDurationToSeconds(heartbeatTimeout),
  input: formatPayload(input),
  retryPolicy: formatRetryPolicy(retryPolicy),
  scheduleToCloseTimeoutSeconds: formatDurationToSeconds(
    scheduleToCloseTimeout
  ),
  scheduleToStartTimeoutSeconds: formatDurationToSeconds(
    scheduleToStartTimeout
  ),
  startToCloseTimeoutSeconds: formatDurationToSeconds(startToCloseTimeout),
  taskList: {
    kind: formatEnum(taskList?.kind, 'TASK_LIST_KIND'),
    name: taskList?.name || null,
  },
});

module.exports = formatActivityTaskScheduledEventAttributes;
