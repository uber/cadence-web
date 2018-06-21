<template>
  <div class="timeline"></div>
</template>

<script>
import moment from 'moment'
import shortName from '../../short-name'
import { DataSet, Timeline } from 'vis/index-timeline-graph2d'

export default {
  props: ['events'],
  data() {
    return {}
  },
  created() {
    this.items = new DataSet()
    this.$watch('events', () => {
      this.events.forEach(e => {
        if (e.eventType.startsWith('ActivityTask')) {
          var scheduledEvent = 'activityId' in e.details ? e : this.events[e.details.scheduledEventId - 1],
              activityId = scheduledEvent.details.activityId,
              item = this.items.get('activity' + activityId)

          if (!item) {
            item = {
              id: 'activity' + activityId,
              start: moment(scheduledEvent.timestamp),
              content: `Activity ${activityId} - ${shortName(scheduledEvent.details.activityType && scheduledEvent.details.activityType.name)}`
            }
            this.items.add(item)
          } else if (e.eventType !== 'ActivityTaskScheduled' && e.eventType !== 'ActivityTaskStarted' && item.start.isBefore(e.timestamp, 'second')) {
            this.items.update(item)
          }
        } else if (e.eventType === 'TimerStarted') {
          this.items.add({
            id: 'timer' + e.details.timerId,
            start: moment(e.timestamp),
            end: moment(e.timestamp).add(e.details.startToFireTimeoutSeconds, 'seconds'),
            content: `Timer ${e.details.timerId} (${moment.duration(e.details.startToFireTimeoutSeconds, 'seconds').format()})`
          })
        }
      })
      console.log('events updated!')
    }, { immediate: true })
  },
  mounted() {
    this.timeline = new Timeline(this.$el, this.items, null, {
      maxHeight: 350,
      locale: 'en_US'
    })
  }
}
</script>

<style lang="stylus">
@require "../../styles/definitions.styl"
@require "../../../node_modules/vis/dist/vis.css"

div.timeline
  padding 0 10px
  margin-bottom inline-spacing-medium
</style>