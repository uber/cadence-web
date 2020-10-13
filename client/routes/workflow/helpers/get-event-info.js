/* import { eventInfo, event, workflow, eventTypeMap } from "./eventInterface"; */

function getEventInfo2(event, workflow) {
  return eventTypeMap[event.eventType](event, workflow)
}

let eventTypeMap = {
  'WorkflowExecutionStarted': function (event, workflow) {
    let eventDetails = event.eventFullDetails,
      taskList = JSON.stringify(eventDetails.taskList),
      //parentWorkflowExecution = JSON.stringify(eventDetails.parentWorkflowExecution);

      eventInfo = {
        inferredChild: event.eventId + 1,
        parentWorkflow: eventDetails.parentWorkflowExecution,
        clickInfo: {
          id: event.eventId,
          eventType: event.eventType,
          timestamp: event.timestamp,
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
      parent: event.eventFullDetails.startedEventId,
    }
    return eventInfo
  },
  'ActivityTaskCancelRequested': function (event) {
    const eventInfo = {
      parent: event.eventFullDetails.decisionTaskCompletedEventId,
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
      parent: event.eventFullDetails.startedEventId,
      chronologicalChild: chronologicalChild,
      inferredChild: inferredChild
    }
    return eventInfo
  },
  'CancelTimerFailed': function (event) {
    const eventInfo = {
      parent: event.eventFullDetails.decisionTaskCompletedEventId,
      status: 'failed',
    }
    return eventInfo
  },
  'ChildWorkflowExecutionCanceled': function (event) {
    const eventInfo = {
      parent: event.eventFullDetails.startedEventId
    }
    return eventInfo
  },
  'ChildWorkflowExecutionCompleted': function (event, workflow) {
    let eventDetails = event.eventFullDetails,
      { inferredChild, chronologicalChild } = findChild(event, workflow);
    const eventInfo = {
      parent: eventDetails.startedEventId,
      status: 'completed',
      inferredChild: inferredChild,
      chronologicalChild: chronologicalChild,
      clickInfo: {
        id: event.eventId,
        name: eventDetails.workflowType.name,
        timestamp: event.timestamp,
        result: eventDetails.result,
        childRunId: eventDetails.workflowExecution.runId,
      },
    }
    return eventInfo
  },
  'ChildWorkflowExecutionFailed': function (event, workflow) {
    let eventDetails = event.eventFullDetails,
      { inferredChild, chronologicalChild } = findChild(event, workflow);
    const eventInfo = {
      parent: eventDetails.startedEventId,
      inferredChild: inferredChild,
      chronologicalChild: chronologicalChild,
      status: 'failed',
      clickInfo: {
        id: event.eventId,
        name: eventDetails.workflowType.name,
        timestamp: event.timestamp,
        reason: eventDetails.reason,
        domain: eventDetails.domain,
        initiatedEventId: eventDetails.initiatedEventId,
        startedEventId: eventDetails.startedEventId,
        childRunId: eventDetails.workflowExecution.runId,
        childWorkflowId: eventDetails.workflowExecution.workflowId
      },

    }
    return eventInfo
  },
  'ChildWorkflowExecutionStarted': function (event, workflow) {
    let eventDetails = event.eventFullDetails,
      { inferredChild, chronologicalChild } = findChild(event, workflow);
    const eventInfo = {
      parent: eventDetails.initiatedEventId,
      inferredChild: inferredChild,
      chronologicalChild: chronologicalChild,
      clickInfo: {
        id: event.eventId,
        name: eventDetails.workflowType.name,
        timestamp: event.timestamp,
        domain: eventDetails.domain,
        initiatedEventId: eventDetails.initiatedEventId,
        workflowId: eventDetails.workflowExecution.workflowId,
        childRunId: eventDetails.workflowExecution.runId
      }
    }
    return eventInfo
  },
  'ChildWorkflowExecutionTerminated': function (event) {
    const eventInfo = {
      parent: event.eventFullDetails.startedEventId
    }
    return eventInfo
  },
  'ChildWorkflowExecutionTimedOut': function (event) {
    const eventInfo = {
      parent: event.eventFullDetails.startedEventId
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
      parent: event.eventFullDetails.startedEventId,
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
      parent: event.eventFullDetails.scheduledEventId
    }
    return eventInfo
  },
  'ExternalWorkflowExecutionCancelRequested': function (event, workflow) {
    let { inferredChild, chronologicalChild } = findChild(event, workflow);
    const eventInfo = {
      parent: event.eventFullDetails.initiatedEventId,
      inferredChild: inferredChild,
      chronologicalChild: chronologicalChild
    }
    return eventInfo
  },
  'ExternalWorkflowExecutionSignaled': function (event, workflow) {
    let eventDetails = event.eventFullDetails,
      { inferredChild } = findChild(event, workflow);
    let workflowExecution = JSON.stringify(eventDetails.workflowExecution);
    const eventInfo = {
      parent: eventDetails.initiatedEventId,
      inferredChild: inferredChild,
      clickInfo: {
        id: event.eventId,
        timestamp: event.timestamp,
        initiatedEventId: eventDetails.initiatedEventId,
        domain: eventDetails.domain,
        workflowExecution: workflowExecution,
        control: eventDetails.control
      },
    }
    return eventInfo
  },
  'MarkerRecorded': function (event) {
    let eventDetails = event.eventFullDetails
    const eventInfo = {
      parent: eventDetails.decisionTaskCompletedEventId,
      clickInfo: {
        id: event.eventId,
        timestamp: event.timestamp,
        markerName: eventDetails.markerName,
        details: eventDetails.details,
        decisionTaskCompletedEventId: eventDetails.decisionTaskCompletedEventId
      },
    }
    return eventInfo
  },
  'RequestCancelActivityTaskFailed': function (event) {
    const eventInfo = {
      status: 'failed',
      parent: event.eventFullDetails.decisionTaskCompletedEventId
    }
    return eventInfo
  },
  'RequestCancelExternalWorkflowExecutionFailed': function (event) {
    const eventInfo = {
      status: 'failed',
      parent: event.eventFullDetails.decisionTaskCompletedEventId
    }
    return eventInfo
  },
  'RequestCancelExternalWorkflowExecutionInitiated': function (event) {
    const eventInfo = {
      parent: event.eventFullDetails.decisionTaskCompletedEventId
    }
    return eventInfo
  },
  'SignalExternalWorkflowExecutionFailed': function (event) {
    const eventInfo = {
      status: 'failed',
      parent: event.eventFullDetails.decisionTaskCompletedEventId
    }
    return eventInfo
  },
  'SignalExternalWorkflowExecutionInitiated': function (event) {
    let eventDetails = event.eventFullDetails,
      workflowExecution = JSON.stringify(eventDetails.workflowExecution),
      eventInfo = {
        parent: eventDetails.decisionTaskCompletedEventId,
        clickInfo: {
          id: event.eventId,
          timestamp: event.timestamp,
          decisionTaskCompletedEventId: eventDetails.decisionTaskCompletedEventId,
          domain: eventDetails.domain,
          input: eventDetails.input,
          signalName: eventDetails.signalName,
          control: eventDetails.control,
          childWorkflowOnly: eventDetails.childWorkflowOnly,
          workflowExecution: workflowExecution,
        }
      }
    return eventInfo
  },
  'StartChildWorkflowExecutionFailed': function (event) {
    let eventDetails = event.eventFullDetails,
      eventInfo = {
        status: 'failed',
        parent: eventDetails.decisionTaskCompletedEventId,
      }
    return eventInfo
  },
  'StartChildWorkflowExecutionInitiated': function (event) {
    let eventDetails = event.eventFullDetails,
      eventInfo = {
        parent: event.eventFullDetails.decisionTaskCompletedEventId,
        clickInfo: {
          id: event.eventId,
          name: eventDetails.workflowType.name,
          timestamp: event.timestamp,
          domain: eventDetails.domain,
          input: eventDetails.input,
          workflowId: eventDetails.workflowId,
          taskList: eventDetails.taskList,
          decisionTaskCompletedEventId: eventDetails.decisionTaskCompletedEventId
        }
      }
    return eventInfo
  },
  'TimerCanceled': function (event) {
    //TODO
    const eventInfo = {
      parent: event.eventFullDetails.startedEventId
    }
    return eventInfo
  },
  'TimerFired': function (event, workflow) {
    let eventDetails = event.eventFullDetails,
      { inferredChild } = findChild(event, workflow),
      eventInfo = {
        parent: eventDetails.startedEventId,
        inferredChild: inferredChild,
        clickInfo: {
          id: event.eventId,
          timestamp: event.timestamp,
          timerId: eventDetails.timerId,
          startedEventId: eventDetails.startedEventId
        }
      }
    return eventInfo
  },
  'TimerStarted': function (event) {
    let eventDetails = event.eventFullDetails,
      eventInfo = {
        parent: eventDetails.decisionTaskCompletedEventId,
        clickInfo: {
          id: event.eventId,
          timestamp: event.timestamp,
          timerId: eventDetails.timerId,
          startToFireTimeoutSeconds: eventDetails.startToFireTimeoutSeconds,
          decisionTaskCompletedEventId: eventDetails.decisionTaskCompletedEventId
        }
      }
    return eventInfo
  },
  'UpsertWorkflowSearchAttributes': function (event) {
    //TODO: not sure about what is important to display here
    let eventDetails = event.eventFullDetails,
      searchAttr = JSON.stringify(eventDetails.searchAttributes.indexedFields),
      eventInfo = {
        parent: eventDetails.decisionTaskCompletedEventId,
        clickInfo: {
          id: event.eventId,
          timestamp: event.timestamp,
          searchAttributes: searchAttr,
          decisionTaskCompletedEventId: eventDetails.decisionTaskCompletedEventId,
        }
      }
    return eventInfo
  },
  'WorkflowExecutionCanceled': function (event) {
    const eventInfo = {
      parent: event.eventFullDetails.decisionTaskCompletedEventId,
    }
    return eventInfo
  },
  'WorkflowExecutionCancelRequested': function (event, workflow) {
    let { inferredChild } = findChild(event, workflow),
      //This event has no parent nor child
      eventInfo = {
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
    let eventDetails = event.eventFullDetails,
      eventInfo = {
        parent: eventDetails.decisionTaskCompletedEventId,
        clickInfo: {
          id: event.eventId,
          name: eventDetails.workflowType.name,
          timestamp: event.timestamp,
          input: eventDetails.input,
          initiator: eventDetails.initiator,
          newExecutionRunId: eventDetails.newExecutionRunId,
          taskList: eventDetails.taskList.name,
        }
      }
    return eventInfo
  },
  'WorkflowExecutionFailed': function (event) {
    let eventDetails = event.eventFullDetails,
      eventInfo = {
        parent: eventDetails.decisionTaskCompletedEventId,
        status: 'failed',
        clickInfo: {
          id: event.eventId,
          timestamp: event.timestamp,
          reason: eventDetails.reason,
          decisionTaskCompletedEventId: eventDetails.decisionTaskCompletedEventId,
          details: eventDetails.details,
        }
      }
    return eventInfo
  },
  'WorkflowExecutionSignaled': function (event, workflow) {
    let eventDetails = event.eventFullDetails,
      { inferredChild } = findInferredChild(event, workflow),
      eventInfo = {
        inferredChild: inferredChild,
        clickInfo: {
          id: event.eventId,
          timestamp: event.timestamp,
          signalName: eventDetails.signalName,
          input: eventDetails.input,
          identity: eventDetails.identity,
        }
      }
    return eventInfo
  },
  'WorkflowExecutionTerminated': function (event) {
    let eventDetails = event.eventFullDetails,
      eventInfo = {
        //parent: event.eventId - 1,
        clickInfo: {
          id: event.eventId,
          timestamp: event.timestamp,
          eventType: eventDetails.eventType,
          reason: eventDetails.reason,
          details: eventDetails.details,
        }
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