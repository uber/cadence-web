import type { DecisionHistoryEvent } from '../workflow-history.types';

export const scheduleDecisionTaskEvent = {
  eventId: '2',
  eventTime: {
    seconds: '1725747370',
    nanos: 552194764,
  },
  version: '575102',
  taskId: '22647174794',
  decisionTaskScheduledEventAttributes: {
    taskList: {
      name: 'canary-task-queue',
      kind: 'TASK_LIST_KIND_INVALID',
    },
    startToCloseTimeout: {
      seconds: '10',
      nanos: 0,
    },
    attempt: 0,
  },
  attributes: 'decisionTaskScheduledEventAttributes',
} as const satisfies DecisionHistoryEvent;

export const startDecisionTaskEvent = {
  eventId: '3',
  eventTime: {
    seconds: '1725747370',
    nanos: 575409843,
  },
  version: '575102',
  taskId: '22647174798',
  decisionTaskStartedEventAttributes: {
    scheduledEventId: '2',
    identity:
      '1@phx8-wr5@cadence-canary-staging@canary-task-queue@958ab341-a376-431b-a17a-ed7d8a97ba91',
    requestId: '66f7f58b-3d3b-4178-972a-fa7825ceec37',
  },
  attributes: 'decisionTaskStartedEventAttributes',
} as const satisfies DecisionHistoryEvent;

export const completeDecisionTaskEvent = {
  eventId: '4',
  eventTime: {
    seconds: '1725747370',
    nanos: 599272941,
  },
  version: '575102',
  taskId: '22647174802',
  decisionTaskCompletedEventAttributes: {
    scheduledEventId: '2',
    startedEventId: '3',
    identity:
      '1@phx8-wr5@cadence-canary-staging@canary-task-queue@958ab341-a376-431b-a17a-ed7d8a97ba91',
    binaryChecksum: 'uDeploy:eb16a90a9182002897d7a6c6585871eedace61d1',
    executionContext: '',
  },
  attributes: 'decisionTaskCompletedEventAttributes',
} as const satisfies DecisionHistoryEvent;

export const completedDecisionTaskEvents: DecisionHistoryEvent[] = [
  scheduleDecisionTaskEvent,
  startDecisionTaskEvent,
  completeDecisionTaskEvent,
];

/* export const failedDecisionTaskEvents: DecisionHistoryEvent[] = [
  scheduleDecisionTaskEvent,
  startDecisionTaskEvent,
  failedDecisionTaskEvent,
]; */

/* export const timedoutDecisionTaskEvents: DecisionHistoryEvent[] = [
  scheduleDecisionTaskEvent,
  startDecisionTaskEvent,
  timeoutDecisionTaskEvent,
]; */
