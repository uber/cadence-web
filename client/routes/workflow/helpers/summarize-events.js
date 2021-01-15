// Copyright (c) 2017-2021 Uber Technologies Inc.
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

import moment from 'moment';
import parentWorkflowLink from './parent-workflow-link';
import workflowLink from './workflow-link';
import { WORKFLOW_EVENT_TYPE } from '~constants';
import { shortName } from '~helpers';

export const summarizeEvents = {
  [WORKFLOW_EVENT_TYPE.ActivityTaskCanceled]: d => ({}),
  [WORKFLOW_EVENT_TYPE.ActivityTaskCancelRequested]: d => ({
    ID: d.activityId,
  }),
  [WORKFLOW_EVENT_TYPE.ActivityTaskCompleted]: d => ({ result: d.result }),
  [WORKFLOW_EVENT_TYPE.ActivityTaskFailed]: d => ({
    details: d.details,
    reason: d.reason,
  }),
  [WORKFLOW_EVENT_TYPE.ActivityTaskScheduled]: d => ({
    'Close Timeout': moment
      .duration(d.scheduleToCloseTimeoutSeconds, 'seconds')
      .format(),
    ID: d.activityId,
    input: d.input,
    Name: shortName(d.activityType.name),
  }),
  [WORKFLOW_EVENT_TYPE.ActivityTaskStarted]: d => ({
    attempt: d.attempt,
    identity: d.identity,
    requestId: d.requestId,
  }),
  [WORKFLOW_EVENT_TYPE.ActivityTaskTimedOut]: d => ({
    'Timeout Type': d.timeoutType,
  }),
  [WORKFLOW_EVENT_TYPE.ChildWorkflowExecutionCompleted]: d => ({
    result: d.result,
    Workflow: workflowLink(d, true),
  }),
  [WORKFLOW_EVENT_TYPE.ChildWorkflowExecutionStarted]: d => ({
    Workflow: workflowLink(d),
  }),
  [WORKFLOW_EVENT_TYPE.DecisionTaskCompleted]: d => ({ identity: d.identity }),
  [WORKFLOW_EVENT_TYPE.DecisionTaskScheduled]: d => ({
    Tasklist: d.taskList.name,
    Timeout: moment.duration(d.startToCloseTimeoutSeconds, 'seconds').format(),
  }),
  [WORKFLOW_EVENT_TYPE.DecisionTaskStarted]: d => ({ requestId: d.requestId }),
  [WORKFLOW_EVENT_TYPE.DecisionTaskTimedOut]: d => ({
    'Timeout Type': d.timeoutType,
  }),
  [WORKFLOW_EVENT_TYPE.ExternalWorkflowExecutionSignaled]: d => ({
    Workflow: workflowLink(d),
  }),
  [WORKFLOW_EVENT_TYPE.MarkerRecorded]: d => {
    const details = d.details || {};

    if (d.markerName === 'LocalActivity') {
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

    if (d.markerName === 'Version') {
      return {
        Details: details[0],
        Version: details[1],
      };
    }

    if (d.markerName === 'SideEffect') {
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

    return d;
  },
  [WORKFLOW_EVENT_TYPE.SignalExternalWorkflowExecutionInitiated]: d => ({
    input: d.input,
    signal: d.signalName,
    Workflow: workflowLink(d),
  }),
  [WORKFLOW_EVENT_TYPE.StartChildWorkflowExecutionInitiated]: d => ({
    input: d.input,
    Tasklist: d.taskList.name,
    Workflow: shortName(d.workflowType.name),
  }),
  [WORKFLOW_EVENT_TYPE.TimerStarted]: d => ({
    'Fire Timeout': moment
      .duration(d.startToFireTimeoutSeconds, 'seconds')
      .format(),
    'Timer ID': d.timerId,
  }),
  [WORKFLOW_EVENT_TYPE.WorkflowExecutionStarted]: d => {
    const summary = {
      'Close Timeout': moment
        .duration(d.executionStartToCloseTimeoutSeconds, 'seconds')
        .format(),
      identity: d.identity,
      input: d.input,
      Parent: undefined,
      Workflow: d.workflowType ? shortName(d.workflowType.name) : '',
    };
    const wfLink = parentWorkflowLink(d);

    if (wfLink) {
      summary.Parent = {
        routeLink: wfLink.to,
        text: wfLink.text,
      };
    }

    return summary;
  },
};
