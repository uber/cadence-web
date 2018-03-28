<template>
  <section :class="{ history: true, loading, 'has-results': !!this.results.length }">
    <header>
      <div class="criteria" v-if="editing">
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
      </div>
      <dl v-if="!editing">
        <div class="workflow-name" v-if="results[0]">
          <dt>Workflow Name</dt>
          <dd>{{results[0].details.workflowType.name}}</dd>
        </div>
        <div class="started-at" v-if="results[0]">
          <dt>Started At</dt>
          <dd>{{results[0].timestamp.format('llll')}}</dd>
        </div>
        <div class="workflow-status" v-if="results[0]">
          <dt>Status</dt>
          <dd><bar-loader v-if="isWorkflowRunning" /> {{workflowStatus()}}</dd>
        </div>
        <div class="workflow-id" v-if="false">
          <dt>Workflow Id</dt>
          <dd>{{$route.query.workflowId}}</dd>
        </div>
        <div class="run-id">
          <dt>Run Id</dt>
          <dd>{{$route.query.runId}}</dd>
        </div>
        <div class="started-at" v-if="results[0]">
          <dt>Task List</dt>
          <dd>{{results[0].details.taskList.name}}</dd>
        </div>
      </dl>
      <div class="workflow-input" v-if="results[0]">
        <pre>{{fmtInput()}}</pre>
      </div>
      <nav>
        <a href="" class="history router-link-active">History</a>
        <a href="" class="pollers">Pollers</a>
        <a href="" class="stack-trace">Stack Trace</a>
      </nav>
    </header>
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
          <tr v-for="he in results" :data-event-type="he.eventType">
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
      editing: !this.$route.query.workflowId || !this.$route.query.runId,
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
    }/*,
    headerProps() {
      var execStarted = this.results[0]
      if (!execStarted || !execStarted.details) {
        return []
      }

      return [{
        name: 'Workflow Name',
        value: execStarted.details.workflowType.name
      }, {
        name: 'Started At',
        value: moment(execStarted.ts).format('lll')
      }, {
        name: 'Started At',
        value: moment(execStarted.ts).format('lll')
      }]
    }*/
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

      if (typeof Mocha === 'undefined') {
        downloadEl.click()
        document.body.removeChild(downloadEl)
      }
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
    },
    workflowStatus() {
      if (!this.results.length) return ''
      if (this.isWorkflowRunning) return 'Running'

      var lastEventType = this.results[this.results.length - 1].eventType
      if (!lastEventType || !lastEventType.startsWith('WorkflowExecution')) {
        return 'Unknown'
      }
      return lastEventType.replace('WorkflowExecution', '')
    },
    fmtInput() {
      try {
        return atob(this.results[0].details.input)
      } catch(e) {
        return (this.results[0] && results[0].details.input) || ''
      }
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
    flex-wrap wrap
    .field
      flex 1 1 auto
    &.controls
      justify-content space-between
      & > div
        display flex
        align-items center
        & > *
          margin inline-spacing-small
  > header:first-child
    background-color uber-black
    color base-ui-color
    padding 0 inline-spacing-large
    dl
      display flex
      flex-wrap wrap
      & > div
        margin 0.3em 0.5em
        flex 3 3 auto
        &.run-id
          flex 1 1 auto
        dt, dd
          display block
        dt
          text-transform uppercase
          font-size 11px
          color uber-black-60
        dd
          one-liner-ellipsis()
          line-height 1.3em
          font-size 16px
    .workflow-input
      superlabel()
      margin-top 0.5em
      flex 1 1 auto
      min-width 0
      &::before
        top (1 - inline-spacing-small)
        left inline-spacing-small
        content 'input'
      pre
        margin inline-spacing-small
        padding inline-spacing-small
        border 1px solid uber-black-60
        background-color uber-black-80
        max-height 90px
    nav
      display flex
      width 100%
      margin 1em 0 0 0
      a
        text-transform uppercase
        padding 12px 16px
        border-bottom 4px solid transparent
        font-weight 500
        &.router-link-active
          border-bottom 4px solid uber-blue
        &:hover, &.router-link-active
          color uber-blue

  header.controls
    padding inline-spacing-large
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
  a.stack-trace
    icon-trips()
  a.history
    icon-history()
  a.pollers
    icon-cloud()

  section pre
    border 1px solid uber-black-60
    background-color uber-white-20
    overflow auto

  [data-modal="stack-trace"] pre
    padding inline-spacing-small
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
    tr[data-event-type*="Failed"] td
      &:first-child, &:nth-child(2)
        color uber-orange
  section.results pre
    margin layout-spacing-small
    padding layout-spacing-small
  .compact-view
    padding layout-spacing-small
    & > .event-node
      display block
</style>