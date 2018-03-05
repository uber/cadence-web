<script>
const titlesForGroups = {
  ActivityTaskScheduled: n => `Activity ${n.details.activityId} - ${n.details.activityType && n.details.activityType.name}`,
  StartChildWorkflowExecutionInitiated: n => `Child Workflow ${n.details.workflowType.name}`
},
groupEvents = Object.keys(titlesForGroups)


function findActiveGroupNode(parent, id, topLevel) {
  if (parent.eventId == id) return parent
  if (!topLevel && groupEvents.includes(parent.eventType)) return
  return parent.children.find(c => findActiveGroupNode(c, id))
}

function titleForNode(n) {
  return n.eventType.replace(/(ActivityTask|ChildWorkflowExecution|StartChildWorkflowExecution)/, '')
}

export default {
  name: 'event-node',
  props: ['node'],
  render(h) {
    var activeId = this.$route.query.eventId, router = this.$router

    function eventNode(node, noGroup) {
      var groupTitle = (node.eventType in titlesForGroups) && titlesForGroups[node.eventType](node),
      isActive = activeId == node.eventId,
      showDetails = activeId && (!!groupTitle || (isActive && noGroup)),
      activeGroupNode = showDetails && findActiveGroupNode(node, activeId, true),
      detailsList = activeGroupNode && h('details-list', { props: { item: activeGroupNode.details } })

      return h(groupTitle ? 'div' : 'span', {
        class: 'event-node ' + node.eventType + (activeGroupNode ? ' active' : '')
      }, [
        groupTitle && h('span', { class: 'group-title' }, groupTitle),
        h('a', {
          attrs: { href: '#', 'data-event-id': node.eventId },
          class: 'event-id' + (isActive ? ' active' : ''),
          on: { click: e => {
            e.preventDefault();
            router.replaceQueryParam('eventId', node.eventId) } }
        }, [titleForNode(node)]),
        !groupTitle && detailsList,
        h('span', { class: 'event-children' }, node.children.map(c => eventNode(c, noGroup && !groupTitle))),
        groupTitle && detailsList
      ])
    }

    return eventNode(this.node, true)
  }
}
</script>

<style lang="stylus">
@require "../styles/definitions.styl"

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
  &.ActivityTaskScheduled, &.TimerTaskScheduled, &.StartChildWorkflowExecutionInitiated
    position relative
    border input-border
    background-color uber-white-20
    padding 6px
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