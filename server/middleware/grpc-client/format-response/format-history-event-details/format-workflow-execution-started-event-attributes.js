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
const formatTimestampToDatetime = require('../format-timestamp-to-datetime');
const formatDurationToSeconds = require('../format-duration-to-seconds');
const formatRetryPolicy = require('./format-retry-policy');
const formatPrevAutoResetPoints = require('./format-prev-auto-reset-points');

const formatWorkflowExecutionStartedEventAttributes = ({
  attempt,
  continuedExecutionRunId,
  continuedFailure,
  cronSchedule,
  executionStartToCloseTimeout,
  expirationTime,
  firstDecisionTaskBackoff,
  firstExecutionRunId,
  firstScheduledTimeNano,
  identity,
  initiator,
  input,
  memo,
  originalExecutionRunId,
  parentExecutionInfo,
  prevAutoResetPoints,
  retryPolicy,
  searchAttributes,
  taskList,
  taskStartToCloseTimeout,
  ...eventAttributes
}) => ({
  ...eventAttributes,
  taskList: {
    kind: formatEnum(taskList?.kind, 'TASK_LIST_KIND'),
    name: taskList?.name || null,
  },
  input: formatPayload(input),
  executionStartToCloseTimeoutSeconds: formatDurationToSeconds(
    executionStartToCloseTimeout
  ),
  taskStartToCloseTimeoutSeconds: formatDurationToSeconds(
    taskStartToCloseTimeout
  ),
  attempt: attempt || null,
  continuedExecutionRunId: continuedExecutionRunId || null,
  continuedFailureDetails: formatFailureDetails(continuedFailure),
  continuedFailureReason: continuedFailure?.reason || null,
  cronSchedule: cronSchedule || null,
  expirationTimestamp: formatTimestampToDatetime(expirationTime),
  firstDecisionTaskBackoffSeconds: formatDurationToSeconds(
    firstDecisionTaskBackoff
  ),
  firstExecutionRunId: firstExecutionRunId || null,
  firstScheduledTimeNano: firstScheduledTimeNano || null,
  identity: identity || null,
  initiator: formatEnum(initiator, 'CONTINUE_AS_NEW_INITIATOR'),
  memo: formatPayloadMap(memo, 'fields'),
  originalExecutionRunId: originalExecutionRunId || null,
  parentInitiatedEventId: parentExecutionInfo?.initiatedId
    ? parseInt(parentExecutionInfo.initiatedId)
    : null,
  parentWorkflowDomain: parentExecutionInfo?.domainName || null,
  parentWorkflowExecution: parentExecutionInfo?.workflowExecution || null,
  prevAutoResetPoints: formatPrevAutoResetPoints(prevAutoResetPoints),
  retryPolicy: formatRetryPolicy(retryPolicy),
  searchAttributes: formatPayloadMap(searchAttributes, 'indexedFields'),
});

module.exports = formatWorkflowExecutionStartedEventAttributes;
