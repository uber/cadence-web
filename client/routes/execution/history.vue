<template>
  <section :class="{ history: true, loading: $parent.historyLoading, 'has-results': !!$parent.results.length }">
    <header class="controls">
      <div class="view-format">
        <label for="format">View Format {{this.$parent.results.length}} {{this.$parent.historyLoading}}</label>
        <div class="view-formats">
          <a href="#" class="compact" @click.prevent="setFormat('compact')" :class="format === 'compact' ? 'active' : ''">Compact</a>
          <a href="#" class="grid" @click.prevent="setFormat('grid')" :class="format === 'grid' ? 'active' : ''">Grid</a>
          <a href="#" class="json" @click.prevent="setFormat('json')" :class="format === 'json' ? 'active' : ''">JSON</a>
        </div>
      </div>
      <div class="actions">
        <a href="#" class="export" @click="exportResults">Export</a>
      </div>
    </header>
    <section v-snapscroll class="results" ref="results">
      <table v-if="format === 'grid' && showTable">
        <thead>
          <th>ID</th>
          <th>Type</th>
          <th>
            <a class="elapsed" :href="tsFormat === 'elapsed' ? null : '#'" @click.prevent="setTsFormat('elapsed')">Elapsed</a> / 
            <a class="ts" :href="tsFormat === 'elapsed' ? '#' : null" @click.prevent="setTsFormat('ts')">Time</a>
          </th>
          <th>Details</th>
        </thead>
        <tbody>
          <tr v-for="(he, i) in $parent.results" :key="he.eventId" :data-event-type="he.eventType" :data-event-id="he.eventId" :class="{ active: he.eventId === $route.query.eventId }">
            <td><a href="#" @click.prevent="$router.replaceQueryParam('eventId', he.eventId)">{{he.eventId}}</a></td>
            <td>{{he.eventType}}</td>
            <td>{{timeCol(he.timestamp, i)}} </td>
            <td><details-list :item="he.details" /></td>
          </tr>
        </tbody>
      </table>
      <pre class="json" v-if="format === 'json'">{{JSON.stringify($parent.results, null, 2)}}</pre>
      <div class="compact-view" v-if="format === 'compact'">
        <event-node v-for="hr in hierarchialResults" :node="hr" :key="hr.eventId" />
      </div>
    </section>
    <span class="error" v-if="error">{{error}}</span>
    <span class="no-results" v-if="showNoResults">No Results</span>
  </section>
</template>

<script>
import moment from 'moment'
import eventNode from './event-node.vue'

export default {
  data() {
    return {
      error: undefined,
      nextPageToken: undefined,
      tsFormat: localStorage.getItem(`${this.$route.params.domain}:history-ts-col-format`) || 'elapsed'
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
            .filter(k => k)
            .sort((a, b) => (rank[b] || 0) - (rank[a] || 0))[0] + 'EventId',
          parentEventId = r.details[parentEventName]

          if (hash[parentEventId]) {
            hash[parentEventId].children.push(r)
          } else {
            hierarchy.push(r)
          }
          if (parentEventName in r.details && !hash[parentEventId]) {
            console.warn('referenced but not found: ' + parentEventId)
          }
        })

      return hierarchy
    },
    showTable() {
      return !this.$parent.historyError && (this.$parent.historyLoading || this.$parent.results.length)
    },
    showNoResults() {
      return !this.$parent.historyError && !this.$parent.historyLoading && this.$parent.results.length === 0
    }
  },
  methods: {
    exportResults(e) {
      if (!this.$parent.results.length || !this.$route.query) return

      var downloadEl = document.createElement('a')
      downloadEl.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.$parent.results)))
      downloadEl.setAttribute('download',
        `${this.$route.params.workflowId.replace(/[\\~#%&*{}\/:<>?|\"-]/g, ' ')} - ${this.$route.params.runId}.json`)

      downloadEl.style.display = 'none'
      document.body.appendChild(downloadEl)

      if (typeof Mocha === 'undefined') {
        downloadEl.click()
        document.body.removeChild(downloadEl)
      }
    },
    setFormat(format) {
      this.$router.replace({
        query: Object.assign({}, this.$route.query, { format })
      })
    },
    setTsFormat(tsFormat) {
      this.tsFormat = tsFormat
      localStorage.setItem(`${this.$route.params.domain}:history-ts-col-format`, tsFormat)
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
    'event-node': eventNode
  }
}
</script>

<style lang="stylus">
@require "../../styles/definitions.styl"

section.history
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
    border 1px solid uber-black-60
    background-color uber-white-20
    overflow auto

  table
    th a:not([href])
      border-bottom 1px solid black
    td:nth-child(3)
      one-liner-ellipsis()
    tr[data-event-type*="Started"] td:nth-child(2)
      color uber-blue-120
    tr[data-event-type*="Failed"]
      td:nth-child(2), [data-prop="reason"], [data-prop="details"]
        color uber-orange
    tr[data-event-type*="Completed"]
      td:nth-child(2), [data-prop="result"] dt
        color uber-green
    tr.active
      border 1px solid uber-black-60
      background-color alpha(uber-blue, 5%)
    pre
      max-height 15vh

  section.results pre.json
    margin layout-spacing-small
    padding layout-spacing-small
  .compact-view
    padding layout-spacing-small
    & > .event-node
      display block
</style>