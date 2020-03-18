import moment from 'moment';
import { summarizeEvents } from './summarize-events';
import { shortName } from '~helpers';

export default function(historyEvents) {
  const events = [];
  const hash = {};

  const add = i => {
    hash[i.id] = i;
    events.push(i);

    return i;
  };

  const assignEnd = (item, end) => {
    // eslint-disable-next-line no-param-reassign
    item.ongoing = false;
    // eslint-disable-next-line no-param-reassign
    item.end = moment(end);
  };

  historyEvents.forEach(e => {
    if (e.eventType.startsWith('ActivityTask')) {
      const scheduledEvent =
        'activityId' in e.details
          ? e
          : historyEvents[e.details.scheduledEventId - 1];
      const { activityId } = scheduledEvent.details;
      let item = hash[`activity${activityId}`];

      if (!item) {
        item = add({
          id: `activity${activityId}`,
          className: 'activity',
          eventIds: [e.eventId],
          start: moment(scheduledEvent.timestamp),
          ongoing: true,
          content: `Activity ${activityId}: ${shortName(
            scheduledEvent.details.activityType &&
              scheduledEvent.details.activityType.name
          )}`,
          details: {
            input: e.details.input,
            scheduleToStartTimeoutSeconds:
              e.details.scheduleToStartTimeoutSeconds,
            scheduleToCloseTimeoutSeconds:
              e.details.scheduleToCloseTimeoutSeconds,
          },
        });
      } else {
        item.eventIds.push(e.eventId);

        if (e.eventType !== 'ActivityTaskStarted') {
          Object.assign(item.details, summarizeEvents[e.eventType](e.details));
        }
      }

      if (
        e.eventType !== 'ActivityTaskScheduled' &&
        e.eventType !== 'ActivityTaskStarted'
      ) {
        assignEnd(item, e.timestamp);
        item.className = `activity ${e.eventType
          .replace('ActivityTask', '')
          .toLowerCase()}`;
      }
    } else if (e.eventType.includes('ChildWorkflowExecution')) {
      const initiatedEvent =
        'initiatedEventId' in e.details
          ? historyEvents[e.details.initiatedEventId - 1]
          : e;
      const initiatedEventId = initiatedEvent.eventId;
      let item = hash[`childWf${initiatedEventId}`];

      if (!item) {
        item = add({
          id: `childWf${initiatedEventId}`,
          className: 'child-workflow',
          eventIds: [e.eventId],
          start: moment(initiatedEvent.timestamp),
          ongoing: true,
          content: `Child Workflow: ${shortName(e.details.workflowType.name)}`,
          details: {
            input: e.details.input,
          },
        });
      } else {
        item.eventIds.push(e.eventId);

        if (e.eventType in summarizeEvents) {
          const summary = summarizeEvents[e.eventType](e.details);

          if (
            !item.titleLink &&
            summary.Workflow &&
            summary.Workflow.routeLink
          ) {
            item.titleLink = summary.Workflow.routeLink;
          }

          Object.assign(item.details);
        }
      }

      if (
        e.eventType !== 'StartChildWorkflowExecutionInitiated' &&
        e.eventType !== 'ChildWorkflowExecutionStarted'
      ) {
        assignEnd(item, e.timestamp);
        item.className = `child-workflow ${e.eventType
          .replace('ChildWorkflowExecution', '')
          .toLowerCase()}`;
      }
    } else if (e.eventType === 'TimerStarted') {
      add({
        id: `timer${e.details.timerId}`,
        className: 'timer',
        eventIds: [e.eventId],
        start: moment(e.timestamp),
        end: moment(e.timestamp).add(
          e.details.startToFireTimeoutSeconds,
          'seconds'
        ),
        content: `Timer ${e.details.timerId} (${moment
          .duration(e.details.startToFireTimeoutSeconds, 'seconds')
          .format()})`,
      });
    } else if (e.eventType === 'TimerFired') {
      const timerStartedEvent = hash[`timer${e.details.timerId}`];

      if (timerStartedEvent) {
        timerStartedEvent.eventIds.push(e.eventId);
      }
    } else if (e.eventType === 'MarkerRecorded') {
      const markerName =
        e.details.markerName !== undefined
          ? e.details.markerName.toLowerCase()
          : '';

      add({
        id: `marker${e.eventId}`,
        className: `marker marker-${markerName}`,
        eventIds: [e.eventId],
        start: moment(e.timestamp),
        content:
          {
            Version: 'Version Marker',
            SideEffect: 'Side Effect',
            LocalActivity: 'Local Activity',
          }[e.details.markerName] || `${e.details.markerName} Marker`,
        details: summarizeEvents.MarkerRecorded(e.details),
      });
    } else if (e.eventType === 'WorkflowExecutionSignaled') {
      add({
        id: `signal${e.eventId}`,
        className: 'signal',
        eventIds: [e.eventId],
        start: moment(e.timestamp),
        content: 'Workflow Signaled',
        details: {
          input: e.details.input,
        },
      });
    } else if (e.eventType === 'SignalExternalWorkflowExecutionInitiated') {
      add({
        id: `extsignal${e.eventId}`,
        className: 'external-signal',
        eventIds: [e.eventId],
        start: moment(e.timestamp),
        ongoing: true,
        content: 'External Workflow Signaled',
        details: summarizeEvents.SignalExternalWorkflowExecutionInitiated(
          e.details
        ),
      });
    } else if (e.eventType === 'ExternalWorkflowExecutionSignaled') {
      const initiatedEvent = hash[`extsignal${e.eventId}`];

      if (initiatedEvent) {
        initiatedEvent.eventIds.push(e.eventId);
        // TODO - code will break as item is not defined.
        // assignEnd(item, e.timestamp);
      }
    } else if (
      e.eventType === 'DecisionTaskFailed' ||
      e.eventType === 'DecisionTaskTimedOut'
    ) {
      add({
        id: `decision${e.eventId}`,
        className: `decision ${e.eventType
          .replace('DecisionTask', '')
          .toLowerCase()}`,
        eventIds: [e.eventId],
        start: moment(e.timestamp),
        content: e.eventType,
        details: e.details,
      });
    }
  });

  return events;
}
