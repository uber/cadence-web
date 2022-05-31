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
  workflowExecutionSignaledEventAttributes: formatWorkflowExecutionSignaledEventAttributes,
  workflowExecutionStartedEventAttributes: formatWorkflowExecutionStartedEventAttributes,
  // 22
};

/*
  EventAttributes:
  1:  optional WorkflowExecutionStartedEventAttributes workflowExecutionStartedEventAttributes
  2:  optional WorkflowExecutionCompletedEventAttributes workflowExecutionCompletedEventAttributes
  3:  optional WorkflowExecutionFailedEventAttributes workflowExecutionFailedEventAttributes
  4:  optional WorkflowExecutionTimedOutEventAttributes workflowExecutionTimedOutEventAttributes
  5:  optional DecisionTaskScheduledEventAttributes decisionTaskScheduledEventAttributes
  6:  optional DecisionTaskStartedEventAttributes decisionTaskStartedEventAttributes
  7: optional DecisionTaskCompletedEventAttributes decisionTaskCompletedEventAttributes
  8: optional DecisionTaskTimedOutEventAttributes decisionTaskTimedOutEventAttributes
  9: optional DecisionTaskFailedEventAttributes decisionTaskFailedEventAttributes
  10: optional ActivityTaskScheduledEventAttributes activityTaskScheduledEventAttributes
  11: optional ActivityTaskStartedEventAttributes activityTaskStartedEventAttributes
  12: optional ActivityTaskCompletedEventAttributes activityTaskCompletedEventAttributes
  13: optional ActivityTaskFailedEventAttributes activityTaskFailedEventAttributes
  14: optional ActivityTaskTimedOutEventAttributes activityTaskTimedOutEventAttributes
  15: optional TimerStartedEventAttributes timerStartedEventAttributes
  16: optional TimerFiredEventAttributes timerFiredEventAttributes
  17: optional ActivityTaskCancelRequestedEventAttributes activityTaskCancelRequestedEventAttributes
  18: optional RequestCancelActivityTaskFailedEventAttributes requestCancelActivityTaskFailedEventAttributes
  19: optional ActivityTaskCanceledEventAttributes activityTaskCanceledEventAttributes
  20: optional TimerCanceledEventAttributes timerCanceledEventAttributes
  21: optional CancelTimerFailedEventAttributes cancelTimerFailedEventAttributes
  22: optional MarkerRecordedEventAttributes markerRecordedEventAttributes
  23: optional WorkflowExecutionSignaledEventAttributes workflowExecutionSignaledEventAttributes
  24: optional WorkflowExecutionTerminatedEventAttributes workflowExecutionTerminatedEventAttributes
  25: optional WorkflowExecutionCancelRequestedEventAttributes workflowExecutionCancelRequestedEventAttributes
  26: optional WorkflowExecutionCanceledEventAttributes workflowExecutionCanceledEventAttributes
  27: optional RequestCancelExternalWorkflowExecutionInitiatedEventAttributes requestCancelExternalWorkflowExecutionInitiatedEventAttributes
  28: optional RequestCancelExternalWorkflowExecutionFailedEventAttributes requestCancelExternalWorkflowExecutionFailedEventAttributes
  29: optional ExternalWorkflowExecutionCancelRequestedEventAttributes externalWorkflowExecutionCancelRequestedEventAttributes
  30: optional WorkflowExecutionContinuedAsNewEventAttributes workflowExecutionContinuedAsNewEventAttributes
  30: optional StartChildWorkflowExecutionInitiatedEventAttributes startChildWorkflowExecutionInitiatedEventAttributes
  31: optional StartChildWorkflowExecutionFailedEventAttributes startChildWorkflowExecutionFailedEventAttributes
  32: optional ChildWorkflowExecutionStartedEventAttributes childWorkflowExecutionStartedEventAttributes
  33: optional ChildWorkflowExecutionCompletedEventAttributes childWorkflowExecutionCompletedEventAttributes
  34: optional ChildWorkflowExecutionFailedEventAttributes childWorkflowExecutionFailedEventAttributes
  35: optional ChildWorkflowExecutionCanceledEventAttributes childWorkflowExecutionCanceledEventAttributes
  36: optional ChildWorkflowExecutionTimedOutEventAttributes childWorkflowExecutionTimedOutEventAttributes
  37: optional ChildWorkflowExecutionTerminatedEventAttributes childWorkflowExecutionTerminatedEventAttributes
  38: optional SignalExternalWorkflowExecutionInitiatedEventAttributes signalExternalWorkflowExecutionInitiatedEventAttributes
  39: optional SignalExternalWorkflowExecutionFailedEventAttributes signalExternalWorkflowExecutionFailedEventAttributes
  40: optional ExternalWorkflowExecutionSignaledEventAttributes externalWorkflowExecutionSignaledEventAttributes
  41: optional UpsertWorkflowSearchAttributesEventAttributes upsertWorkflowSearchAttributesEventAttributes
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
