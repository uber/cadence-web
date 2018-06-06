<script>
import moment from 'moment'
import shortName from '../../short-name'
import parentWorkflowLink from './parent-workflow-link'

const eventOneLiners = {
  WorkflowExecutionStarted: d => {
    var summary = {
      Parent: undefined,
      input: d.input,
      identity: d.identity,
      Workflow: shortName(d.workflowType.name),
      'Close Timeout': moment.duration(d.executionStartToCloseTimeout, 'seconds').format()
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
  ActivityTaskScheduled: d => ({
    ID: d.activityId,
    Name: shortName(d.activityType.name),
    input: d.input,
    'Close Timeout': moment.duration(d.scheduleToCloseTimeoutSeconds, 'seconds').format()
  }),
  ActivityTaskStarted: d => ({ identity: d.identity, requestId: d.requestId }),
  ActivityTaskCompleted: d => ({ result: d.result })
}

export default {
  name: 'event-details',
  props: ['event', 'compact', 'highlight'],
  render(h) {
    if (!this.event) return
    var item = this.compact && this.event.eventType in eventOneLiners ? eventOneLiners[this.event.eventType](this.event.details) : this.event.details

    return h('details-list', {
      props: { item, highlight: this.highlight, compact: this.compact }
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