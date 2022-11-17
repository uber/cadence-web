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
const formatFailureDetails = require('../format-failure-details');
const formatPayload = require('../format-payload');
const formatPayloadMap = require('../format-payload-map');
const formatDurationToSeconds = require('../format-duration-to-seconds');

const formatWorkflowExecutionContinuedAsNewEventAttributes = ({
  backoffStartInterval,
  decisionTaskCompletedEventId,
  executionStartToCloseTimeout,
  failure,
  header,
  initiator,
  input,
  memo,
  searchAttributes,
  taskList,
  taskStartToCloseTimeout,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  backoffStartIntervalInSeconds: formatDurationToSeconds(backoffStartInterval),
  decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
  executionStartToCloseTimeoutSeconds: formatDurationToSeconds(
    executionStartToCloseTimeout
  ),
  failureDetails: formatFailureDetails(failure),
  failureReason: failure?.reason || '',
  header: formatPayloadMap(header, 'fields'),
  initiator: formatEnum(initiator, 'CONTINUE_AS_NEW_INITIATOR'),
  input: formatPayload(input),
  memo: formatPayloadMap(memo, 'fields'),
  searchAttributes: formatPayloadMap(searchAttributes, 'indexedFields'),
  taskList: {
    kind: formatEnum(taskList?.kind, 'TASK_LIST_KIND'),
    name: taskList?.name || null,
  },
  taskStartToCloseTimeoutSeconds: formatDurationToSeconds(
    taskStartToCloseTimeout
  ),
});

module.exports = formatWorkflowExecutionContinuedAsNewEventAttributes;
