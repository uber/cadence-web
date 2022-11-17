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

const formatEnum = require('./format-enum');
const formatFailureDetails = require('./format-failure-details');
const formatTimestampToDatetime = require('./format-timestamp-to-datetime');
const formatDurationToSeconds = require('./format-duration-to-seconds');

const formatResponseDescribeWorkflow = ({
  executionConfiguration: {
    executionStartToCloseTimeout,
    taskList,
    taskStartToCloseTimeout,
  },
  pendingActivities,
  pendingChildren,
  pendingDecision,
  workflowExecutionInfo,
  ...response
}) => ({
  ...response,
  executionConfiguration: {
    executionStartToCloseTimeoutSeconds: formatDurationToSeconds(
      executionStartToCloseTimeout
    ),
    taskList: {
      kind: taskList?.kind
        ? formatEnum(taskList?.kind, 'TASK_LIST_KIND')
        : null,
      name: taskList?.name || null,
    },
    taskStartToCloseTimeoutSeconds: formatDurationToSeconds(
      taskStartToCloseTimeout
    ),
  },
  pendingActivities: pendingActivities?.length
    ? pendingActivities.map(
        ({
          activityId,
          expirationTime,
          lastFailure,
          lastHeartbeatTime,
          lastStartedTime,
          scheduledTime,
          state,
          ...pendingActivity
        }) => ({
          ...pendingActivity,
          activityID: parseInt(activityId),
          expirationTimestamp: formatTimestampToDatetime(expirationTime),
          lastFailureDetails: formatFailureDetails(lastFailure),
          lastFailureReason: lastFailure?.reason || null,
          lastHeartbeatTimestamp: formatTimestampToDatetime(lastHeartbeatTime),
          lastStartedTimestamp: formatTimestampToDatetime(lastStartedTime),
          scheduledTimestamp: formatTimestampToDatetime(scheduledTime),
          state: formatEnum(state, 'PENDING_ACTIVITY_STATE'),
        })
      )
    : null,
  pendingChildren: pendingChildren?.length
    ? pendingChildren.map(
        ({
          initiatedId,
          parentClosePolicy,
          workflowExecution,
          ...pendingChild
        }) => ({
          ...pendingChild,
          initiatedID: parseInt(initiatedId),
          parentClosePolicy: formatEnum(
            parentClosePolicy,
            'PARENT_CLOSE_POLICY'
          ),
          runID: workflowExecution?.runId || null,
          workflowID: workflowExecution?.workflowId || null,
        })
      )
    : null,
  pendingDecision: pendingDecision
    ? {
        attempt: pendingDecision.attempt,
        originalScheduledTimestamp: formatTimestampToDatetime(
          pendingDecision.originalScheduledTime
        ),
        scheduledTimestamp: formatTimestampToDatetime(
          pendingDecision.scheduledTime
        ),
        startedTimestamp: formatTimestampToDatetime(
          pendingDecision.startedTime
        ),
        state: formatEnum(pendingDecision.state, 'PENDING_DECISION_STATE'),
      }
    : null,
  workflowExecutionInfo: workflowExecutionInfo
    ? {
        ...workflowExecutionInfo,
        autoResetPoints: {
          points:
            workflowExecutionInfo?.autoResetPoints?.points.map(
              ({ createdTime, expiringTime, ...point }) => ({
                ...point,
                createdTimeNano: formatTimestampToDatetime(createdTime),
                expiringTimeNano: formatTimestampToDatetime(expiringTime),
              })
            ) || null,
        },
        closeStatus: workflowExecutionInfo?.closeStatus
          ? formatEnum(
              workflowExecutionInfo?.closeStatus,
              'WORKFLOW_EXECUTION_CLOSE_STATUS'
            )
          : null,
        closeTime:
          formatTimestampToDatetime(workflowExecutionInfo?.closeTime) || null,
        execution: workflowExecutionInfo?.workflowExecution || null,
        executionTime:
          formatTimestampToDatetime(workflowExecutionInfo?.executionTime) ||
          null,
        historyLength: parseInt(workflowExecutionInfo?.historyLength) || null,
        startTime:
          formatTimestampToDatetime(workflowExecutionInfo?.startTime) || null,
      }
    : null,
});

module.exports = formatResponseDescribeWorkflow;
