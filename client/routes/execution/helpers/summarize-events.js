import moment from 'moment';
import { shortName } from '../../../helpers';
import parentWorkflowLink from './parent-workflow-link';
import workflowLink from './workflow-link';

export const summarizeEvents = {
  ActivityTaskCancelRequested: d => ({ ID: d.activityId }),
  ActivityTaskCompleted: d => ({ result: d.result }),
  ActivityTaskFailed: d => ({
    details: d.details,
    reason: d.reason,
  }),
  ActivityTaskScheduled: d => ({
    'Close Timeout': moment
      .duration(d.scheduleToCloseTimeoutSeconds, 'seconds')
      .format(),
    ID: d.activityId,
    input: d.input,
    Name: shortName(d.activityType.name),
  }),
  ActivityTaskStarted: d => ({
    attempt: d.attempt,
    identity: d.identity,
    requestId: d.requestId,
  }),
  ActivityTaskTimedOut: d => ({ 'Timeout Type': d.timeoutType }),
  ChildWorkflowExecutionCompleted: d => ({
    result: d.result,
    Workflow: workflowLink(d, true),
  }),
  ChildWorkflowExecutionStarted: d => ({
    Workflow: workflowLink(d),
  }),
  DecisionTaskCompleted: d => ({ identity: d.identity }),
  DecisionTaskScheduled: d => ({
    Tasklist: d.taskList.name,
    Timeout: moment.duration(d.startToCloseTimeoutSeconds, 'seconds').format(),
  }),
  DecisionTaskStarted: d => ({ requestId: d.requestId }),
  DecisionTaskTimedOut: d => ({ 'Timeout Type': d.timeoutType }),
  ExternalWorkflowExecutionSignaled: d => ({
    Workflow: workflowLink(d),
  }),
  MarkerRecorded: d => {
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
      return {
        data: JSON.tryParse(atob(details[1])) || details[1],
        'Side Effect ID': details[0],
      };
    }

    return d;
  },
  StartChildWorkflowExecutionInitiated: d => ({
    input: d.input,
    Tasklist: d.taskList.name,
    Workflow: shortName(d.workflowType.name),
  }),
  SignalExternalWorkflowExecutionInitiated: d => ({
    input: d.input,
    signal: d.signalName,
    Workflow: workflowLink(d),
  }),
  TimerStarted: d => ({
    'Fire Timeout': moment
      .duration(d.startToFireTimeoutSeconds, 'seconds')
      .format(),
    'Timer ID': d.timerId,
  }),
  WorkflowExecutionStarted: d => {
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
