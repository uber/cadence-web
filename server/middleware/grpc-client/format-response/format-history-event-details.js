const formatTimestampToDatetime = require('./format-timestamp-to-datetime');
const formatTimestampToSeconds = require('./format-timestamp-to-seconds');

const formatHistoryEventDetails = ({
  attributes,
  ...event
}) => {
  console.log('attributes = ', attributes);
  switch (attributes) {
    // case 'activityTaskCancelRequestedEventAttributes':
    //   return eventAttributes; // TODO
    // case 'activityTaskCanceledEventAttributes':
    //   return eventAttributes; // TODO

    // case 'activityTaskCompletedEventAttributes':
    //   return eventAttributes;

    // case 'activityTaskFailedEventAttributes':
    //   return eventAttributes; // TODO

    // case 'activityTaskScheduledEventAttributes':
    //   return {
    //     ...eventAttributes,
    //     heartbeatTimeoutSeconds: formatTimestampToSeconds(eventAttributes.heartbeatTimeout),
    //     scheduleToCloseTimeoutSeconds: formatTimestampToSeconds(eventAttributes.scheduleToCloseTimeout),
    //     scheduleToStartTimeoutSeconds: formatTimestampToSeconds(eventAttributes.scheduleToStartTimeout),
    //     startToCloseTimeoutSeconds: formatTimestampToSeconds(eventAttributes.startToCloseTimeout),
    //   };
    // case 'activityTaskStartedEventAttributes':
    //   return {
    //     ...eventAttributes,
    //     lastFailureDetails: eventAttributes.lastFailure.details,
    //     lastFailureReason: eventAttributes.lastFailure.reason,
    //   };

    // case 'activityTaskTimedOutEventAttributes':
    //   return eventAttributes; // TODO
    // case 'cancelTimerFailedEventAttributes':
    //   return eventAttributes; // TODO
    // case 'childWorkflowExecutionCanceledEventAttributes':
    //   return eventAttributes; // TODO
    // case 'childWorkflowExecutionCompletedEventAttributes':
    //   return eventAttributes; // TODO
    // case 'childWorkflowExecutionFailedEventAttributes':
    //   return eventAttributes; // TODO
    // case 'childWorkflowExecutionStartedEventAttributes':
    //   return eventAttributes; // TODO
    // case 'childWorkflowExecutionTerminatedEventAttributes':
    //   return eventAttributes; // TODO
    // case 'childWorkflowExecutionTimedOutEventAttributes':
    //   return eventAttributes; // TODO

    // case 'decisionTaskCompletedEventAttributes':
    //   return eventAttributes;

    // case 'decisionTaskFailedEventAttributes':
    //   return eventAttributes; // TODO

    // case 'decisionTaskScheduledEventAttributes':
    //   return {
    //     ...eventAttributes,
    //     startToCloseTimeoutSeconds: formatTimestampToSeconds(eventAttributes.startToCloseTimeout),
    //   };
    // case 'decisionTaskStartedEventAttributes':
    //   return eventAttributes;

    // case 'decisionTaskTimedOutEventAttributes':
    //   return eventAttributes; // TODO
    // case 'externalWorkflowExecutionCancelRequestedEventAttributes':
    //   return eventAttributes; // TODO
    // case 'externalWorkflowExecutionSignaledEventAttributes':
    //   return eventAttributes; // TODO

    // case 'markerRecordedEventAttributes':
    //   return eventAttributes;

    // case 'requestCancelActivityTaskFailedEventAttributes':
    //   return eventAttributes; // TODO
    // case 'requestCancelExternalWorkflowExecutionFailedEventAttributes':
    //   return eventAttributes; // TODO
    // case 'requestCancelExternalWorkflowExecutionInitiatedEventAttributes':
    //   return eventAttributes; // TODO
    // case 'signalExternalWorkflowExecutionFailedEventAttributes':
    //   return eventAttributes; // TODO
    // case 'signalExternalWorkflowExecutionInitiatedEventAttributes':
    //   return eventAttributes; // TODO
    // case 'startChildWorkflowExecutionInitiatedEventAttributes':
    //   return eventAttributes; // TODO
    // case 'startChildWorkflowExecutionFailedEventAttributes':
    //   return eventAttributes; // TODO
    // case 'timerCanceledEventAttributes':
    //   return eventAttributes; // TODO

    // case 'timerStartedEventAttributes':
    //   return {
    //     ...eventAttributes,
    //     startToFireTimeoutSeconds: formatTimestampToSeconds(eventAttributes.startToFireTimeout),
    //   };
    // case 'timerFiredEventAttributes':
    //   return eventAttributes;
    // case 'upsertWorkflowSearchAttributesEventAttributes':
    //   return eventAttributes;

    // case 'workflowExecutionCancelRequestedEventAttributes':
    //   return eventAttributes; // TODO
    // case 'workflowExecutionCanceledEventAttributes':
    //   return eventAttributes; // TODO
    // case 'workflowExecutionCompletedEventAttributes':
    //   return eventAttributes; // TODO

    // case 'workflowExecutionContinuedAsNewEventAttributes':
    //   return {
    //     ...eventAttributes,
    //     backoffStartIntervalSeconds: formatTimestampToSeconds(eventAttributes.backoffStartInterval),
    //     executionStartToCloseTimeoutSeconds: formatTimestampToSeconds(eventAttributes.executionStartToCloseTimeout),
    //     taskStartToCloseTimeoutSeconds: formatTimestampToSeconds(eventAttributes.taskStartToCloseTimeout),
    //   };

    // case 'workflowExecutionFailedEventAttributes':
    //   return eventAttributes; // TODO
    // case 'workflowExecutionSignaledEventAttributes':
    //   return eventAttributes; // TODO
    case 'workflowExecutionStartedEventAttributes':
      const {
        executionStartToCloseTimeout,
        firstDecisionTaskBackoff,
        prevAutoResetPoints,
        taskStartToCloseTimeout,
        ...eventAttributes
      } = event[attributes];
      return {
        [attributes]: {
          ...eventAttributes,
          executionStartToCloseTimeoutSeconds: formatTimestampToSeconds(executionStartToCloseTimeout),
          firstDecisionTaskBackoffSeconds: formatTimestampToSeconds(firstDecisionTaskBackoff),
          ...(prevAutoResetPoints && prevAutoResetPoints.points && {
            prevAutoResetPoints: {
              points: prevAutoResetPoints.points.map(({
                createdTime,
                expiringTime,
                ...point
              }) => ({
                ...point,
                createdTimeNano: formatTimestampToDatetime(createdTime),
                expiringTimeNano: formatTimestampToDatetime(expiringTime),
              }))
            },
          }),
          taskStartToCloseTimeoutSeconds: formatTimestampToSeconds(eventAttributes.taskStartToCloseTimeout)
        },
      };
    // case 'workflowExecutionTerminatedEventAttributes':
    //   return eventAttributes; // TODO
    // case 'workflowExecutionTimedOutEventAttributes':
    //   return eventAttributes; // TODO
  }
  // console.log(`unexpected event attribute "${attributes}". returning non-formatted grpc response event details.`);
  // return eventAttributes;
};

module.exports = formatHistoryEventDetails;
