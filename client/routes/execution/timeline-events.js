import moment from 'moment'
import shortName from '../../short-name'
import summarizeEvents from './summarize-events'

export default function(historyEvents) {
  const events = [], hash = {},
  add = i => {
    hash[i.id] = i
    events.push(i)
    return i
  },
  assignEnd = (item, end) => {
    item.ongoing = false
    item.end = moment(end)
  }

  historyEvents.forEach(e => {
    if (e.eventType.startsWith('ActivityTask')) {
      let scheduledEvent = 'activityId' in e.details ? e : historyEvents[e.details.scheduledEventId - 1],
          activityId = scheduledEvent.details.activityId,
          item = hash['activity' + activityId]

      if (!item) {
        item = add({
          id: 'activity' + activityId,
          className: 'activity',
          eventIds: [e.eventId],
          start: moment(scheduledEvent.timestamp),
          ongoing: true,
          content: `Activity ${activityId}: ${shortName(scheduledEvent.details.activityType && scheduledEvent.details.activityType.name)}`,
          details: {
            input: e.details.input,
            scheduleToStartTimeoutSeconds: e.details.scheduleToStartTimeoutSeconds,
            scheduleToCloseTimeoutSeconds: e.details.scheduleToCloseTimeoutSeconds
          }
        })
      } else {
        item.eventIds.push(e.eventId)
        if (e.eventType !== 'ActivityTaskStarted') {
          Object.assign(item.details, summarizeEvents[e.eventType](e.details))
        }
      }

      if (e.eventType !== 'ActivityTaskScheduled' && e.eventType !== 'ActivityTaskStarted') {
        assignEnd(item, e.timestamp)
        item.className = 'activity ' + e.eventType.replace('ActivityTask', '').toLowerCase()
      }
    } else if (e.eventType.includes('ChildWorkflowExecution')) {
      let initiatedEvent = 'initiatedEventId' in e.details ? historyEvents[e.details.initiatedEventId - 1] : e,
          initiatedEventId = initiatedEvent.eventId,
          item = hash['childWf' + initiatedEventId]

      if (!item) {
        item = add({
          id: 'childWf' + initiatedEventId,
          className: 'child-workflow',
          eventIds: [e.eventId],
          start: moment(initiatedEvent.timestamp),
          ongoing: true,
          content: `Child Workflow: ${shortName(e.details.workflowType.name)}`,
          details: {
            input: e.details.input
          }
        })
      } else {
        item.eventIds.push(e.eventId)
        if (e.eventType in summarizeEvents) {
          let summary = summarizeEvents[e.eventType](e.details)
          if (!item.titleLink && summary.Workflow && summary.Workflow.routeLink) {
            item.titleLink = summary.Workflow.routeLink
          }
          Object.assign(item.details, )
        }
      }

      if (e.eventType !== 'StartChildWorkflowExecutionInitiated' && e.eventType !== 'ChildWorkflowExecutionStarted') {
        assignEnd(item, e.timestamp)
        item.className = 'child-workflow ' + e.eventType.replace('ChildWorkflowExecution', '').toLowerCase()
      }
    } else if (e.eventType === 'TimerStarted') {
      add({
        id: 'timer' + e.details.timerId,
        className: 'timer',
        eventIds: [e.eventId],
        start: moment(e.timestamp),
        end: moment(e.timestamp).add(e.details.startToFireTimeoutSeconds, 'seconds'),
        content: `Timer ${e.details.timerId} (${moment.duration(e.details.startToFireTimeoutSeconds, 'seconds').format()})`
      })
    } else if (e.eventType === 'TimerFired') {
      let timerStartedEvent = hash[`timer${e.details.timerId}`]
      if (timerStartedEvent) {
        timerStartedEvent.eventIds.push(e.eventId)
      }
    } else if (e.eventType === 'MarkerRecorded') {
      add({
        id: 'marker' + e.eventId,
        className: 'marker marker-' + e.details.markerName.toLowerCase(),
        eventIds: [e.eventId],
        start: moment(e.timestamp),
        content: ({
          Version: 'Verison Marker',
          SideEffect: 'Side Effect',
          LocalActivity: 'Local Activity'
        }[e.details.markerName]) || (e.details.markerName + ' Marker'),
        details: summarizeEvents.MarkerRecorded(e.details)
      })
    } else if (e.eventType === 'WorkflowExecutionSignaled') {
      add({
        id: 'signal' + e.eventId,
        className: 'signal',
        eventIds: [e.eventId],
        start: moment(e.timestamp),
        content: 'Workflow Signaled',
        details: {
          input: e.details.input,
        }
      })
    } else if (e.eventType === 'SignalExternalWorkflowExecutionInitiated') {
      add({
        id: 'extsignal' + e.eventId,
        className: 'external-signal',
        eventIds: [e.eventId],
        start: moment(e.timestamp),
        ongoing: true,
        content: 'External Workflow Signaled',
        details: summarizeEvents.SignalExternalWorkflowExecutionInitiated(e.details)
      })
    } else if (e.eventType === 'ExternalWorkflowExecutionSignaled') {
      let initiatedEvent = hash[`extsignal${e.eventId}`]
      if (initiatedEvent) {
        initiatedEvent.eventIds.push(e.eventId)
        assignEnd(item, e.timestamp)
      }
    } else if (e.eventType === 'DecisionTaskFailed' || e.eventType === 'DecisionTaskTimedOut') {
      add({
        id: 'decision' + e.eventId,
        className: 'decision ' + e.eventType.replace('DecisionTask', '').toLowerCase(),
        eventIds: [e.eventId],
        start: moment(e.timestamp),
        content: e.eventType,
        details: e.details
      })
    }
  })

  return events
}