<template>
  <div class="timeline"></div>
</template>

<script>
import moment from 'moment'
import shortName from '../../short-name'
import { DataSet, Timeline } from 'vis/index-timeline-graph2d'

export default {
  props: ['events', 'selectedEventId'],
  data() {
    return {}
  },
  methods: {
    initIfNeeded() {
      if (!this.timeline && this.items.length && this.$el) {
        this.timeline = new Timeline(this.$el, this.items, null, {
          maxHeight: 350,
          locale: 'en_US'
        })
        this.timeline.on('select', e => {
          var selectedItem = this.items.get(e.items[0])
          if (selectedItem && selectedItem.eventIds) {
            this.dontFocus = true
            this.$router.replaceQueryParam('eventId', selectedItem.eventIds[selectedItem.eventIds.length - 1])
          }
        })
        this.$watch('selectedEventId', sid => {
          var selectedEvent = this.findEvent(this.selectedEventId)
          this.timeline.setSelection(selectedEvent && selectedEvent.id)
          if (selectedEvent && !this.dontFocus) {
            this.timeline.focus(selectedEvent.id, true)
          }
          this.dontFocus = false
        }, { immediate: true })
      }
    },
    findEvent(eventId) {
      return this.items.get().find(i => i.eventIds && i.eventIds.some(id => id === eventId))
    }
  },
  created() {
    this.items = new DataSet()
    this.$watch('events', () => {
      this.events.forEach(e => {
        if (e.eventType.startsWith('ActivityTask')) {
          let scheduledEvent = 'activityId' in e.details ? e : this.events[e.details.scheduledEventId - 1],
              activityId = scheduledEvent.details.activityId,
              item = this.items.get('activity' + activityId)

          if (!item) {
            item = {
              id: 'activity' + activityId,
              eventIds: [e.eventId],
              start: moment(scheduledEvent.timestamp),
              content: `Activity ${activityId} - ${shortName(scheduledEvent.details.activityType && scheduledEvent.details.activityType.name)}`
            }
            this.items.add(item)
          } else {
            item.eventIds.push(e.eventId)
          }

          if (e.eventType !== 'ActivityTaskScheduled' && e.eventType !== 'ActivityTaskStarted') {
            if (item.start.isBefore(e.timestamp, 'second')) {
              item.end = moment(e.timestamp)
            }
            item.className = e.eventType.replace('ActivityTask', '').toLowerCase()
          }
          this.items.update(item)
        } else if (e.eventType.includes('ChildWorkflowExecution')) {
          let initiatedEvent = 'initiatedEventId' in e.details ? this.events[e.details.initiatedEventId - 1] : e,
              initiatedEventId = initiatedEvent.eventId,
              item = this.items.get('childWf' + initiatedEventId)

          if (!item) {
            item = {
              id: 'childWf' + initiatedEventId,
              eventIds: [e.eventId],
              start: moment(initiatedEvent.timestamp),
              content: `Child ${shortName(e.details.workflowType.name)}`
            }
            this.items.add(item)
          } else {
            item.eventIds.push(e.eventId)
          }

          if (e.eventType !== 'StartChildWorkflowExecutionInitiated' && e.eventType !== 'ChildWorkflowExecutionStarted') {
            if (item.start.isBefore(e.timestamp, 'second')) {
              item.end = moment(e.timestamp)
            }
            item.className = e.eventType.replace('ChildWorkflowExecution', '').toLowerCase()
          }
          this.items.update(item)
        } else if (e.eventType === 'TimerStarted') {
          this.items.add({
            id: 'timer' + e.details.timerId,
            className: 'timer',
            eventIds: [e.eventId],
            start: moment(e.timestamp),
            end: moment(e.timestamp).add(e.details.startToFireTimeoutSeconds, 'seconds'),
            content: `Timer ${e.details.timerId} (${moment.duration(e.details.startToFireTimeoutSeconds, 'seconds').format()})`
          })
        } else if (e.eventType === 'TimerFired') {
          let timerStartedEvent = this.items.get(`timer${e.details.timerId}`)
          if (timerStartedEvent) {
            timerStartedEvent.eventIds.push(e.eventId)
          }
        }
      })
      this.initIfNeeded()
    }, { immediate: true })
  },
  mounted() {
    this.initIfNeeded()
  }
}
</script>

<style lang="stylus">
@require "../../styles/definitions.styl"
@require "../../../node_modules/vis/dist/vis.css"

item-color(color, alphapct)
  border-color color
  background-color alpha(color, alphapct)
  &.vis-selected
    background-color color
    color white

item-state-color(alphapct)
  item-color(primary-color, alphapct)
  &.completed
    item-color(uber-green, alphapct)
  &.failed
    item-color(uber-orange, alphapct)
  &.timedout
    item-color(uber-black-60, alphapct)
  &.cancelled, &.canceled
    item-color(uber-black-90, alphapct)
    .vis-item-content
      text-decoration-line line-through

div.timeline
  padding 0 10px
  margin-bottom inline-spacing-medium

  .vis-item
    border-color primary-color
    &.vis-selected
      box-shadow 2px 2px 2px rgba(0,0,0,0.3)
    &.vis-box
      item-state-color(10%)
    &.vis-range
      item-state-color(25%)

    &.timer
      border-top none
      border-bottom none
      background none
      border-left-width 2px
      border-right-width 2px
      .vis-item-visible-frame
        position absolute
        top 50%
        left 0
        height 3px
        width 100%
        opacity 0.4
        z-index -1
        background-position 0 5px
        background-size 20px 1px
        background-image linear-gradient(90deg, uber-blue-60, uber-blue-60 75%, transparent 75%, transparent 100%)

</style>