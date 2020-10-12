import { eventInfo, event, workflow, eventTypeMap } from "./event-interface";

function getEventInfo(event: event, workflow: workflow) {
  return eventTypeMap[event.eventType](event, workflow)
}

let eventTypeMap: eventTypeMap = {
  'WorkflowExecutionStarted': function (event: event, workflow: workflow) {
    let attributesObj = event.workflowExecutionStartedEventAttributes,
      { inferredChild } = findChild(event, workflow),
      taskList = JSON.stringify(attributesObj.taskList),
      parentWorkflowExecution = JSON.stringify(attributesObj.parentWorkflowExecution);


    const eventInfo: eventInfo = {
      inferredChild: inferredChild,
      parentWorkflow: attributesObj.parentWorkflowExecution,
      clickInfo: {
        id: event.eventId,
        name: attributesObj.workflowType.name,
        timestamp: timestampToTime(event.timestamp),
        input: attributesObj.input,
        parentWorkflowDomain: attributesObj.parentWorkflowDomain,
        parentInitiatedEventId: attributesObj.parentInitiatedEventId,
        parentWorkflowExecution: parentWorkflowExecution,
        taskList: taskList,
      },
    }
    return eventInfo
  },
  'ActivityTaskCanceled': function (event: event) {
    const eventInfo: eventInfo = {
      parent: event.activityTaskCanceledEventAttributes.startedEventId,
    }
    return eventInfo
  },
  'ActivityTaskCancelRequested': function (event: event) {
    const eventInfo: eventInfo = {
      parent: event.activityTaskCancelRequestedEventAttributes.decisionTaskCompletedEventId,
    }
    return eventInfo
  },
  'ActivityTaskCompleted': function (event: event, workflow: workflow) {
    let attributesObj = event.activityTaskCompletedEventAttributes,
      { inferredChild, chronologicalChild } = findChild(event, workflow);
    const eventInfo: eventInfo = {
      parent: attributesObj.startedEventId,
      chronologicalChild: chronologicalChild,
      inferredChild: inferredChild,
      clickInfo: {
        id: event.eventId,
        timestamp: timestampToTime(event.timestamp),
        startedEventId: attributesObj.startedEventId,
        scheduledEventId: attributesObj.scheduledEventId,
        result: attributesObj.result
      },
    }
    return eventInfo
  },

  'ActivityTaskFailed': function (event: event, workflow: workflow) {
    let attributesObj = event.activityTaskFailedEventAttributes,
      { inferredChild, chronologicalChild } = findChild(event, workflow);
    const eventInfo: eventInfo = {
      parent: event.activityTaskFailedEventAttributes.startedEventId,
      chronologicalChild: chronologicalChild,
      inferredChild: inferredChild,
      status: 'failed',
      clickInfo: {
        id: event.eventId,
        timestamp: timestampToTime(event.timestamp),
        reason: attributesObj.reason,
        details: attributesObj.details,
        scheduledEventId: attributesObj.scheduledEventId,
        startedEventId: attributesObj.startedEventId,
      },
    }
    return eventInfo
  },
  'ActivityTaskScheduled': function (event: event) {
    let attributesObj = event.activityTaskScheduledEventAttributes;
    const eventInfo: eventInfo = {
      parent: attributesObj.decisionTaskCompletedEventId,
      clickInfo: {
        id: event.eventId,
        name: attributesObj.activityType.name,
        timestamp: event.timestamp,
        input: attributesObj.input,
        taskList: attributesObj.taskList.name,
        decisionTaskCompletedEventId: attributesObj.decisionTaskCompletedEventId,
      },
    }
    return eventInfo
  },
  'ActivityTaskStarted': function (event: event) {
    let attributesObj = event.activityTaskStartedEventAttributes
    const eventInfo: eventInfo = {
      parent: attributesObj.scheduledEventId,
      clickInfo: {
        id: event.eventId,
        timestamp: timestampToTime(event.timestamp),
        requestId: attributesObj.requestId,
        attempt: attributesObj.attempt,
        lastFailureReason: attributesObj.lastFailureReason,
        scheduledEventId: attributesObj.scheduledEventId,
      },
    }
    return eventInfo
  },
  'ActivityTaskTimedOut': function (event: event, workflow: workflow) {
    let { inferredChild, chronologicalChild } = findChild(event, workflow);
    const eventInfo: eventInfo = {
      parent: event.activityTaskTimedOutEventAttributes.startedEventId,
      chronologicalChild: chronologicalChild,
      inferredChild: inferredChild
    }
    return eventInfo
  },
  'CancelTimerFailed': function (event: event) {
    const eventInfo: eventInfo = {
      parent: event.cancelTimerFailedEventAttributes.decisionTaskCompletedEventId,
      status: 'failed',
    }
    return eventInfo
  },
  'ChildWorkflowExecutionCanceled': function (event: event) {
    const eventInfo: eventInfo = {
      parent: event.childWorkflowExecutionCanceledEventAttributes.startedEventId
    }
    return eventInfo
  },
  'ChildWorkflowExecutionCompleted': function (event: event, workflow: workflow) {
    let attributesObj = event.childWorkflowExecutionCompletedEventAttributes,
      { inferredChild, chronologicalChild } = findChild(event, workflow);
    const eventInfo: eventInfo = {
      parent: attributesObj.startedEventId,
      status: 'completed',
      inferredChild: inferredChild,
      chronologicalChild: chronologicalChild,
      clickInfo: {
        id: event.eventId,
        name: attributesObj.workflowType.name,
        timestamp: timestampToTime(event.timestamp),
        result: attributesObj.result,
        childRunId: attributesObj.workflowExecution.runId,
      },
    }
    return eventInfo
  },
  'ChildWorkflowExecutionFailed': function (event: event, workflow: workflow) {
    let attributesObj = event.childWorkflowExecutionFailedEventAttributes,
      { inferredChild, chronologicalChild } = findChild(event, workflow);
    const eventInfo: eventInfo = {
      parent: attributesObj.startedEventId,
      inferredChild: inferredChild,
      chronologicalChild: chronologicalChild,
      status: 'failed',
      clickInfo: {
        id: event.eventId,
        name: attributesObj.workflowType.name,
        timestamp: timestampToTime(event.timestamp),
        reason: attributesObj.reason,
        domain: attributesObj.domain,
        initiatedEventId: attributesObj.initiatedEventId,
        startedEventId: attributesObj.startedEventId,
        childRunId: attributesObj.workflowExecution.runId,
        childWorkflowId: attributesObj.workflowExecution.workflowId
      },

    }
    return eventInfo
  },
  'ChildWorkflowExecutionStarted': function (event: event, workflow: workflow) {
    let attributesObj = event.childWorkflowExecutionStartedEventAttributes,
      { inferredChild, chronologicalChild } = findChild(event, workflow);
    const eventInfo: eventInfo = {
      parent: attributesObj.initiatedEventId,
      inferredChild: inferredChild,
      chronologicalChild: chronologicalChild,
      clickInfo: {
        id: event.eventId,
        name: attributesObj.workflowType.name,
        timestamp: timestampToTime(event.timestamp),
        domain: attributesObj.domain,
        initiatedEventId: attributesObj.initiatedEventId,
        workflowId: attributesObj.workflowExecution.workflowId,
        childRunId: attributesObj.workflowExecution.runId
      }
    }
    return eventInfo
  },
  'ChildWorkflowExecutionTerminated': function (event: event) {
    const eventInfo: eventInfo = {
      parent: event.childWorkflowExecutionTerminatedEventAttributes.startedEventId
    }
    return eventInfo
  },
  'ChildWorkflowExecutionTimedOut': function (event: event) {
    const eventInfo: eventInfo = {
      parent: event.childWorkflowExecutionTimedOutEventAttributes.startedEventId
    }
    return eventInfo
  },
  'DecisionTaskCompleted': function (event: event, workflow: workflow) {
    let attributesObj = event.decisionTaskCompletedEventAttributes
    let { chronologicalChild } = findChild(event, workflow);
    const eventInfo: eventInfo = {
      parent: attributesObj.startedEventId,
      chronologicalChild: chronologicalChild,
      clickInfo: {
        id: event.eventId,
        timestamp: timestampToTime(event.timestamp),
        scheduledEventId: attributesObj.scheduledEventId,
        startedEventId: attributesObj.startedEventId,
      },
    }
    return eventInfo
  },
  'DecisionTaskFailed': function (event: event) {
    const eventInfo: eventInfo = {
      status: 'failed',
      parent: event.decisionTaskFailedEventAttributes.startedEventId,
    }
    return eventInfo
  },
  'DecisionTaskScheduled': function (event: event, workflow: workflow) {
    let attributesObj = event.decisionTaskScheduledEventAttributes
    const eventInfo: eventInfo = {
      clickInfo: {
        id: event.eventId,
        timestamp: timestampToTime(event.timestamp),
        taskList: attributesObj.taskList.name,
        attempt: attributesObj.attempt,
      },
    }
    return eventInfo
  },
  'DecisionTaskStarted': function (event: event) {
    let attributesObj = event.decisionTaskStartedEventAttributes
    const eventInfo: eventInfo = {
      parent: attributesObj.scheduledEventId,
      clickInfo: {
        id: event.eventId,
        timestamp: timestampToTime(event.timestamp),
        scheduledEventId: attributesObj.scheduledEventId,
      },
    }
    return eventInfo
  },
  'DecisionTaskTimedOut': function (event: event) {
    const eventInfo: eventInfo = {
      parent: event.decisionTaskTimedOutEventAttributes.scheduledEventId
    }
    return eventInfo
  },
  'ExternalWorkflowExecutionCancelRequested': function (event: event, workflow: workflow) {
    let { inferredChild, chronologicalChild } = findChild(event, workflow);
    const eventInfo: eventInfo = {
      parent: event.externalWorkflowExecutionCancelRequestedEventAttributes.initiatedEventId,
      inferredChild: inferredChild,
      chronologicalChild: chronologicalChild
    }
    return eventInfo
  },
  'ExternalWorkflowExecutionSignaled': function (event: event, workflow: workflow) {
    let attributesObj = event.externalWorkflowExecutionSignaledEventAttributes,
      { inferredChild } = findChild(event, workflow);
    let workflowExecution = JSON.stringify(attributesObj.workflowExecution);
    const eventInfo: eventInfo = {
      parent: attributesObj.initiatedEventId,
      inferredChild: inferredChild,
      clickInfo: {
        id: event.eventId,
        timestamp: timestampToTime(event.timestamp),
        initiatedEventId: attributesObj.initiatedEventId,
        domain: attributesObj.domain,
        workflowExecution: workflowExecution,
        control: attributesObj.control
      },
    }
    return eventInfo
  },
  'MarkerRecorded': function (event: event) {
    let attributesObj = event.markerRecordedEventAttributes
    const eventInfo: eventInfo = {
      parent: attributesObj.decisionTaskCompletedEventId,
      clickInfo: {
        id: event.eventId,
        timestamp: timestampToTime(event.timestamp),
        markerName: attributesObj.markerName,
        details: attributesObj.details,
        decisionTaskCompletedEventId: attributesObj.decisionTaskCompletedEventId
      },
    }
    return eventInfo
  },
  'RequestCancelActivityTaskFailed': function (event: event) {
    const eventInfo: eventInfo = {
      status: 'failed',
      parent: event.requestCancelActivityTaskFailedEventAttributes.decisionTaskCompletedEventId
    }
    return eventInfo
  },
  'RequestCancelExternalWorkflowExecutionFailed': function (event: event) {
    const eventInfo: eventInfo = {
      status: 'failed',
      parent: event.requestCancelExternalWorkflowExecutionFailed.decisionTaskCompletedEventId
    }
    return eventInfo
  },
  'RequestCancelExternalWorkflowExecutionInitiated': function (event: event) {
    const eventInfo: eventInfo = {
      parent: event.requestCancelExternalWorkflowExecutionInitiatedEventAttributes.decisionTaskCompletedEventId
    }
    return eventInfo
  },
  'SignalExternalWorkflowExecutionFailed': function (event: event) {
    const eventInfo: eventInfo = {
      status: 'failed',
      parent: event.signalExternalWorkflowExecutionFailedEventAttributes.decisionTaskCompletedEventId
    }
    return eventInfo
  },
  'SignalExternalWorkflowExecutionInitiated': function (event: event) {
    let attributesObj = event.signalExternalWorkflowExecutionInitiatedEventAttributes
    let workflowExecution = JSON.stringify(attributesObj.workflowExecution);
    const eventInfo: eventInfo = {
      parent: attributesObj.decisionTaskCompletedEventId,
      clickInfo: {
        id: event.eventId,
        timestamp: timestampToTime(event.timestamp),
        decisionTaskCompletedEventId: attributesObj.decisionTaskCompletedEventId,
        domain: attributesObj.domain,
        input: attributesObj.input,
        signalName: attributesObj.signalName,
        control: attributesObj.control,
        childWorkflowOnly: attributesObj.childWorkflowOnly,
        workflowExecution: workflowExecution,
      }
    }
    return eventInfo
  },
  'StartChildWorkflowExecutionFailed': function (event: event) {
    let attributesObj = event.startChildWorkflowExecutionFailedEventAttributes
    const eventInfo: eventInfo = {
      status: 'failed',
      parent: attributesObj.decisionTaskCompletedEventId,
    }
    return eventInfo
  },
  'StartChildWorkflowExecutionInitiated': function (event: event) {
    let attributesObj = event.startChildWorkflowExecutionInitiatedEventAttributes
    const eventInfo: eventInfo = {
      parent: event.startChildWorkflowExecutionInitiatedEventAttributes.decisionTaskCompletedEventId,
      clickInfo: {
        id: event.eventId,
        name: attributesObj.workflowType.name,
        timestamp: timestampToTime(event.timestamp),
        domain: attributesObj.domain,
        input: attributesObj.input,
        workflowId: attributesObj.workflowId,
        taskList: attributesObj.taskList,
        decisionTaskCompletedEventId: attributesObj.decisionTaskCompletedEventId
      }
    }
    return eventInfo
  },
  'TimerCanceled': function (event: event) {
    //TODO
    const eventInfo: eventInfo = {
      parent: event.timerCanceledEventAttributes.startedEventId
    }
    return eventInfo
  },
  'TimerFired': function (event: event, workflow: workflow) {
    let attributesObj = event.timerFiredEventAttributes,
      { inferredChild } = findChild(event, workflow);
    const eventInfo: eventInfo = {
      parent: attributesObj.startedEventId,
      inferredChild: inferredChild,
      clickInfo: {
        id: event.eventId,
        timestamp: timestampToTime(event.timestamp),
        timerId: attributesObj.timerId,
        startedEventId: attributesObj.startedEventId
      }
    }
    return eventInfo
  },
  'TimerStarted': function (event: event) {
    let attributesObj = event.timerStartedEventAttributes
    const eventInfo: eventInfo = {
      parent: attributesObj.decisionTaskCompletedEventId,
      clickInfo: {
        id: event.eventId,
        timestamp: timestampToTime(event.timestamp),
        timerId: attributesObj.timerId,
        startToFireTimeoutSeconds: attributesObj.startToFireTimeoutSeconds,
        decisionTaskCompletedEventId: attributesObj.decisionTaskCompletedEventId
      }
    }
    return eventInfo
  },
  'UpsertWorkflowSearchAttributes': function (event: event) {
    //TODO: not sure about what is important to display here
    let attributesObj = event.upsertWorkflowSearchAttributesEventAttributes
    var searchAttr = JSON.stringify(attributesObj.searchAttributes.indexedFields);
    const eventInfo: eventInfo = {
      parent: attributesObj.decisionTaskCompletedEventId,
      clickInfo: {
        id: event.eventId,
        timestamp: timestampToTime(event.timestamp),
        searchAttributes: searchAttr,
        decisionTaskCompletedEventId: attributesObj.decisionTaskCompletedEventId,
      }
    }
    return eventInfo
  },
  'WorkflowExecutionCanceled': function (event: event) {
    const eventInfo: eventInfo = {
      parent: event.workflowExecutionCanceledEventAttributes.decisionTaskCompletedEventId,
    }
    return eventInfo
  },
  'WorkflowExecutionCancelRequested': function (event: event, workflow: workflow) {
    let { inferredChild, chronologicalChild } = findChild(event, workflow);
    //This event has no parent nor child
    const eventInfo: eventInfo = {
      inferredChild: inferredChild
    }
    return eventInfo
  },
  'WorkflowExecutionCompleted': function (event: event) {
    let attributesObj = event.workflowExecutionCompletedEventAttributes
    const eventInfo: eventInfo = {
      parent: attributesObj.decisionTaskCompletedEventId,
      status: 'completed',
      clickInfo: {
        id: event.eventId,
        timestamp: timestampToTime(event.timestamp),
        result: attributesObj.result,
        decisionTaskCompletedEventId: attributesObj.decisionTaskCompletedEventId,
      }
    }
    return eventInfo
  },
  'WorkflowExecutionContinuedAsNew': function (event: event) {
    let attributesObj = event.workflowExecutionContinuedAsNewEventAttributes
    const eventInfo: eventInfo = {
      parent: attributesObj.decisionTaskCompletedEventId,
      clickInfo: {
        id: event.eventId,
        name: attributesObj.workflowType.name,
        timestamp: timestampToTime(event.timestamp),
        input: attributesObj.input,
        initiator: attributesObj.initiator,
        newExecutionRunId: attributesObj.newExecutionRunId,
        taskList: attributesObj.taskList.name,
      }
    }
    return eventInfo
  },
  'WorkflowExecutionFailed': function (event: event) {
    let attributesObj = event.workflowExecutionFailedEventAttributes
    const eventInfo: eventInfo = {
      parent: attributesObj.decisionTaskCompletedEventId,
      status: 'failed',
      clickInfo: {
        id: event.eventId,
        timestamp: timestampToTime(event.timestamp),
        reason: attributesObj.reason,
        decisionTaskCompletedEventId: attributesObj.decisionTaskCompletedEventId,
        details: attributesObj.details,
      }
    }
    return eventInfo
  },
  'WorkflowExecutionSignaled': function (event: event, workflow: workflow) {
    let attributesObj = event.workflowExecutionSignaledEventAttributes
    let { inferredChild } = findInferredChild(event, workflow);
    const eventInfo: eventInfo = {
      inferredChild: inferredChild,
      clickInfo: {
        id: event.eventId,
        timestamp: timestampToTime(event.timestamp),
        signalName: attributesObj.signalName,
        input: attributesObj.input,
        identity: attributesObj.identity,
      }
    }
    return eventInfo
  },
  'WorkflowExecutionTerminated': function (event: event) {
    //TODO - not sure how to implement.
    const eventInfo: eventInfo = {
      parent: event.eventId - 1
    }
    return eventInfo
  },
  'WorkflowExecutionTimedOut': function (event: event) {
    //TODO - not sure how to implement.
    const eventInfo: eventInfo = {
      parent: event.eventId - 1
    }
    return eventInfo
  },
}

function timestampToTime(timestamp: number) {
  var date = new Date(timestamp / 1000);

  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  return formattedTime;
}

function findInferredChild(event: event, workflow: workflow): eventInfo {
  let
    slicedWorkflow = workflow.slice(event.eventId),
    eventInfo: eventInfo = {},
    targetevent: event;

  for (targetevent of slicedWorkflow) {
    switch (targetevent.eventType) {
      case 'WorkflowExecutionSignaled':
      case 'WorkflowExecutionCancelRequested':
        break
      case 'DecisionTaskScheduled':
        eventInfo = {
          inferredChild: targetevent.eventId
        }
        return eventInfo
    }
  }
  return eventInfo
}


//Looks for a chronological or inferred child
//It is inferred if a DecisionTaskScheduled, otherwise its chronological
//External signals are not children and therefore they are skipped
function findChild(event: event, workflow: workflow): eventInfo {
  let
    slicedWorkflow = workflow.slice(event.eventId),
    eventInfo: eventInfo = {},
    targetevent: event;

  if (slicedWorkflow[0].eventType === 'DecisionTaskScheduled') {
    eventInfo = {
      inferredChild: slicedWorkflow[0].eventId
    }
    return eventInfo
  }

  else {
    for (targetevent of slicedWorkflow) {
      switch (targetevent.eventType) {
        case 'WorkflowExecutionSignaled':
        case 'WorkflowExecutionCancelRequested':
          break
        default:
          eventInfo = {
            chronologicalChild: targetevent.eventId
          }
          return eventInfo
      }
    }

  }
  return eventInfo
}

// Exporting variables and functions
export { getEventInfo };