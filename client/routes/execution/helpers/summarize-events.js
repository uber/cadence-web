import moment from 'moment'
import shortName from '../../../short-name'
import parentWorkflowLink from './parent-workflow-link';

function workflowLink(d, short) {
  return {
    routeLink: {
      name: 'execution/summary',
      params: {
        domain: d.domain,
        workflowId: d.workflowExecution.workflowId,
        runId: d.workflowExecution.runId
      }
    },
    text: [d.workflowType ? shortName(d.workflowType.name) : '', (short ? '' : d.workflowExecution.workflowId)].filter(x => x).join(' - ')
  }
}

export const summarizeEvents = {
  WorkflowExecutionStarted: d => {
    var summary = {
      Parent: undefined,
      input: d.input,
      identity: d.identity,
      Workflow: shortName(d.workflowType.name),
      'Close Timeout': moment.duration(d.executionStartToCloseTimeoutSeconds, 'seconds').format()
    },
    wfLink = parentWorkflowLink(d)

    if (wfLink) {
      summary.Parent = { routeLink: wfLink.to, text: wfLink.text }
    }
    return summary
  },
  StartChildWorkflowExecutionInitiated: d => ({
    Workflow: shortName(d.workflowType.name),
    Tasklist: d.taskList.name,
    input: d.input
  }),
  ChildWorkflowExecutionStarted: d => ({
    Workflow: workflowLink(d)
  }),
  ChildWorkflowExecutionCompleted: d => ({
    Workflow: workflowLink(d, true),
    result: d.result
  }),
  SignalExternalWorkflowExecutionInitiated: d => ({
    Workflow: workflowLink(d),
    signal: d.signalName,
    input: d.input
  }),
  ExternalWorkflowExecutionSignaled: d => ({
    Workflow: workflowLink(d)
  }),
  DecisionTaskScheduled: d => ({
    Tasklist: d.taskList.name,
    Timeout: moment.duration(d.startToCloseTimeoutSeconds, 'seconds').format()
  }),
  DecisionTaskStarted: d => ({ requestId: d.requestId }),
  DecisionTaskCompleted: d => ({ identity: d.identity }),
  DecisionTaskTimedOut: d => ({ 'Timeout Type': d.timeoutType }),
  TimerStarted: d => ({
    'Timer ID': d.timerId,
    'Fire Timeout': moment.duration(d.startToFireTimeoutSeconds, 'seconds').format()
  }),
  ActivityTaskScheduled: d => ({
    ID: d.activityId,
    Name: shortName(d.activityType.name),
    input: d.input,
    'Close Timeout': moment.duration(d.scheduleToCloseTimeoutSeconds, 'seconds').format()
  }),
  ActivityTaskStarted: d => ({ identity: d.identity, attempt: d.attempt, requestId: d.requestId }),
  ActivityTaskCompleted: d => ({ result: d.result }),
  ActivityTaskFailed: d => ({ reason: d.reason, details: d.details }),
  ActivityTaskTimedOut: d => ({ 'Timeout Type': d.timeoutType }),
  ActivityTaskCancelRequested: d => ({ ID: d.activityId }),
  MarkerRecorded: d => {
    var details = d.details || {}
    if (d.markerName === 'LocalActivity') {
      let la = { 'Local Activity ID': details.ActivityID }
      if (details.ErrJSON) {
        la.Error = JSON.tryParse(details.ErrJSON) || details.ErrJSON
      }
      if (details.ErrReason) {
        la.reason = details.ErrReason
      }
      if (details.ResultJSON) {
        la.result = JSON.tryParse(details.ResultJSON) || details.ResultJSON
    }
      return la
    }
    if (d.markerName == 'Version') {
      return {
        Version: details[1],
        Details: details[0]
      }
    }
    if (d.markerName === 'SideEffect') {
      return {
        'Side Effect ID': details[0],
        data:  JSON.tryParse(atob(details[1])) || details[1]
      }
    }

    return d
  }
};
