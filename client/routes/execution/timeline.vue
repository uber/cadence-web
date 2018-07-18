<template>
  <div class="timeline"></div>
</template>

<script>
import moment from 'moment'
import shortName from '../../short-name'
import summarizeEvents from './summarize-events'
import { DataSet, Timeline, timeline } from 'vis/index-timeline-graph2d'

if (navigator.language === 'en-US') {
  timeline.TimeStep.FORMAT.minorLabels.minute = 'h:mm a'
  timeline.TimeStep.FORMAT.minorLabels.hour = 'h:mm a'
  timeline.TimeStep.FORMAT.majorLabels.millisecond = 'h:mm:ss a'
  timeline.TimeStep.FORMAT.majorLabels.second = 'D MMMM h:mm a'
  timeline.TimeStep.FORMAT.majorLabels.minute = 'ddd MMMM Do'
  timeline.TimeStep.FORMAT.majorLabels.hour = 'ddd MMMM Do'
}

export default {
  props: ['events', 'selectedEventId'],
  data() {
    return { margin: 10, minHeight: 50 }
  },
  methods: {
    heightOption() {
      var height = this.$el.parentElement.offsetHeight - this.margin
      if (height <= this.minHeight) {
        var parentMaxHeightStr = getComputedStyle(this.$el.parentElement)['max-height'],
            parentMaxHeight = Number(parentMaxHeightStr.substr(0, parentMaxHeightStr.length - 2))

        if (parentMaxHeight >= this.minHeight) {
          return { maxHeight: parentMaxHeight }
        }
      }
      return { height: Math.max(height || 0, this.minHeight), maxHeight: 'initial' }
    },
    initIfNeeded() {
      if (!this.timeline && this.items.length && this.$el) {
        this.timeline = new Timeline(this.$el, this.items, null, Object.assign({
          verticalScroll: true
        }, this.heightOption()))

        let dontFocus
        this.timeline.on('select', e => {
          var selectedItem = this.items.get(e.items[0])
          if (selectedItem && selectedItem.eventIds) {
            dontFocus = true
            this.$router.replaceQueryParam('eventId', selectedItem.eventIds[selectedItem.eventIds.length - 1])
          }
        })

        this.$watch('selectedEventId', sid => {
          var selectedEvent = this.findEvent(this.selectedEventId)
          this.timeline.setSelection(selectedEvent && selectedEvent.id)
          if (selectedEvent && !dontFocus) {
            this.timeline.focus(selectedEvent.id, true)
          }
          dontFocus = false
        }, { immediate: true })
      }
    },
    findEvent(eventId) {
      return this.items.get().find(i => i.eventIds && i.eventIds.some(id => id === eventId))
    }
  },
  created() {
    this.onResize = () => {
      if (this.timeline) {
        this.timeline.setOptions(this.heightOption())
        this.timeline.redraw()
      }
    }

    this.items = new DataSet()
    this.$watch('events', () => {
      var newIds = new DataSet(this.events).getIds(),
          removed = this.items.getIds().filter(i => !newIds.includes(i))
      this.items.update(this.events)
      this.items.remove(removed)
      this.initIfNeeded()
    }, { immediate: true })
  },
  mounted() {
    this.initIfNeeded()
    window.addEventListener('resize', this.onResize)
    this.ongoingUpdater = setInterval(() => {
      this.items.forEach(i => {
        if (i.ongoing) {
          i.end = moment()
          this.items.update(i)
        }
      })
    }, 50)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    clearInterval(this.ongoingUpdater)
  }
}
</script>

<style lang="stylus">
@require "../../styles/definitions.styl"
@require "../../styles/vis.styl"

div.timeline
  padding 0 10px
  margin-bottom inline-spacing-medium

  .vis-item
    border-color primary-color
    &.vis-selected
      box-shadow 2px 2px 2px rgba(0,0,0,0.3)
    &.vis-box
      history-item-state-color(10%)
    &.vis-range
      history-item-state-color(25%)

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

    &.marker
      border-color black

</style>