/* import { eventInfo, event, workflow, eventTypeMap } from "./eventInterface"; */

function getEventInfo2(event, workflow) {
  return eventTypeMap[event.eventType](event, workflow)
}

let eventTypeMap = {
  'WorkflowExecutionStarted': function (event, workflow) {
    let eventDetails = event.eventFullDetails,
      taskList = JSON.stringify(eventDetails.taskList),
      //parentWorkflowExecution = JSON.stringify(attributesObj.parentWorkflowExecution);

      eventInfo = {
        inferredChild: event.eventId + 1,
        parentWorkflow: eventDetails.parentWorkflowExecution,
        clickInfo: {
          id: event.eventId,
          eventType: event.eventType,
          timestamp: timestampToTime(event.timestamp),
          input: eventDetails.input,
          parentWorkflowDomain: eventDetails.parentWorkflowDomain,
          parentInitiatedEventId: eventDetails.parentInitiatedEventId,
          parentWorkflowExecution: eventDetails.parentWorkflowExecution,
          taskList: taskList,
        }
      }

    return eventInfo
  },
  'ActivityTaskCanceled': function (event) {
    const eventInfo = {
      parent: event.activityTaskCanceledEventAttributes.startedEventId,
    }
    return eventInfo
  },
  'ActivityTaskCancelRequested': function (event) {
    const eventInfo = {
      parent: event.activityTaskCancelRequestedEventAttributes.decisionTaskCompletedEventId,
    }
    return eventInfo
  },
  'ActivityTaskCompleted': function (event, workflow) {
    let eventDetails = event.eventFullDetails,
      { inferredChild, chronologicalChild } = findChild(event, workflow),
      eventInfo = {
        parent: eventDetails.startedEventId,
        chronologicalChild: chronologicalChild,
        inferredChild: inferredChild,
        clickInfo: {
          id: event.eventId,
          timestamp: event.timestamp,
          startedEventId: eventDetails.startedEventId,
          scheduledEventId: eventDetails.scheduledEventId,
          result: eventDetails.result
        },
      }
    return eventInfo
  },

  'ActivityTaskFailed': function (event, workflow) {
    let eventDetails = event.eventFullDetails,
      { inferredChild, chronologicalChild } = findChild(event, workflow);
    const eventInfo = {
      parent: eventDetails.startedEventId,
      chronologicalChild: chronologicalChild,
      inferredChild: inferredChild,
      status: 'failed',
      clickInfo: {
        id: event.eventId,
        timestamp: event.timestamp,
        reason: eventDetails.reason,
        details: eventDetails.details,
        scheduledEventId: eventDetails.scheduledEventId,
        startedEventId: eventDetails.startedEventId,
      },
    }
    return eventInfo
  },
  'ActivityTaskScheduled': function (event) {
    let eventDetails = event.eventFullDetails,
      eventInfo = {
        parent: eventDetails.decisionTaskCompletedEventId,
        clickInfo: {
          id: event.eventId,
          name: eventDetails.activityType.name,
          timestamp: event.timestamp,
          input: eventDetails.input,
          taskList: eventDetails.taskList.name,
          decisionTaskCompletedEventId: eventDetails.decisionTaskCompletedEventId,
        },
      }
    return eventInfo
  },
  'ActivityTaskStarted': function (event) {
    let eventDetails = event.eventFullDetails,
      eventInfo = {
        parent: eventDetails.scheduledEventId,
        clickInfo: {
          id: event.eventId,
          timestamp: event.timestamp,
          requestId: eventDetails.requestId,
          attempt: eventDetails.attempt,
          lastFailureReason: eventDetails.lastFailureReason,
          scheduledEventId: eventDetails.scheduledEventId,
        },
      }
    return eventInfo
  },
  'ActivityTaskTimedOut': function (event, workflow) {
    let { inferredChild, chronologicalChild } = findChild(event, workflow);
    const eventInfo = {
      parent: event.activityTaskTimedOutEventAttributes.startedEventId,
      chronologicalChild: chronologicalChild,
      inferredChild: inferredChild
    }
    return eventInfo
  },
  'CancelTimerFailed': function (event) {
    const eventInfo = {
      parent: event.cancelTimerFailedEventAttributes.decisionTaskCompletedEventId,
      status: 'failed',
    }
    return eventInfo
  },
  'ChildWorkflowExecutionCanceled': function (event) {
    const eventInfo = {
      parent: event.childWorkflowExecutionCanceledEventAttributes.startedEventId
    }
    return eventInfo
  },
  'ChildWorkflowExecutionCompleted': function (event, workflow) {
    let attributesObj = event.childWorkflowExecutionCompletedEventAttributes,
      { inferredChild, chronologicalChild } = findChild(event, workflow);
    const eventInfo = {
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
  'ChildWorkflowExecutionFailed': function (event, workflow) {
    let attributesObj = event.childWorkflowExecutionFailedEventAttributes,
      { inferredChild, chronologicalChild } = findChild(event, workflow);
    const eventInfo = {
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
  'ChildWorkflowExecutionStarted': function (event, workflow) {
    let attributesObj = event.childWorkflowExecutionStartedEventAttributes,
      { inferredChild, chronologicalChild } = findChild(event, workflow);
    const eventInfo = {
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
  'ChildWorkflowExecutionTerminated': function (event) {
    const eventInfo = {
      parent: event.childWorkflowExecutionTerminatedEventAttributes.startedEventId
    }
    return eventInfo
  },
  'ChildWorkflowExecutionTimedOut': function (event) {
    const eventInfo = {
      parent: event.childWorkflowExecutionTimedOutEventAttributes.startedEventId
    }
    return eventInfo
  },
  'DecisionTaskCompleted': function (event, workflow) {
    let eventInfo = event.eventFullDetails,
      { chronologicalChild } = findChild(event, workflow);
    return {
      parent: eventInfo.startedEventId,
      chronologicalChild: chronologicalChild,
      clickInfo: {
        id: event.eventId,
        timestamp: event.timestamp,
        scheduledEventId: eventInfo.scheduledEventId,
        startedEventId: eventInfo.startedEventId,
      },
    }
  },
  'DecisionTaskFailed': function (event) {
    const eventInfo = {
      status: 'failed',
      parent: event.decisionTaskFailedEventAttributes.startedEventId,
    }
    return eventInfo
  },
  'DecisionTaskScheduled': function (event, workflow) {
    let eventDetails = event.eventFullDetails,
      taskList = JSON.stringify(eventDetails.taskList)
    const eventInfo = {
      clickInfo: {
        id: event.eventId,
        timestamp: event.timestamp,
        taskList: taskList,
        attempt: eventDetails.attempt,
      },
    }
    return eventInfo
  },
  'DecisionTaskStarted': function (event) {
    let eventInfo = event.eventFullDetails
    return {
      parent: eventInfo.scheduledEventId,
      clickInfo: {
        id: event.eventId,
        timestamp: event.timestamp,
        scheduledEventId: eventInfo.scheduledEventId,
      },
    }
  },
  'DecisionTaskTimedOut': function (event) {
    const eventInfo = {
      parent: event.decisionTaskTimedOutEventAttributes.scheduledEventId
    }
    return eventInfo
  },
  'ExternalWorkflowExecutionCancelRequested': function (event, workflow) {
    let { inferredChild, chronologicalChild } = findChild(event, workflow);
    const eventInfo = {
      parent: event.externalWorkflowExecutionCancelRequestedEventAttributes.initiatedEventId,
      inferredChild: inferredChild,
      chronologicalChild: chronologicalChild
    }
    return eventInfo
  },
  'ExternalWorkflowExecutionSignaled': function (event, workflow) {
    let attributesObj = event.externalWorkflowExecutionSignaledEventAttributes,
      { inferredChild } = findChild(event, workflow);
    let workflowExecution = JSON.stringify(attributesObj.workflowExecution);
    const eventInfo = {
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
  'MarkerRecorded': function (event) {
    let attributesObj = event.markerRecordedEventAttributes
    const eventInfo = {
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
  'RequestCancelActivityTaskFailed': function (event) {
    const eventInfo = {
      status: 'failed',
      parent: event.requestCancelActivityTaskFailedEventAttributes.decisionTaskCompletedEventId
    }
    return eventInfo
  },
  'RequestCancelExternalWorkflowExecutionFailed': function (event) {
    const eventInfo = {
      status: 'failed',
      parent: event.requestCancelExternalWorkflowExecutionFailed.decisionTaskCompletedEventId
    }
    return eventInfo
  },
  'RequestCancelExternalWorkflowExecutionInitiated': function (event) {
    const eventInfo = {
      parent: event.requestCancelExternalWorkflowExecutionInitiatedEventAttributes.decisionTaskCompletedEventId
    }
    return eventInfo
  },
  'SignalExternalWorkflowExecutionFailed': function (event) {
    const eventInfo = {
      status: 'failed',
      parent: event.signalExternalWorkflowExecutionFailedEventAttributes.decisionTaskCompletedEventId
    }
    return eventInfo
  },
  'SignalExternalWorkflowExecutionInitiated': function (event) {
    let attributesObj = event.signalExternalWorkflowExecutionInitiatedEventAttributes
    let workflowExecution = JSON.stringify(attributesObj.workflowExecution);
    const eventInfo = {
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
  'StartChildWorkflowExecutionFailed': function (event) {
    let attributesObj = event.startChildWorkflowExecutionFailedEventAttributes
    const eventInfo = {
      status: 'failed',
      parent: attributesObj.decisionTaskCompletedEventId,
    }
    return eventInfo
  },
  'StartChildWorkflowExecutionInitiated': function (event) {
    let attributesObj = event.startChildWorkflowExecutionInitiatedEventAttributes
    const eventInfo = {
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
  'TimerCanceled': function (event) {
    //TODO
    const eventInfo = {
      parent: event.timerCanceledEventAttributes.startedEventId
    }
    return eventInfo
  },
  'TimerFired': function (event, workflow) {
    let attributesObj = event.timerFiredEventAttributes,
      { inferredChild } = findChild(event, workflow);
    const eventInfo = {
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
  'TimerStarted': function (event) {
    let attributesObj = event.timerStartedEventAttributes
    const eventInfo = {
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
  'UpsertWorkflowSearchAttributes': function (event) {
    //TODO: not sure about what is important to display here
    let attributesObj = event.upsertWorkflowSearchAttributesEventAttributes
    var searchAttr = JSON.stringify(attributesObj.searchAttributes.indexedFields);
    const eventInfo = {
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
  'WorkflowExecutionCanceled': function (event) {
    const eventInfo = {
      parent: event.workflowExecutionCanceledEventAttributes.decisionTaskCompletedEventId,
    }
    return eventInfo
  },
  'WorkflowExecutionCancelRequested': function (event, workflow) {
    let { inferredChild, chronologicalChild } = findChild(event, workflow);
    //This event has no parent nor child
    const eventInfo = {
      inferredChild: inferredChild
    }
    return eventInfo
  },
  'WorkflowExecutionCompleted': function (event) {
    let eventDetails = event.eventFullDetails,
      eventInfo = {
        parent: eventDetails.decisionTaskCompletedEventId,
        status: 'completed',
        clickInfo: {
          id: event.kvps,
          timestamp: event.timestamp,
          result: eventDetails.result,
          decisionTaskCompletedEventId: eventDetails.decisionTaskCompletedEventId,
        }
      }
    return eventInfo
  },
  'WorkflowExecutionContinuedAsNew': function (event) {
    let attributesObj = event.workflowExecutionContinuedAsNewEventAttributes
    const eventInfo = {
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
  'WorkflowExecutionFailed': function (event) {
    let attributesObj = event.workflowExecutionFailedEventAttributes
    const eventInfo = {
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
  'WorkflowExecutionSignaled': function (event, workflow) {
    let attributesObj = event.workflowExecutionSignaledEventAttributes
    let { inferredChild } = findInferredChild(event, workflow);
    const eventInfo = {
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
  'WorkflowExecutionTerminated': function (event) {
    //TODO - not sure how to implement.
    const eventInfo = {
      parent: event.eventId - 1
    }
    return eventInfo
  },
  'WorkflowExecutionTimedOut': function (event) {
    //TODO - not sure how to implement.
    const eventInfo = {
      parent: event.eventId - 1
    }
    return eventInfo
  },
}

function timestampToTime(timestamp) {
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

function findInferredChild(event, workflow) {
  let
    slicedWorkflow = workflow.slice(event.eventId),
    eventInfo = {},
    targetevent;

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
function findChild(event, workflow) {
  let
    slicedWorkflow = workflow.slice(event.eventId),
    eventInfo = {},
    targetevent;

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
export { getEventInfo2 };