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

import moment from 'moment';
import parentWorkflowLink from './parent-workflow-link';
import workflowLink from './workflow-link';
import { WORKFLOW_EVENT_TYPE } from '~constants';
import { shortName } from '~helpers';

export const summarizeEvents = ({ clusterName }) => ({
  [WORKFLOW_EVENT_TYPE.ActivityTaskCanceled]: eventDetails => ({}),
  [WORKFLOW_EVENT_TYPE.ActivityTaskCancelRequested]: eventDetails => ({
    ID: eventDetails.activityId,
  }),
  [WORKFLOW_EVENT_TYPE.ActivityTaskCompleted]: eventDetails => ({
    result: eventDetails.result,
  }),
  [WORKFLOW_EVENT_TYPE.ActivityTaskFailed]: eventDetails => ({
    details: eventDetails.details,
    reason: eventDetails.reason,
  }),
  [WORKFLOW_EVENT_TYPE.ActivityTaskScheduled]: eventDetails => ({
    'Close Timeout': moment
      .duration(eventDetails.scheduleToCloseTimeoutSeconds, 'seconds')
      .format(),
    ID: eventDetails.activityId,
    input: eventDetails.input,
    Name: shortName(eventDetails.activityType.name),
  }),
  [WORKFLOW_EVENT_TYPE.ActivityTaskStarted]: eventDetails => ({
    attempt: eventDetails.attempt,
    identity: eventDetails.identity,
    requestId: eventDetails.requestId,
  }),
  [WORKFLOW_EVENT_TYPE.ActivityTaskTimedOut]: eventDetails => ({
    'Timeout Type': eventDetails.timeoutType,
  }),
  [WORKFLOW_EVENT_TYPE.ChildWorkflowExecutionCompleted]: eventDetails => ({
    result: eventDetails.result,
    Workflow: workflowLink({ clusterName, eventDetails, short: true }),
  }),
  [WORKFLOW_EVENT_TYPE.ChildWorkflowExecutionStarted]: eventDetails => ({
    Workflow: workflowLink({ clusterName, eventDetails }),
  }),
  [WORKFLOW_EVENT_TYPE.DecisionTaskCompleted]: eventDetails => ({
    identity: eventDetails.identity,
  }),
  [WORKFLOW_EVENT_TYPE.DecisionTaskScheduled]: eventDetails => ({
    Tasklist: eventDetails.taskList.name,
    Timeout: moment
      .duration(eventDetails.startToCloseTimeoutSeconds, 'seconds')
      .format(),
  }),
  [WORKFLOW_EVENT_TYPE.DecisionTaskStarted]: eventDetails => ({
    requestId: eventDetails.requestId,
  }),
  [WORKFLOW_EVENT_TYPE.DecisionTaskTimedOut]: eventDetails => ({
    'Timeout Type': eventDetails.timeoutType,
  }),
  [WORKFLOW_EVENT_TYPE.ExternalWorkflowExecutionSignaled]: eventDetails => ({
    Workflow: workflowLink({ clusterName, eventDetails }),
  }),
  [WORKFLOW_EVENT_TYPE.MarkerRecorded]: eventDetails => {
    const details = eventDetails.details || {};

    if (eventDetails.markerName === 'LocalActivity') {
      const la = { 'Local Activity ID': details.ActivityID };

      if (details.ErrJSON) {
        la.Error = JSON.tryParse(details.ErrJSON) || details.ErrJSON;
      }

      if (details.ErrReason) {
        la.reason = details.ErrReason;
      }

      if (details.ResultJSON) {
        la.result = JSON.tryParse(details.ResultJSON) || details.ResultJSON;
      }

      return la;
    }

    if (eventDetails.markerName === 'Version') {
      return {
        Details: details[0],
        Version: details[1],
      };
    }

    if (eventDetails.markerName === 'SideEffect') {
      if (!Array.isArray(details)) {
        // Java client
        return {
          data: details,
        };
      }

      // Go client
      return {
        data: JSON.tryParse(atob(details[1])) || details[1],
        'Side Effect ID': details[0],
      };
    }

    return eventDetails;
  },
  [WORKFLOW_EVENT_TYPE.SignalExternalWorkflowExecutionInitiated]: eventDetails => ({
    input: eventDetails.input,
    signal: eventDetails.signalName,
    Workflow: workflowLink({ clusterName, eventDetails }),
  }),
  [WORKFLOW_EVENT_TYPE.StartChildWorkflowExecutionInitiated]: eventDetails => ({
    input: eventDetails.input,
    Tasklist: eventDetails.taskList.name,
    Workflow: shortName(eventDetails.workflowType.name),
  }),
  [WORKFLOW_EVENT_TYPE.TimerStarted]: eventDetails => ({
    'Fire Timeout': moment
      .duration(eventDetails.startToFireTimeoutSeconds, 'seconds')
      .format(),
    'Timer ID': eventDetails.timerId,
  }),
  [WORKFLOW_EVENT_TYPE.WorkflowExecutionStarted]: eventDetails => {
    const summary = {
      'Close Timeout': moment
        .duration(eventDetails.executionStartToCloseTimeoutSeconds, 'seconds')
        .format(),
      identity: eventDetails.identity,
      input: eventDetails.input,
      Parent: undefined,
      Workflow: eventDetails.workflowType
        ? shortName(eventDetails.workflowType.name)
        : '',
    };
    const wfLink = parentWorkflowLink({ clusterName, eventDetails });

    if (wfLink) {
      summary.Parent = {
        routeLink: wfLink.to,
        text: wfLink.text,
      };
    }

    return summary;
  },
});
