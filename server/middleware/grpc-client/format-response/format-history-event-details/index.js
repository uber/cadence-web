const formatActivityTaskCompletedEventAttributes = require('./format-activity-task-completed-event-attributes');
const formatActivityTaskFailedEventAttributes = require('./format-activity-task-failed-event-attributes');
const formatActivityTaskScheduledEventAttributes = require('./format-activity-task-scheduled-event-attributes');
const formatActivityTaskStartedEventAttributes = require('./format-activity-task-started-event-attributes');
const formatActivityTaskTimedOutEventAttributes = require('./format-activity-task-timed-out-event-attributes');
const formatChildWorkflowExecutionCanceledEventAttributes = require('./format-child-workflow-execution-canceled-event-attributes');
const formatChildWorkflowExecutionCompletedEventAttributes = require('./format-child-workflow-execution-completed-event-attributes');
const formatChildWorkflowExecutionStartedEventAttributes = require('./format-child-workflow-execution-started-event-attributes');
const formatDecisionTaskCompletedEventAttributes = require('./format-decision-task-completed-event-attributes');
const formatDecisionTaskFailedEventAttributes = require('./format-decision-task-failed-event-attributes');
const formatDecisionTaskScheduledEventAttributes = require('./format-decision-task-scheduled-event-attributes');
const formatDecisionTaskStartedEventAttributes = require('./format-decision-task-started-event-attributes');
const formatExternalWorkflowExecutionCancelRequestedEventAttributes = require('./format-external-workflow-execution-cancel-requested-event-attributes');
const formatExternalWorkflowExecutionSignaledEventAttributes = require('./format-external-workflow-execution-signaled-event-attributes');
const formatMarkerRecordedEventAttributes = require('./format-marker-recorded-event-attributes');
const formatRequestCancelExternalWorkflowExecutionInitiatedEventAttributes = require('./format-request-cancel-external-workflow-execution-initiated-event-attributes');
const formatSignalExternalWorkflowExecutionInitiatedEventAttributes = require('./format-signal-external-workflow-execution-initiated-event-attributes');
const formatStartChildWorkflowExecutionInitiatedEventAttributes = require('./format-start-child-workflow-execution-initiated-event-attributes');
const formatTimerCanceledEventAttributes = require('./format-timer-canceled-event-attributes');
const formatTimerFiredEventAttributes = require('./format-timer-fired-event-attributes');
const formatTimerStartedEventAttributes = require('./format-timer-started-event-attributes');
const formatUpsertWorkflowSearchAttributesEventAttributes = require('./format-upsert-workflow-search-attributes-event-attributes');
const formatWorkflowExecutionCancelRequestedEventAttributes = require('./format-workflow-execution-cancel-requested-event-attributes');
const formatWorkflowExecutionCanceledEventAttributes = require('./format-workflow-execution-canceled-event-attributes');
const formatWorkflowExecutionCompletedEventAttributes = require('./format-workflow-execution-completed-event-attributes');
const formatWorkflowExecutionContinuedAsNewEventAttributes = require('./format-workflow-execution-continued-as-new-event-attributes');
const formatWorkflowExecutionFailedEventAttributes = require('./format-workflow-execution-failed-event-attributes');
const formatWorkflowExecutionSignaledEventAttributes = require('./format-workflow-execution-signaled-event-attributes');
const formatWorkflowExecutionStartedEventAttributes = require('./format-workflow-execution-started-event-attributes');

const AttributesFormatterMap = {
  activityTaskCompletedEventAttributes: formatActivityTaskCompletedEventAttributes,
  activityTaskFailedEventAttributes: formatActivityTaskFailedEventAttributes,
  activityTaskScheduledEventAttributes: formatActivityTaskScheduledEventAttributes,
  activityTaskStartedEventAttributes: formatActivityTaskStartedEventAttributes,
  activityTaskTimedOutEventAttributes: formatActivityTaskTimedOutEventAttributes,
  childWorkflowExecutionCanceledEventAttributes: formatChildWorkflowExecutionCanceledEventAttributes,
  childWorkflowExecutionCompletedEventAttributes: formatChildWorkflowExecutionCompletedEventAttributes,
  childWorkflowExecutionStartedEventAttributes: formatChildWorkflowExecutionStartedEventAttributes,
  decisionTaskCompletedEventAttributes: formatDecisionTaskCompletedEventAttributes,
  decisionTaskFailedEventAttributes: formatDecisionTaskFailedEventAttributes,
  decisionTaskScheduledEventAttributes: formatDecisionTaskScheduledEventAttributes,
  decisionTaskStartedEventAttributes: formatDecisionTaskStartedEventAttributes,
  externalWorkflowExecutionCancelRequestedEventAttributes: formatExternalWorkflowExecutionCancelRequestedEventAttributes,
  externalWorkflowExecutionSignaledEventAttributes: formatExternalWorkflowExecutionSignaledEventAttributes,
  markerRecordedEventAttributes: formatMarkerRecordedEventAttributes,
  requestCancelExternalWorkflowExecutionInitiatedEventAttributes: formatRequestCancelExternalWorkflowExecutionInitiatedEventAttributes,
  signalExternalWorkflowExecutionInitiatedEventAttributes: formatSignalExternalWorkflowExecutionInitiatedEventAttributes,
  startChildWorkflowExecutionInitiatedEventAttributes: formatStartChildWorkflowExecutionInitiatedEventAttributes,
  timerCanceledEventAttributes: formatTimerCanceledEventAttributes,
  timerFiredEventAttributes: formatTimerFiredEventAttributes,
  timerStartedEventAttributes: formatTimerStartedEventAttributes,
  upsertWorkflowSearchAttributesEventAttributes: formatUpsertWorkflowSearchAttributesEventAttributes,
  workflowExecutionCancelRequestedEventAttributes: formatWorkflowExecutionCancelRequestedEventAttributes,
  workflowExecutionCanceledEventAttributes: formatWorkflowExecutionCanceledEventAttributes,
  workflowExecutionCompletedEventAttributes: formatWorkflowExecutionCompletedEventAttributes,
  workflowExecutionContinuedAsNewEventAttributes: formatWorkflowExecutionContinuedAsNewEventAttributes,
  workflowExecutionFailedEventAttributes: formatWorkflowExecutionFailedEventAttributes,
  workflowExecutionSignaledEventAttributes: formatWorkflowExecutionSignaledEventAttributes,
  workflowExecutionStartedEventAttributes: formatWorkflowExecutionStartedEventAttributes,
  // 28 total implemented
};

/*
  EventAttributes remaining to implement:
  2:  optional WorkflowExecutionTimedOutEventAttributes workflowExecutionTimedOutEventAttributes
  3: optional DecisionTaskTimedOutEventAttributes decisionTaskTimedOutEventAttributes
  4: optional ActivityTaskCancelRequestedEventAttributes activityTaskCancelRequestedEventAttributes
  5: optional RequestCancelActivityTaskFailedEventAttributes requestCancelActivityTaskFailedEventAttributes
  6: optional ActivityTaskCanceledEventAttributes activityTaskCanceledEventAttributes
  7: optional CancelTimerFailedEventAttributes cancelTimerFailedEventAttributes
  8: optional WorkflowExecutionTerminatedEventAttributes workflowExecutionTerminatedEventAttributes
  9: optional RequestCancelExternalWorkflowExecutionFailedEventAttributes requestCancelExternalWorkflowExecutionFailedEventAttributes
  10: optional StartChildWorkflowExecutionFailedEventAttributes startChildWorkflowExecutionFailedEventAttributes
  11: optional ChildWorkflowExecutionFailedEventAttributes childWorkflowExecutionFailedEventAttributes
  12: optional ChildWorkflowExecutionTimedOutEventAttributes childWorkflowExecutionTimedOutEventAttributes
  13: optional ChildWorkflowExecutionTerminatedEventAttributes childWorkflowExecutionTerminatedEventAttributes
  14: optional SignalExternalWorkflowExecutionFailedEventAttributes signalExternalWorkflowExecutionFailedEventAttributes

  14 remaining

  41 total
*/

const formatHistoryEventDetails = ({ attributes, ...event }) => {
  const formatter = AttributesFormatterMap[attributes];
  if (formatter) {
    return {
      [attributes]: formatter(event[attributes])
    };
  }
  console.log('attribute not mapped = ', attributes);
  return event;
};

module.exports = formatHistoryEventDetails;
