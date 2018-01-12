<template>
  <section :class="{ history: true, loading: loading }">
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
      <a href="#" class="export" v-show="this.results && this.results.length" @click="exportResults">Export</a>
    </header>
    <header class="actions">
      <label for="workflowId">View Format</label>
      <div class="view-formats">
        <a href="#" class="compact" @click.prevent="setFormat('compact')" :class="format === 'compact' ? 'active' : ''">Compact</a>
        <a href="#" class="grid" @click.prevent="setFormat('grid')" :class="format === 'grid' ? 'active' : ''">Grid</a>
        <a href="#" class="json" @click.prevent="setFormat('json')" :class="format === 'json' ? 'active' : ''">JSON</a>
      </div>
    </header>
    <section class="results"
      v-infinite-scroll="nextPage"
      infinite-scroll-disabled="disableInfiniteScroll"
      infinite-scroll-distance="20"
      infinite-scroll-immediate-check="true"
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
      pagedQueryUrl: undefined,
      get queryUrl() {
        var
          domain = vm.$route.params.domain,
          q = vm.$route.query || {}

        if (!q.workflowId || !q.runId) return ''
        return `/api/domain/${domain}/workflows/history/${encodeURIComponent(q.workflowId)}/${encodeURIComponent(q.runId)}`
      }
    }
  },
  props: ['format'],
  created() {
    this.$watch(() => {
      if (!this.nextPageToken) return this.queryUrl
      return this.queryUrl + '?nextPageToken=' + encodeURIComponent(this.nextPageToken)
    }, v => this.pagedQueryUrl = v, { immediate: true })

    this.$watch('queryUrl', (v, old) => {
      this.prevResults = []
      this.nextPageToken = undefined
    })
  },
  computed: {
    hierarchialResults() {
      const rank = {
        scheduled: -1,
        started: 1
      }, hash = {}, hierarchy = []

      if (Array.isArray(this.results)) {
        this.results.forEach(r => {
          hash[r.eventId] = r
          Object.defineProperty(r, 'children', {
            value: []
          })
        })

        for (let r of this.results) {
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
        }
      }

      return hierarchy
    }
  },
  methods: {
    fetch(what) {
      if (!this.pagedQueryUrl) return
      this.loading = true
      this.error = undefined

      return this.$http(this.pagedQueryUrl).then(res => {
        this.npt = res.nextPageToken
        this.loading = false
        this.prevResults = (this.prevResults || []).concat(res.history.events.map(data => {
          data.timestamp = moment(data.timestamp)
          return data
        }))

        return this.prevResults
      }).catch(e => {
        this.npt = undefined
        this.loading = false
        this.error = (e.json && e.json.message) || e.status || e.message
        return []
      })
    },
    exportResults(e) {
      if (!this.results || !this.results.length || !this.$route.query) return

      var downloadEl = document.createElement('a')
      downloadEl.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.results)))
      downloadEl.setAttribute('download',
        `${this.$route.query.workflowId.replace(/[\\~#%&*{}\/:<>?|\"-]/g, ' ')} - ${this.$route.query.runId}.json`)

      downloadEl.style.display = 'none'
      document.body.appendChild(downloadEl)

      downloadEl.click()

      document.body.removeChild(downloadEl)
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
  header
    padding inline-spacing-large
    a
      action-button()
    .field
      flex 1 1 auto
    .view-formats
      display flex
      a
        flex 0 0 auto
        margin 0
        text-transform none
        &.active
          background-color darken(uber-blue, 20%)

  paged-grid()

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