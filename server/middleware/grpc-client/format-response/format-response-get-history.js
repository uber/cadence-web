const formatTimestampToDatetime = require('./format-timestamp-to-datetime');
const formatTimestampToSeconds = require('./format-timestamp-to-seconds');

const formatResponseGetHistory = ({
  history: {
    events,
  },
  ...response
}) => ({
  ...response,
  history: {
    events: events.map(({
      activityTaskCompletedEventAttributes,
      activityTaskScheduledEventAttributes,
      activityTaskStartedEventAttributes,
      decisionTaskCompletedEventAttributes,
      decisionTaskScheduledEventAttributes,
      decisionTaskStartedEventAttributes,
      eventId,
      eventTime,
      markerRecordedEventAttributes,
      timerFiredEventAttributes,
      timerStartedEventAttributes,
      upsertWorkflowSearchAttributesEventAttributes,
      workflowExecutionContinuedAsNewEventAttributes,
      workflowExecutionStartedEventAttributes,
      ...event
    }) => ({
      ...event,
      ...(activityTaskCompletedEventAttributes && {
        eventType: 'ActivityTaskCompleted',
        details: activityTaskCompletedEventAttributes,
      }),
      ...(activityTaskScheduledEventAttributes && {
        eventType: 'ActivityTaskScheduled',
        details: {
          ...activityTaskScheduledEventAttributes,
          heartbeatTimeoutSeconds: formatTimestampToSeconds(activityTaskScheduledEventAttributes.heartbeatTimeout),
          scheduleToCloseTimeoutSeconds: formatTimestampToSeconds(activityTaskScheduledEventAttributes.scheduleToCloseTimeout),
          scheduleToStartTimeoutSeconds: formatTimestampToSeconds(activityTaskScheduledEventAttributes.scheduleToStartTimeout),
          startToCloseTimeoutSeconds: formatTimestampToSeconds(activityTaskScheduledEventAttributes.startToCloseTimeout),
        },
      }),
      ...(activityTaskStartedEventAttributes && {
        eventType: 'ActivityTaskStarted',
        details: {
          ...activityTaskStartedEventAttributes,
          lastFailureDetails: activityTaskStartedEventAttributes.lastFailure.details,
          lastFailureReason: activityTaskStartedEventAttributes.lastFailure.reason,
        },
      }),
      ...(decisionTaskCompletedEventAttributes && {
        eventType: 'DecisionTaskCompleted',
        details: decisionTaskCompletedEventAttributes,
      }),
      ...(decisionTaskScheduledEventAttributes && {
        eventType: 'DecisionTaskScheduled',
        details: {
          ...decisionTaskScheduledEventAttributes,
          startToCloseTimeoutSeconds: formatTimestampToSeconds(decisionTaskScheduledEventAttributes.startToCloseTimeout),
        },
      }),
      ...(decisionTaskStartedEventAttributes && {
        eventType: 'DecisionTaskStarted',
        details: decisionTaskStartedEventAttributes,
      }),
      ...(markerRecordedEventAttributes && {
        eventType: 'MarkerRecorded',
        details: markerRecordedEventAttributes,
      }),
      ...(timerFiredEventAttributes && {
        eventType: 'TimerFired',
        details: timerFiredEventAttributes,
      }),
      ...(timerStartedEventAttributes && {
        eventType: 'TimerStarted',
        details: {
          ...timerStartedEventAttributes,
          startToFireTimeoutSeconds: formatTimestampToSeconds(timerStartedEventAttributes.startToFireTimeout),
        }
      }),
      ...(upsertWorkflowSearchAttributesEventAttributes && {
        eventType: 'UpsertWorkflowSearchAttributes',
        details: upsertWorkflowSearchAttributesEventAttributes,
      }),
      ...(workflowExecutionContinuedAsNewEventAttributes && {
        eventType: 'WorkflowExecutionContinuedAsNew',
        details: {
          ...workflowExecutionContinuedAsNewEventAttributes,
          backoffStartIntervalSeconds: formatTimestampToSeconds(workflowExecutionContinuedAsNewEventAttributes.backoffStartInterval),
          executionStartToCloseTimeoutSeconds: formatTimestampToSeconds(workflowExecutionContinuedAsNewEventAttributes.executionStartToCloseTimeout),
          taskStartToCloseTimeoutSeconds: formatTimestampToSeconds(workflowExecutionContinuedAsNewEventAttributes.taskStartToCloseTimeout),
        },
      }),
      ...(workflowExecutionStartedEventAttributes && {
        eventType: 'WorkflowExecutionStarted',
        details: {
          ...workflowExecutionStartedEventAttributes,
          executionStartToCloseTimeoutSeconds: formatTimestampToSeconds(workflowExecutionStartedEventAttributes.executionStartToCloseTimeout),
          firstDecisionTaskBackoffSeconds: formatTimestampToSeconds(workflowExecutionStartedEventAttributes.firstDecisionTaskBackoff),
          prevAutoResetPoints: {
            points: workflowExecutionStartedEventAttributes.prevAutoResetPoints.points.map(({
              createdTime,
              expiringTime,
              ...point
            }) => ({
              ...point,
              createdTimeNano: formatTimestampToDatetime(createdTime),
              expiringTimeNano: formatTimestampToDatetime(expiringTime),
            }))
          },
          taskStartToCloseTimeoutSeconds: formatTimestampToSeconds(workflowExecutionStartedEventAttributes.taskStartToCloseTimeout)
        },
      }),
      eventId: parseInt(eventId),
      timestamp: formatTimestampToDatetime(eventTime),
    })),
  },
});

module.exports = formatResponseGetHistory;
