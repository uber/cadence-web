import formatPayload from "./format-payload";

const formatterMap = {
  workflowExecutionCanceledEventAttributes: ({
    decisionTaskCompletedEventId,
    details,
  }: any) => ({
    decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
    details: formatPayload(details),
  }),
  workflowExecutionCompletedEventAttributes: ({
    decisionTaskCompletedEventId,
    result,
  }: any) => ({
    decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
    result: formatPayload(result),
  }),
  workflowExecutionContinuedAsNewEventAttributes: ({
    backoffStartInterval,
    decisionTaskCompletedEventId,
    executionStartToCloseTimeout,
    failure,
    header,
    initiator,
    input,
    memo,
    searchAttributes,
    taskList,
    taskStartToCloseTimeout,
    ...eventAttributes
  }: any) => ({
    ...eventAttributes,
    backoffStartIntervalInSeconds: formatDurationToSeconds(backoffStartInterval),
    decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
    executionStartToCloseTimeoutSeconds: formatDurationToSeconds(
      executionStartToCloseTimeout
    ),
    failureDetails: formatFailureDetails(failure),
    failureReason: failure?.reason || '',
    header: formatPayloadMap(header, 'fields'),
    initiator: formatEnum(initiator, 'CONTINUE_AS_NEW_INITIATOR'),
    input: formatPayload(input),
    memo: formatPayloadMap(memo, 'fields'),
    searchAttributes: formatPayloadMap(searchAttributes, 'indexedFields'),
    taskList: {
      kind: formatEnum(taskList?.kind, 'TASK_LIST_KIND'),
      name: taskList?.name || null,
    },
    taskStartToCloseTimeoutSeconds: formatDurationToSeconds(
      taskStartToCloseTimeout
    ),
  }),
  workflowExecutionFailedEventAttributes: ({
    failure,
    decisionTaskCompletedEventId,
  }: any) => ({
    decisionTaskCompletedEventId: parseInt(decisionTaskCompletedEventId),
    details: formatFailureDetails(failure),
    reason: failure?.reason || '',
  }),
  workflowExecutionSignaledEventAttributes: ({
    input,
    ...eventAttributes
  }: any) => ({
    ...eventAttributes,
    input: formatPayload(input),
  }),
  workflowExecutionStartedEventAttributes: ({
    attempt,
    continuedExecutionRunId,
    continuedFailure,
    cronSchedule,
    executionStartToCloseTimeout,
    expirationTime,
    firstDecisionTaskBackoff,
    firstExecutionRunId,
    firstScheduledTimeNano,
    identity,
    initiator,
    input,
    memo,
    originalExecutionRunId,
    parentExecutionInfo,
    prevAutoResetPoints,
    retryPolicy,
    searchAttributes,
    taskList,
    taskStartToCloseTimeout,
    ...eventAttributes
  }: any) => ({
    ...eventAttributes,
    taskList: {
      kind: formatEnum(taskList?.kind, 'TASK_LIST_KIND'),
      name: taskList?.name || null,
    },
    input: formatPayload(input),
    executionStartToCloseTimeoutSeconds: formatDurationToSeconds(
      executionStartToCloseTimeout
    ),
    taskStartToCloseTimeoutSeconds: formatDurationToSeconds(
      taskStartToCloseTimeout
    ),
    attempt: attempt || null,
    continuedExecutionRunId: continuedExecutionRunId || null,
    continuedFailureDetails: formatFailureDetails(continuedFailure),
    continuedFailureReason: continuedFailure?.reason || null,
    cronSchedule: cronSchedule || null,
    expirationTimestamp: formatTimestampToDatetime(expirationTime),
    firstDecisionTaskBackoffSeconds: formatDurationToSeconds(
      firstDecisionTaskBackoff
    ),
    firstExecutionRunId: firstExecutionRunId || null,
    firstScheduledTimeNano: firstScheduledTimeNano || null,
    identity: identity || null,
    initiator: formatEnum(initiator, 'CONTINUE_AS_NEW_INITIATOR'),
    memo: formatPayloadMap(memo, 'fields'),
    originalExecutionRunId: originalExecutionRunId || null,
    parentInitiatedEventId: parentExecutionInfo?.initiatedId
      ? parseInt(parentExecutionInfo.initiatedId)
      : null,
    parentWorkflowDomain: parentExecutionInfo?.domainName || null,
    parentWorkflowExecution: parentExecutionInfo?.workflowExecution || null,
    prevAutoResetPoints: formatPrevAutoResetPoints(prevAutoResetPoints),
    retryPolicy: formatRetryPolicy(retryPolicy),
    searchAttributes: formatPayloadMap(searchAttributes, 'indexedFields'),
  }),
  workflowExecutionTerminatedEventAttributes: ({
    details,
    ...eventAttributes
  }: any) => ({
    ...eventAttributes,
    details: formatPayload(details),
  }),
}˝

export function formatCloseEventResult() {


}