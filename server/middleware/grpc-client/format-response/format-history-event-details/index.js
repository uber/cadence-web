const formatActivityTaskCompletedEventAttributes = require('./format-activity-task-completed-event-attributes');
const formatActivityTaskScheduledEventAttributes = require('./format-activity-task-scheduled-event-attributes');
const formatActivityTaskStartedEventAttributes = require('./format-activity-task-started-event-attributes');
const formatChildWorkflowExecutionCompletedEventAttributes = require('./format-child-workflow-execution-completed-event-attributes');
const formatChildWorkflowExecutionStartedEventAttributes = require('./format-child-workflow-execution-started-event-attributes');
const formatDecisionTaskCompletedEventAttributes = require('./format-decision-task-completed-event-attributes');
const formatDecisionTaskScheduledEventAttributes = require('./format-decision-task-scheduled-event-attributes');
const formatDecisionTaskStartedEventAttributes = require('./format-decision-task-started-event-attributes');
const formatExternalWorkflowExecutionSignaledEventAttributes = require('./format-external-workflow-execution-signaled-event-attributes');
const formatMarkerRecordedEventAttributes = require('./format-marker-recorded-event-attributes');
const formatRequestCancelExternalWorkflowExecutionInitiatedEventAttributes = require('./format-request-cancel-external-workflow-execution-initiated-event-attributes');
const formatSignalExternalWorkflowExecutionInitiatedEventAttributes = require('./format-signal-external-workflow-execution-initiated-event-attributes');
const formatStartChildWorkflowExecutionInitiatedEventAttributes = require('./format-start-child-workflow-execution-initiated-event-attributes');
const formatTimerFiredEventAttributes = require('./format-timer-fired-event-attributes');
const formatTimerStartedEventAttributes = require('./format-timer-started-event-attributes');
const formatUpsertWorkflowSearchAttributesEventAttributes = require('./format-upsert-workflow-search-attributes-event-attributes');
const formatWorkflowExecutionCompletedEventAttributes = require('./format-workflow-execution-completed-event-attributes');
const formatWorkflowExecutionContinuedAsNewEventAttributes = require('./format-workflow-execution-continued-as-new-event-attributes');
const formatWorkflowExecutionSignaledEventAttributes = require('./format-workflow-execution-signaled-event-attributes');
const formatWorkflowExecutionStartedEventAttributes = require('./format-workflow-execution-started-event-attributes');

const AttributesFormatterMap = {
  activityTaskCompletedEventAttributes: formatActivityTaskCompletedEventAttributes,
  activityTaskScheduledEventAttributes: formatActivityTaskScheduledEventAttributes,
  activityTaskStartedEventAttributes: formatActivityTaskStartedEventAttributes,
  childWorkflowExecutionCompletedEventAttributes: formatChildWorkflowExecutionCompletedEventAttributes,
  childWorkflowExecutionStartedEventAttributes: formatChildWorkflowExecutionStartedEventAttributes,
  decisionTaskCompletedEventAttributes: formatDecisionTaskCompletedEventAttributes,
  decisionTaskScheduledEventAttributes: formatDecisionTaskScheduledEventAttributes,
  decisionTaskStartedEventAttributes: formatDecisionTaskStartedEventAttributes,
  externalWorkflowExecutionSignaledEventAttributes: formatExternalWorkflowExecutionSignaledEventAttributes,
  markerRecordedEventAttributes: formatMarkerRecordedEventAttributes,
  requestCancelExternalWorkflowExecutionInitiatedEventAttributes: formatRequestCancelExternalWorkflowExecutionInitiatedEventAttributes,
  signalExternalWorkflowExecutionInitiatedEventAttributes: formatSignalExternalWorkflowExecutionInitiatedEventAttributes,
  startChildWorkflowExecutionInitiatedEventAttributes: formatStartChildWorkflowExecutionInitiatedEventAttributes,
  timerFiredEventAttributes: formatTimerFiredEventAttributes,
  timerStartedEventAttributes: formatTimerStartedEventAttributes,
  upsertWorkflowSearchAttributesEventAttributes: formatUpsertWorkflowSearchAttributesEventAttributes,
  workflowExecutionCompletedEventAttributes: formatWorkflowExecutionCompletedEventAttributes,
  workflowExecutionContinuedAsNewEventAttributes: formatWorkflowExecutionContinuedAsNewEventAttributes,
  workflowExecutionSignaledEventAttributes: formatWorkflowExecutionSignaledEventAttributes,
  workflowExecutionStartedEventAttributes: formatWorkflowExecutionStartedEventAttributes,
};

const formatHistoryEventDetails = ({ attributes, ...event }) => {
  const formatter = AttributesFormatterMap[attributes];
  if (formatter) {
    return {
      [attributes]: formatter(event[attributes])
    };
  }
  console.log('attribute not mapped = ', attributes);
  return event;

  /*
  switch (attributes) {
    // case 'activityTaskCancelRequestedEventAttributes': {
    //   return event; // TODO
    // }

    // case 'activityTaskCanceledEventAttributes': {
    //   return event; // TODO
    // }

    // case 'activityTaskFailedEventAttributes': {
    //   return event; // TODO
    // }

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
