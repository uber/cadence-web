<template>
  <section :class="{ history: true, loading, 'has-results': !!this.results.length }">
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
          <th>Elapsed</th>
          <th>Details</th>
        </thead>
        <tbody>
          <tr v-for="(he, i) in results" :data-event-type="he.eventType">
            <td>{{he.eventId}}</td>
            <td>{{he.eventType}}</td>
            <td>{{timeCol(he.timestamp, i)}} </td>
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
import pagedGrid from '../../paged-grid'
import eventNode from './event-node.vue'

export default pagedGrid({
  data() {
    var endTime = moment(), vm = this
    return {
      loading: false,
      error: undefined,
      nextPageToken: undefined,
      results: []
    }
  },
  props: ['format'],
  created() {
    this.$watch(() => {
      let queryUrl = this.$parent.baseAPIURL + '/history?waitForNewEvent=true'

      if (!this.nextPageToken) return queryUrl

      return queryUrl + '&nextPageToken=' + encodeURIComponent(this.nextPageToken)
    }, v => this.fetch(v), { immediate: true })
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
        this.error = (e.json && e.json.message) || e.status || e.message
        return []
      }).finally(() => this.loading = false)
    },
    exportResults(e) {
      if (!this.results.length || !this.$route.query) return

      var downloadEl = document.createElement('a')
      downloadEl.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.results)))
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
    timeCol(ts, i) {
      if (i === 0) {
        return ts.format('MMM Do h:mm:ss a')
      }

      let deltaFromPrev = moment.duration(ts - this.results[i - 1].timestamp),
          elapsed = moment.duration(ts - this.results[0].timestamp).format()

      if (deltaFromPrev.asSeconds() >= 1) {
        elapsed += ` (+${deltaFromPrev.format()})`
      }
      return elapsed
    }
  },
  components: {
    'event-node': eventNode
  }
})
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