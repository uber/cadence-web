<script>
import moment from 'moment';
import { getKeyValuePairs, shortName } from '../../helpers';

const titlesForGroups = {
  ActivityTaskScheduled: n =>
    `Activity ${n.details.activityId} - ${shortName(
      n.details.activityType && n.details.activityType.name
    )}`,
  TimerStarted: n =>
    `Timer ${n.details.timerId} (${moment
      .duration(n.details.startToFireTimeoutSeconds, 'seconds')
      .format()})`,
  StartChildWorkflowExecutionInitiated: (n, h) => {
    const childWf =
      n.children[0] &&
      n.children[0].details &&
      n.children[0].details.workflowExecution;
    const name = shortName(n.details.workflowType.name);

    return childWf
      ? [
          'Child Workflow ',
          h(
            'router-link',
            {
              props: {
                to: {
                  name: 'execution/summary',
                  params: {
                    runId: childWf.runId,
                    workflowId: childWf.workflowId,
                  },
                },
              },
            },
            name
          ),
        ]
      : `Child Workflow ${name}`;
  },
};
const groupEvents = Object.keys(titlesForGroups);

function findActiveGroupNode(node, id, topLevel) {
  if (node.eventId === id) {
    return node;
  }

  if (!topLevel && groupEvents.includes(node.eventType)) {
    return null;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const c of node.children) {
    const activeChild = findActiveGroupNode(c, id);

    if (activeChild) {
      return activeChild;
    }
  }

  return null;
}

function titleForNode(n) {
  return n.eventType.replace(
    /(ActivityTask|ChildWorkflowExecution|StartChildWorkflowExecution)/,
    ''
  );
}

export default {
  name: 'event-node',
  props: ['node'],
  render(h) {
    const activeId = this.$route.query.eventId;
    const router = this.$router;

    function eventNode(node, noGroup) {
      const groupTitle =
        node.eventType in titlesForGroups &&
        titlesForGroups[node.eventType](node, h);
      const isActive = activeId === node.eventId;
      const showDetails = activeId && (!!groupTitle || (isActive && noGroup));
      const activeGroupNode =
        showDetails && findActiveGroupNode(node, activeId, true);
      const detailsList =
        activeGroupNode &&
        h('details-list', {
          props: {
            item: {
              kvps: getKeyValuePairs(activeGroupNode.details),
            },
            title: groupTitle || node.eventType,
          },
        });

      return h(
        groupTitle ? 'div' : 'span',
        {
          class: `event-node ${node.eventType}${
            activeGroupNode ? ' active' : ''
          }`,
        },
        [
          groupTitle && h('span', { class: 'group-title' }, groupTitle),
          h(
            'a',
            {
              attrs: {
                href: '#',
                'data-event-id': node.eventId,
              },
              class: `event-id${isActive ? ' active' : ''}`,
              on: {
                click: e => {
                  e.preventDefault();
                  router.replaceQueryParam('eventId', node.eventId);
                },
              },
            },
            [titleForNode(node)]
          ),
          !groupTitle && detailsList,
          h(
            'span',
            {
              class: 'event-children',
            },
            node.children.map(c => eventNode(c, noGroup && !groupTitle))
          ),
          groupTitle && detailsList,
        ]
      );
    }

    return eventNode(this.node, true);
  },
};
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
