<template>
  <section :class="{ history: true, loading, 'has-results': !!this.results.length }">
    <header class="criteria">
      <div class="field workflow-id">
        <input type="text"
          placeholder=" "
          name="workflowId"
          v-bind:value="$route.query.workflowId"
          @input="debouncedSetQuery" />
          <label for="workflowId">Workflow ID</label>
      </div>
      <div class="field run-id">
        <input type="text"
          placeholder=" "
          name="runId"
          v-bind:value="$route.query.runId"
          @input="debouncedSetQuery" />
          <label for="runId">Run ID</label>
      </div>
    </header>
    <header class="controls">
      <div class="view-format">
        <label for="format">View Format</label>
        <div class="view-formats">
          <a href="#" class="compact" @click.prevent="setFormat('compact')" :class="format === 'compact' ? 'active' : ''">Compact</a>
          <a href="#" class="grid" @click.prevent="setFormat('grid')" :class="format === 'grid' ? 'active' : ''">Grid</a>
          <a href="#" class="json" @click.prevent="setFormat('json')" :class="format === 'json' ? 'active' : ''">JSON</a>
        </div>
        <span class="is-running" :data-is-running="JSON.stringify(isWorkflowRunning)"><bar-loader /></span>
      </div>
      <div class="actions">
        <a href="#" class="stack-trace" @click="viewStackTrace" v-if="isWorkflowRunning">Stack Trace</a>
        <a href="#" class="export" @click="exportResults">Export</a>
      </div>
    </header>
    <section class="results"
      v-infinite-scroll="nextPage"
      infinite-scroll-disabled="disableInfiniteScroll"
      infinite-scroll-distance="20"
      infinite-scroll-immediate-check="true"
      infinite-scroll-listen-for-event="longpoll"
      v-snapscroll
    >
      <table v-show="format === 'grid' && showTable">
        <thead>
          <th>ID</th>
          <th>Type</th>
          <th>Timestamp</th>
          <th>Elapsed</th>
          <th>Details</th>
        </thead>
        <tbody>
          <tr v-for="he in results">
            <td>{{he.eventId}}</td>
            <td>{{he.eventType}}</td>
            <td>{{he.timestamp.toISOString()}}</span>
            <td>{{elapsed(he.timestamp)}} </td>
            <td><details-list :item="he.details" /></td>
          </tr>
        </tbody>
      </table>
      <pre class="json" v-if="format === 'json'">{{JSON.stringify(results, null, 2)}}</pre>
      <div class="compact-view" v-if="format === 'compact'">
        <event-node v-for="hr in hierarchialResults" :node="hr" :key="hr.eventId" />
      </div>
    </section>
    <span class="error" v-if="error">{{error}}</span>
    <span class="no-results" v-if="showNoResults">No Results</span>
    <modal name="stack-trace">
      <header>
        <h2>Stack Trace</h2>
        <span v-if="stackTraceTimestamp">as of {{stackTraceTimestamp.format('lll')}}</span>
        <a href="#" class="close" @click="$modal.hide('stack-trace')"></a>
      </header>

      <pre v-if="typeof stackTrace === 'string'">{{stackTrace}}</pre>
      <span class="error" v-if="stackTrace && stackTrace.message">{{JSON.stringify(stackTrace)}}</span>
    </modal>
  </section>
</template>

<script>
import moment from 'moment'
import pagedGrid from '../paged-grid'
import eventNode from './event-node.vue'

export default pagedGrid({
  data() {
    var endTime = moment(), vm = this
    return {
      loading: false,
      error: undefined,
      nextPageToken: undefined,
      results: [],
      isWorkflowRunning: undefined,
      stackTrace: undefined,
      stackTraceTimestamp: undefined,
      get queryUrl() {
        var
          domain = vm.$route.params.domain,
          q = vm.$route.query || {}

        if (!q.workflowId || !q.runId) return ''
        return `/api/domain/${domain}/workflows/${encodeURIComponent(q.workflowId)}/${encodeURIComponent(q.runId)}/history?waitForNewEvent=true`
      }
    }
  },
  props: ['format'],
  created() {
    this.$watch(() => {
      if (!this.nextPageToken || !this.queryUrl) return this.queryUrl
      return this.queryUrl + '&nextPageToken=' + encodeURIComponent(this.nextPageToken)
    }, v => this.fetch(v), { immediate: true })

    this.$watch('queryUrl', (v, old) => {
      this.results = []
      this.nextPageToken = undefined
      this.isWorkflowRunning = undefined
    })
  },
  computed: {
    hierarchialResults() {
      const rank = {
        scheduled: -1,
        started: 1
      }, hash = {}, hierarchy = []

      this.results
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
    }
  },
  methods: {
    fetch(pagedQueryUrl) {
      this.error = undefined
      if (!pagedQueryUrl) {
        this.loading = false
        return
      }

      this.loading = true
      this.pqu = pagedQueryUrl
      return this.$http(pagedQueryUrl).then(res => {
        if (this._isDestroyed || this.pqu !== pagedQueryUrl) return
        if (res.nextPageToken && this.npt === res.nextPageToken) {
          // nothing happened, and same query is still valid, so let's long pool again
          return this.fetch(pagedQueryUrl)
        }

        if (res.nextPageToken) {
          this.npt = res.nextPageToken
          this.isWorkflowRunning = JSON.parse(atob(res.nextPageToken)).IsWorkflowRunning
        } else {
          this.isWorkflowRunning = false
        }
        this.loading = false
        this.results = this.results.concat(res.history.events.map(data => {
          data.timestamp = moment(data.timestamp)
          return data
        }))

        // https://github.com/ElemeFE/vue-infinite-scroll/issues/89
        setImmediate(() => this.$emit('longpoll'))
        return this.results
      }).catch(e => {
        if (this._isDestroyed || this.pqu !== pagedQueryUrl) return
        this.npt = undefined
        this.loading = false
        this.error = (e.json && e.json.message) || e.status || e.message
        return []
      })
    },
    exportResults(e) {
      if (!this.results.length || !this.$route.query) return

      var downloadEl = document.createElement('a')
      downloadEl.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.results)))
      downloadEl.setAttribute('download',
        `${this.$route.query.workflowId.replace(/[\\~#%&*{}\/:<>?|\"-]/g, ' ')} - ${this.$route.query.runId}.json`)

      downloadEl.style.display = 'none'
      document.body.appendChild(downloadEl)

      downloadEl.click()

      document.body.removeChild(downloadEl)
    },
    viewStackTrace() {
      var domain = this.$route.params.domain, q = this.$route.query || {}
      this.$http.post(`/api/domain/${this.$route.params.domain}/workflows/${encodeURIComponent(q.workflowId)}/${encodeURIComponent(q.runId)}/query/__stack_trace`).then(({ queryResult }) => {
        this.stackTrace = JSON.parse(atob(queryResult))
        this.stackTraceTimestamp = moment()
        this.$modal.show('stack-trace')
      }).catch(e => this.stackTrace = new Error(e))
    },
    setFormat(format) {
      this.$router.replace({
        query: Object.assign({}, this.$route.query, { format })
      })
    },
    elapsed(ts) {
      return moment.duration(ts - this.results[0].timestamp)
        .toString().toLowerCase()
        .replace(/[pt]/g, '')
        .replace(/([hmd])/g, '$1 ')
        .replace('0d ', '')
    }
  },
  components: {
    'event-node': eventNode
  }
})
</script>

<style lang="stylus">
@require "../styles/definitions.styl"

section.history
  > header
    padding inline-spacing-large
    flex-wrap wrap
    a
      action-button()
    .field
      flex 1 1 auto
    &.controls
      justify-content space-between
      & > div
        display flex
        align-items center
        & > *
          margin inline-spacing-small
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
  a.stack-trace
    icon-trips()

  [data-modal="stack-trace"]
    pre
      padding inline-spacing-small
      border 1px solid uber-black-60
      background-color uber-white-20
      flex 1 1 auto

  span.is-running
    &:not([data-is-running="true"]) loader.bar
      display none
    &::after
      vertical-align middle
    @media (min-width: 900px)
      &[data-is-running="true"]
        &::after
          content ' Workflow is executing...'
      &[data-is-running="false"]
        &::after
          content ' Workflow finished'

  table
    td:nth-child(3)
      one-liner-ellipsis()
  section.results pre
    margin layout-spacing-small
    padding layout-spacing-small
    border 1px solid uber-black-60
    background-color uber-white-40
    overflow auto
  .compact-view
    padding layout-spacing-small
    & > .event-node
      display block
</style>