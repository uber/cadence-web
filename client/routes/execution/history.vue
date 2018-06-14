<template>
  <section :class="{ history: true, loading: $parent.historyLoading, 'has-results': !!$parent.results.length }">
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
            :class="{ active: he.eventId === $route.query.eventId }"
             @click.prevent="$router.replaceQueryParam('eventId', he.eventId)"
          >
            <td>{{he.eventId}}</td>
            <td>{{he.eventType}}</td>
            <td>{{timeCol(he.timestamp, i)}} </td>
            <td><event-details :event="he" :compact="compactDetails && he.eventId != $route.query.eventId" :highlight="$parent.results.length < 100" /></td>
          </tr>
        </tbody>
      </table>
      <prism language="json" v-if="format === 'json' && $parent.results.length < 90">{{JSON.stringify($parent.results, null, 2)}}</prism>
      <pre class="json" v-if="format === 'json' && $parent.results.length >= 90">{{JSON.stringify($parent.results, null, 2)}}</pre>
      <div class="compact-view" v-if="format === 'compact'">
        <event-node v-for="hr in hierarchialResults" :node="hr" :key="hr.eventId" />
      </div>
    </section>
    <span class="error" v-if="$parent.historyError">{{$parent.historyError}}</span>
    <span class="no-results" v-if="showNoResults">No Results</span>
  </section>
</template>

<script>
import moment from 'moment'
import eventNode from './event-node.vue'
import eventDetails from './event-details.vue'
import Prism from 'vue-prism-component'

export default {
  data() {
    return {
      tsFormat: localStorage.getItem(`${this.$route.params.domain}:history-ts-col-format`) || 'elapsed',
      compactDetails: localStorage.getItem(`${this.$route.params.domain}:history-compact-details`) === 'true'
    }
  },
  props: ['format'],
  created() {
    this.$watch('format', this.scrollEventIntoView.bind(this)) 
  },
  computed: {
    hierarchialResults() {
      const rank = {
        scheduled: -1,
        started: 1
      }, hash = {}, hierarchy = []

      this.$parent.results
        .map(r => hash[r.eventId] = Object.assign({ children: [] }, r))
        .forEach(r => {
          let parentEventName = Object.keys(r.details || {})
            .map(k => (k.match(/(\S+)EventId/) || [])[1])
            .filter(k => k && k !== 'parentInitiated')
            .sort((a, b) => (rank[b] || 0) - (rank[a] || 0))[0] + 'EventId',
          parentEventId = r.details[parentEventName]

          if (hash[parentEventId]) {
            hash[parentEventId].children.push(r)
          } else {
            hierarchy.push(r)
          }
          if (parentEventName in r.details && !hash[parentEventId] && parentEventId !== 0) {
            console.warn(`referenced but not found: "${parentEventName}": ${parentEventId}`)
          }
        })

      return hierarchy
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
    scrollEventIntoView(eventId) {
      setTimeout(() => {
        var eventRow = this.$refs.results.querySelector(`[data-event-id="${this.$route.query.eventId}"]`)
        if (eventRow) {
          eventRow.scrollIntoView()
        }
      }, 100)
    }
  },
  components: {
    'event-node': eventNode,
    'event-details': eventDetails,
    'prism': Prism
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
        white-space nowrap
        max-width 50vw
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
    & > .event-node
      display block
</style>