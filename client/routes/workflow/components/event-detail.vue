<script>
import { DetailList } from '~components';

export default {
  name: 'event-detail',
  props: ['event', 'compact', 'highlight'],
  components: {
    'detail-list': DetailList,
  },
  render(h) {
    if (!this.event) {
      return null;
    }

    return h('detail-list', {
      props: {
        item: this.event,
        highlight: this.highlight,
        compact: this.compact,
        title: `Event #${this.event.eventId} ${this.event.eventType}`,
      },
    });
  },
};
</script>

<style lang="stylus">
@require "../../../styles/definitions.styl"

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
