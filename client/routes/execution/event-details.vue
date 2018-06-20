<script>
import moment from 'moment'
import shortName from '../../short-name'
import parentWorkflowLink from './parent-workflow-link'

const eventCompactTransforms = {
  WorkflowExecutionStarted: d => {
    var summary = {
      Parent: undefined,
      input: d.input,
      identity: d.identity,
      Workflow: shortName(d.workflowType.name),
      'Close Timeout': moment.duration(d.executionStartToCloseTimeoutSeconds, 'seconds').format()
    },
    wfLink = parentWorkflowLink(d)

    if (wfLink) {
      summary.Parent = { routeLink: wfLink.to, text: wfLink.text }
    }
    return summary
  },
  StartChildWorkflowExecutionInitiated: d => ({
    Workflow: shortName(d.workflowType.name),
    Tasklist: d.taskList.name,
    input: d.input
  }),
  ChildWorkflowExecutionStarted: d => ({
    Workflow: {
      routeLink: {
        name: 'execution/summary',
        params: {
          domain: d.domain,
          workflowId: d.workflowExecution.workflowId,
          runId: d.workflowExecution.runId
        }
      },
      text: `${shortName(d.workflowType.name)} - ${d.workflowExecution.workflowId}`
    }
  }),
  ChildWorkflowExecutionCompleted: d => ({
    Workflow: {
      routeLink: {
        name: 'execution/summary',
        params: {
          domain: d.domain,
          workflowId: d.workflowExecution.workflowId,
          runId: d.workflowExecution.runId
        }
      },
      text: shortName(d.workflowType.name)
    },
    result: d.result
  }),
  DecisionTaskScheduled: d => ({
    Tasklist: d.taskList.name,
    Timeout: moment.duration(d.startToCloseTimeoutSeconds, 'seconds').format()
  }),
  DecisionTaskStarted: d => ({ requestId: d.requestId }),
  DecisionTaskCompleted: d => ({ identity: d.identity }),
  DecisionTaskTimedOut: d => ({ 'Timeout Type': d.timeoutType }),
  ActivityTaskScheduled: d => ({
    ID: d.activityId,
    Name: shortName(d.activityType.name),
    input: d.input,
    'Close Timeout': moment.duration(d.scheduleToCloseTimeoutSeconds, 'seconds').format()
  }),
  ActivityTaskStarted: d => ({ identity: d.identity, requestId: d.requestId }),
  ActivityTaskCompleted: d => ({ result: d.result }),
  ActivityTaskTimedOut: d => ({ 'Timeout Type': d.timeoutType }),
  MarkerRecorded: d => {
    var details = d.details || {}
    if (d.markerName === 'LocalActivity') {
      let la = { 'Local Activity ID': details.ActivityID }
      if (details.ErrJSON) {
        la.Error = JSON.tryParse(details.ErrJSON) || details.ErrJSON
      }
      if (details.ErrReason) {
        la.reason = details.ErrReason
      }
      if (details.ResultJSON) {
        la.result = JSON.tryParse(details.ResultJSON) || details.ResultJSON
    }
      return la
    }
    if (d.markerName == 'Version') {
      return {
        Version: details[1],
        Details: details[0]
      }
    }
    if (d.markerName === 'SideEffect') {
      return {
        'Side Effect ID': details[0],
        data:  JSON.tryParse(atob(details[1])) || details[1]
      }
    }

    return d
  }
},

eventFullTransforms = {
  MarkerRecorded: d => {
    if (d.markerName === 'SideEffect') {
      return {
        sideEffectID: d.details[0],
        data:  JSON.tryParse(atob(d.details[1])) || d.details[1],
        decisionTaskCompletedEventId: d.decisionTaskCompletedEventId
      }
    }
    return d
  }
}

export default {
  name: 'event-details',
  props: ['event', 'compact', 'highlight'],
  render(h) {
    if (!this.event) return
    var maps = this.compact ? eventCompactTransforms : eventFullTransforms
    var item = this.event.eventType in maps ? maps[this.event.eventType](this.event.details) : this.event.details

    return h('details-list', {
      props: {
        item,
        highlight: this.highlight,
        compact: this.compact,
        title: `Event #${this.event.eventId} ${this.event.eventType}`
      }
    })
  }
}
</script>

<style lang="stylus">
@require "../../styles/definitions.styl"

.event-node
  font-size 16px
  line-height 1.5em
  span
    vertical-align top
  &.DecisionTaskCompleted, &.DecisionTaskStarted, &.DecisionTaskScheduled
    > .event-id
      display none
    > .event-children > div
      margin-left 0
  &.ActivityTaskScheduled, &.TimerStarted, &.StartChildWorkflowExecutionInitiated
    position relative
    border input-border
    background-color uber-white-20
    padding 6px
    &.active
      border-color uber-black-60
  a.event-id
    display inline-block
    border-bottom 2px solid transparent
    font-family monospace-font-family
    font-weight normal
    margin-right inline-spacing-large
    padding 3px
    &::after
      content attr(data-event-id)
      margin-left 1em
      font-size 10px
      color base-text-color
      background-color uber-white-20
      border input-border
      padding 3px
      vertical-align top
    &.active
      border-bottom-color uber-blue

  span.group-title
    display block

  .event-children
    > div
      margin-left layout-spacing-medium

  dl.details
    width 100%
    > div
      display block
    dd
      max-width initial
      overflow visible
      white-space normal
      word-wrap break-word
</style>