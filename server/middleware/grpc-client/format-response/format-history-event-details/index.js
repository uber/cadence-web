const formatActivityTaskScheduledEventAttributes = require('./format-activity-task-scheduled-event-attributes');
const formatActivityTaskStartedEventAttributes = require('./format-activity-task-started-event-attributes');
const formatDecisionTaskCompletedEventAttributes = require('./format-decision-task-completed-event-attributes');
const formatDecisionTaskScheduledEventAttributes = require('./format-decision-task-scheduled-event-attributes');
const formatDecisionTaskStartedEventAttributes = require('./format-decision-task-started-event-attributes');
const formatWorkflowExecutionStartedEventAttributes = require('./format-workflow-execution-started-event-attributes');

const AttributesFormatterMap = {
  activityTaskScheduledEventAttributes: formatActivityTaskScheduledEventAttributes,
  activityTaskStartedEventAttributes: formatActivityTaskStartedEventAttributes,
  decisionTaskCompletedEventAttributes: formatDecisionTaskCompletedEventAttributes,
  decisionTaskScheduledEventAttributes: formatDecisionTaskScheduledEventAttributes,
  decisionTaskStartedEventAttributes: formatDecisionTaskStartedEventAttributes,
  workflowExecutionStartedEventAttributes: formatWorkflowExecutionStartedEventAttributes,
};

const formatHistoryEventDetails = ({ attributes, ...event }) => {
  console.log('attributes = ', attributes);

  const formatter = AttributesFormatterMap[attributes];
  if (formatter) {
    return {
      [attributes]: formatter(event[attributes])
    };
  }
  return event;

  /*
  switch (attributes) {
    // case 'activityTaskCancelRequestedEventAttributes': {
    //   return event; // TODO
    // }

    // case 'activityTaskCanceledEventAttributes': {
    //   return event; // TODO
    // }

    case 'activityTaskCompletedEventAttributes': {
      return event;
    }

    // case 'activityTaskFailedEventAttributes': {
    //   return event; // TODO
    // }

    case 'activityTaskScheduledEventAttributes': {
      const {
        heartbeatTimeout,
        scheduleToCloseTimeout,
        scheduleToStartTimeout,
        startToCloseTimeout,
        ...eventAttributes
      } = event[attributes];

      return {
        [attributes]: {
          ...eventAttributes,
          heartbeatTimeoutSeconds: formatTimestampToSeconds(heartbeatTimeout),
          scheduleToCloseTimeoutSeconds: formatTimestampToSeconds(scheduleToCloseTimeout),
          scheduleToStartTimeoutSeconds: formatTimestampToSeconds(scheduleToStartTimeout),
          startToCloseTimeoutSeconds: formatTimestampToSeconds(startToCloseTimeout),
        },
      };
    }

    case 'activityTaskStartedEventAttributes': {
      const {
        lastFailure: {
          details: lastFailureDetails,
          reason: lastFailureReason
        },
        ...eventAttributes
      } = event[attributes];

      return {
        [attributes]: {
          ...eventAttributes,
          lastFailureDetails,
          lastFailureReason,
        },
      };
    }

    // case 'activityTaskTimedOutEventAttributes': {
    //   return event; // TODO
    // }

    // case 'cancelTimerFailedEventAttributes': {
    //   return event; // TODO
    // }

    // case 'childWorkflowExecutionCanceledEventAttributes': {
    //   return event; // TODO
    // }

    // case 'childWorkflowExecutionCompletedEventAttributes': {
    //   return event; // TODO
    // }

    // case 'childWorkflowExecutionFailedEventAttributes': {
    //   return event; // TODO
    // }

    // case 'childWorkflowExecutionStartedEventAttributes': {
    //   return event; // TODO
    // }

    // case 'childWorkflowExecutionTerminatedEventAttributes': {
    //   return event; // TODO
    // }

    // case 'childWorkflowExecutionTimedOutEventAttributes': {
    //   return event; // TODO
    // }

    case 'decisionTaskCompletedEventAttributes': {
      return event;
    }

    // case 'decisionTaskFailedEventAttributes': {
    //   return event; // TODO
    // }

    // case 'decisionTaskTimedOutEventAttributes': {
    //   return event; // TODO
    // }

    // case 'externalWorkflowExecutionCancelRequestedEventAttributes': {
    //   return event; // TODO
    // }

    // case 'externalWorkflowExecutionSignaledEventAttributes': {
    //   return event; // TODO
    // }

    case 'markerRecordedEventAttributes': {
      return event;
    }

    // case 'requestCancelActivityTaskFailedEventAttributes': {
    //   return event; // TODO
    // }

    // case 'requestCancelExternalWorkflowExecutionFailedEventAttributes': {
    //   return event; // TODO
    // }

    // case 'requestCancelExternalWorkflowExecutionInitiatedEventAttributes': {
    //   return event; // TODO
    // }

    // case 'signalExternalWorkflowExecutionFailedEventAttributes': {
    //   return event; // TODO
    // }

    // case 'signalExternalWorkflowExecutionInitiatedEventAttributes': {
    //   return event; // TODO
    // }

    // case 'startChildWorkflowExecutionInitiatedEventAttributes': {
    //   return event; // TODO
    // }

    // case 'startChildWorkflowExecutionFailedEventAttributes': {
    //   return event; // TODO
    // }

    // case 'timerCanceledEventAttributes': {
    //   return event; // TODO
    // }

    case 'timerStartedEventAttributes': {
      const {
        startToFireTimeout,
        ...eventAttributes
      } = event[attributes];

      return {
        [attributes]: {
          ...eventAttributes,
          startToFireTimeoutSeconds: formatTimestampToSeconds(startToFireTimeout),
        },
      };
    }

    case 'timerFiredEventAttributes': {
      return event;
    }

    case 'upsertWorkflowSearchAttributesEventAttributes': {
      return event;
    }

    // case 'workflowExecutionCancelRequestedEventAttributes': {
    //   return event; // TODO
    // }

    // case 'workflowExecutionCanceledEventAttributes': {
    //   return event; // TODO
    // }

    // case 'workflowExecutionCompletedEventAttributes': {
    //   return event; // TODO
    // }

    case 'workflowExecutionContinuedAsNewEventAttributes': {
      const {
        backoffStartInterval,
        executionStartToCloseTimeout,
        taskStartToCloseTimeout,
        ...eventAttributes
      } = event[attributes];

      return {
        [attributes]: {
          ...eventAttributes,
          backoffStartIntervalSeconds: formatTimestampToSeconds(backoffStartInterval),
          executionStartToCloseTimeoutSeconds: formatTimestampToSeconds(executionStartToCloseTimeout),
          taskStartToCloseTimeoutSeconds: formatTimestampToSeconds(taskStartToCloseTimeout),
        },
      };
    }

    // case 'workflowExecutionFailedEventAttributes': {
    //   return event; // TODO
    // }

    // case 'workflowExecutionSignaledEventAttributes': {
    //   return event; // TODO
    // }

    // case 'workflowExecutionTerminatedEventAttributes': {
    //   return event; // TODO
    // }

    // case 'workflowExecutionTimedOutEventAttributes': {
    //   return event; // TODO
    // }
  }
  */
  // console.log(`unexpected event attribute "${attributes}". returning non-formatted grpc response event details.`);
  // return event; // TODO
};

module.exports = formatHistoryEventDetails;
