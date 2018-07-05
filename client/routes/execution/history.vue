<template>
  <section :class="{ history: true, loading: $parent.historyLoading, 'has-results': !!$parent.results.length, 'split-enabled': splitEnabled }">
    <header class="controls">
      <div class="view-format">
        <label for="format">View Format</label>
        <div class="view-formats">
          <a href="#" class="compact" @click.prevent="setFormat('compact')" :class="format === 'compact' ? 'active' : ''">Compact</a>
          <a href="#" class="grid" @click.prevent="setFormat('grid')" :class="format === 'grid' ? 'active' : ''">Grid</a>
          <a href="#" class="json" @click.prevent="setFormat('json')" :class="format === 'json' ? 'active' : ''">JSON</a>
        </div>
      </div>
      <div class="actions">
        <a class="export" :href="$parent.baseAPIURL + '/export'" :download="exportFilename">Export</a>
      </div>
    </header>

    <Split class="split-panel" direction="vertical" @onDragEnd="onSplitResize" @onDragStart="enableSplitting" v-if="!showNoResults && !$parent.historyError" ref="splitPanel">
      <SplitArea :size="splitSizes[0]">
        <timeline :events="timelineEvents" :selected-event-id="eventId" v-if="format !== 'json'" />
      </SplitArea>
      <SplitArea :size="splitSizes[1]">
        <section v-snapscroll class="results" ref="results">
          <table v-if="format === 'grid' && showTable" :class="{ compact: compactDetails }">
            <thead>
              <th>ID</th>
              <th>Type</th>
              <th>
                <a class="elapsed" :href="tsFormat === 'elapsed' ? null : '#'" @click.prevent="setTsFormat('elapsed')">Elapsed</a> /
                <a class="ts" :href="tsFormat === 'elapsed' ? '#' : null" @click.prevent="setTsFormat('ts')">Time</a>
              </th>
              <th>
                <a class="summary" :href="compactDetails ? null : '#'" @click.prevent="setCompactDetails(true)">Summary</a> /
                <a class="details" :href="compactDetails ? '#' : null" @click.prevent="setCompactDetails(false)">Full Details</a>
              </th>
            </thead>
            <tbody>
              <tr v-for="(he, i) in $parent.results"
                :key="he.eventId"
                :data-event-type="he.eventType"
                :data-event-id="he.eventId"
                :class="{ active: he.eventId === eventId }"
                @click.prevent="$router.replaceQueryParam('eventId', he.eventId)"
              >
                <td>{{he.eventId}}</td>
                <td>{{he.eventType}}</td>
                <td>{{timeCol(he.timestamp, i)}} </td>
                <td><event-details :event="he" :compact="compactDetails && he.eventId != eventId" :highlight="$parent.results.length < 100" /></td>
              </tr>
            </tbody>
          </table>
          <prism language="json" v-if="format === 'json' && $parent.results.length < 90">{{JSON.stringify($parent.results, null, 2)}}</prism>
          <pre class="json" v-if="format === 'json' && $parent.results.length >= 90">{{JSON.stringify($parent.results, null, 2)}}</pre>
          <div class="compact-view" v-if="format === 'compact'">
            <div v-for="te in timelineEvents" :key="te.id" :class="te.className + (te.eventIds.includes(eventId) ? ' active' : '')" @click.prevent="selectCompactEvent(te)">
              <span class="event-title">{{te.content}}</span>
              <details-list :item="te.details" :title="te.content" />
            </div>
          </div>
        </section>
      </SplitArea>
    </Split>

    <span class="error" v-if="$parent.historyError">{{$parent.historyError}}</span>
    <span class="no-results" v-if="showNoResults">No Results</span>
  </section>
</template>

<script>
import moment from 'moment'
import eventDetails from './event-details.vue'
import shortName from '../../short-name'
import Prism from 'vue-prism-component'
import timeline from './timeline.vue'
import summarizeEvents from './summarize-events'

export default {
  data() {
    return {
      tsFormat: localStorage.getItem(`${this.$route.params.domain}:history-ts-col-format`) || 'elapsed',
      compactDetails: localStorage.getItem(`${this.$route.params.domain}:history-compact-details`) === 'true',
      splitEnabled: false,
      splitSizes: [20, 80]
    }
  },
  props: ['format', 'eventId'],
  created() {
    this.$watch('format', this.scrollEventIntoView.bind(this, true))
    this.$watch('eventId', this.scrollEventIntoView.bind(this, false))
  },
  computed: {
    timelineEvents() {
      const events = [], hash = {},
      add = i => {
        hash[i.id] = i
        events.push(i)
        return i
      }

      this.$parent.results.forEach(e => {
        if (e.eventType.startsWith('ActivityTask')) {
          let scheduledEvent = 'activityId' in e.details ? e : this.$parent.results[e.details.scheduledEventId - 1],
              activityId = scheduledEvent.details.activityId,
              item = hash['activity' + activityId]

          if (!item) {
            item = add({
              id: 'activity' + activityId,
              eventIds: [e.eventId],
              start: moment(scheduledEvent.timestamp),
              content: `Activity ${activityId}: ${shortName(scheduledEvent.details.activityType && scheduledEvent.details.activityType.name)}`,
              details: {
                input: e.details.input
              }
            })
          } else {
            item.eventIds.push(e.eventId)
            if (e.eventType !== 'ActivityTaskStarted') {
              Object.assign(item.details, summarizeEvents[e.eventType](e.details))
            }
          }

          if (e.eventType !== 'ActivityTaskScheduled' && e.eventType !== 'ActivityTaskStarted') {
            if (item.start.isBefore(e.timestamp, 'second')) {
              item.end = moment(e.timestamp)
            }
            item.className = 'activity ' + e.eventType.replace('ActivityTask', '').toLowerCase()
          }
        } else if (e.eventType.includes('ChildWorkflowExecution')) {
          let initiatedEvent = 'initiatedEventId' in e.details ? this.$parent.results[e.details.initiatedEventId - 1] : e,
              initiatedEventId = initiatedEvent.eventId,
              item = hash['childWf' + initiatedEventId]

          if (!item) {
            item = add({
              id: 'childWf' + initiatedEventId,
              className: 'child-workflow',
              eventIds: [e.eventId],
              start: moment(initiatedEvent.timestamp),
              content: `Child Workflow: ${shortName(e.details.workflowType.name)}`,
              details: {
                input: e.details.input
              }
            })
          } else {
            item.eventIds.push(e.eventId)
            if (e.eventType in summarizeEvents) {
              let summary = summarizeEvents[e.eventType](e.details)
              if (!item.routeLink && summary.Workflow && summary.Workflow.routeLink) {
                item.routeLink = summary.Workflow.routeLink
              }
              Object.assign(item.details, )
            }
          }

          if (e.eventType !== 'StartChildWorkflowExecutionInitiated' && e.eventType !== 'ChildWorkflowExecutionStarted') {
            if (item.start.isBefore(e.timestamp, 'second')) {
              item.end = moment(e.timestamp)
            }
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
            content: 'External Workflow Signaled',
            details: summarizeEvents.SignalExternalWorkflowExecutionInitiated(e.details)
          })
        } else if (e.eventType === 'ExternalWorkflowExecutionSignaled') {
          let initiatedEvent = hash[`extsignal${e.eventId}`]
          if (initiatedEvent) {
            initiatedEvent.eventIds.push(e.eventId)
            if (item.start.isBefore(e.timestamp, 'second')) {
              item.end = moment(e.timestamp)
            }
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
    },
    showTable() {
      return !this.$parent.historyError && (this.$parent.historyLoading || this.$parent.results.length)
    },
    showNoResults() {
      return !this.$parent.historyError && !this.$parent.historyLoading && this.$parent.results.length === 0
    },
    exportFilename() {
      return `${this.$route.params.workflowId.replace(/[\\~#%&*{}\/:<>?|\"-]/g, ' ')} - ${this.$route.params.runId}.json`
    }
  },
  methods: {
    setFormat(format) {
      this.$router.replace({
        query: Object.assign({}, this.$route.query, { format })
      })
    },
    setTsFormat(tsFormat) {
      this.tsFormat = tsFormat
      localStorage.setItem(`${this.$route.params.domain}:history-ts-col-format`, tsFormat)
    },
    setCompactDetails(compact) {
      this.compactDetails = compact
      localStorage.setItem(`${this.$route.params.domain}:history-compact-details`, JSON.stringify(compact))
    },
    timeCol(ts, i) {
      if (i === 0 || this.tsFormat !== 'elapsed') {
        return ts.format('MMM Do h:mm:ss a')
      }

      let deltaFromPrev = moment.duration(ts - this.$parent.results[i - 1].timestamp),
          elapsed = moment.duration(ts - this.$parent.results[0].timestamp).format()

      if (deltaFromPrev.asSeconds() >= 1) {
        elapsed += ` (+${deltaFromPrev.format()})`
      }
      return elapsed
    },
    scrollEventIntoView(force, eventId) {
      setTimeout(() => {
        // TODO: fix this for the new compact view
        var eventRow = this.$refs.results.querySelector(`[data-event-id="${this.$route.query.eventId}"]`)
        if (eventRow) {
          if (eventRow.scrollIntoViewIfNeeded) {
            eventRow.scrollIntoViewIfNeeded()
          } else if (force) {
            eventRow.scrollIntoView()
          }
        }
      }, 100)
    },
    selectCompactEvent(i) {
      this.$router.replaceQueryParam('eventId', i.eventIds[i.eventIds.length - 1])
    },
    enableSplitting() {
      if (!this.splitEnabled) {
        var timelineHeightPct = (this.$refs.splitPanel.$el.firstElementChild.offsetHeight / this.$refs.splitPanel.$el.offsetHeight) * 100
        this.splitSizes = [timelineHeightPct, 100 - timelineHeightPct]
        console.dir(this.splitSizes.slice())
        this.splitEnabled = true
      }
    },
    onSplitResize(size) {
      this.$emit('redraw-timeline')
    }
  },
  components: {
    'event-details': eventDetails,
    'prism': Prism,
    timeline
  }
}
</script>

<style lang="stylus">
@require "../../styles/definitions.styl"

section.history
  brdr = 1px solid uber-black-60
  display flex
  flex-direction column
  flex 1 1 auto

  header.controls
    display flex
    flex-wrap wrap
    justify-content space-between
    padding inline-spacing-large
    flex 0 0 auto
    .field
      flex 1 1 auto
    & > div
      display flex
      align-items center
      & > *
        margin inline-spacing-small
    a
      action-button()
  .view-formats
    display flex
    a
      flex 0 0 auto
      margin 0
      text-transform none
      &.active
        background-color darken(uber-blue, 20%)

  paged-grid()

  &:not(.has-results) header .actions
    display none
  &.loading.has-results
    &::after
      content none

  a.export
    icon-download()

  &:not(.split-enabled) div.split-panel
    display flex
    flex-direction column
    flex 1
    .gutter
      flex 0 0 auto
    .split-vertical:first-child
      flex 0 0 auto
      max-height 350px
    .split-vertical:nth-child(3)
      flex 1
  &.split-enabled div.split-panel
    height calc(100vh - 188px)

  section pre
    border brdr
    overflow auto

  table
    th a:not([href])
      border-bottom 1px solid black
    td:nth-child(3)
      one-liner-ellipsis()
    tr[data-event-type*="Started"] td:nth-child(2)
      color uber-blue-120
    tr[data-event-type*="Failed"], tr[data-event-type*="TimedOut"]
      td:nth-child(2), [data-prop="reason"], [data-prop="details"]
        color uber-orange
    tr[data-event-type*="Completed"]
      td:nth-child(2), [data-prop="result"] dt
        color uber-green
    tr.active
      border-top brdr
      border-bottom brdr
      background-color alpha(uber-blue, 5%)
    pre
      max-height 15vh
    &.compact tr:not(.active)
      td:nth-child(4)
        overflow hidden
      dl.details
        max-width 50vw

  table.compact tr:not(.active), .compact-view > div:not(.active)
    dl.details
      white-space nowrap
      & > div
        display inline-block
        padding 0
        &:nth-child(2n)
          background none
      dt, dd
        display inline-block
        vertical-align middle
        margin 0 0.5em
      dt
        font-family primary-font-family
        font-weight 200
        text-transform uppercase
      pre
        display inline-block
        max-width 40vw
        one-liner-ellipsis()

  section.results > pre
    margin layout-spacing-small
    padding layout-spacing-small
  .compact-view
    padding layout-spacing-small
    line-height 1.5em
    .event-title
      padding 4px
      font-size 16px
    pre
      max-height 15vh

    & > div
      border 2px solid primary-color
      padding 6px
      margin-bottom layout-spacing-small
      history-item-state-color(3%)
      &.active
        box-shadow 2px 2px 2px rgba(0,0,0,0.3)
        dl.details dt
          display inline-block
          padding-top 5px
      dl.details dd
        max-width none

      @media (max-width: 1400px)
        &:not(.active) dl.details
          display none
      @media (min-width: 1400px)
        &:not(.active)
          display flex
          align-items center
          .event-title
            flex 0 0 400px
          dl.details
            flex 1
            align-items center
            overflow hidden
            pre
              max-width none
</style>