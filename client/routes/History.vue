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
    <section class="results">
      <table v-show="showTable">
        <thead>
          <th>ID</th>
          <th>Type</th>
          <th>Time</th>
          <th>Details</th>
        </thead>
        <tbody>
          <tr v-for="he in results">
            <td>{{he.eventId}}</td>
            <td>{{he.eventType}}</td>
            <td>{{he.timestamp.format('lll')}}</td>
            <td><details-list :item="he.details" /></td>
          </tr>
        </tbody>
      </table>
    </section>
    <span class="error" v-if="error">{{error}}</span>
    <span class="no-results" v-if="showNoResults">No Results</span>
  </section>
</template>

<script>
import moment from 'moment'
import pagedGrid from '../paged-grid'
import detailList from '../widgets/detail-list.vue'

export default pagedGrid({
  data() {
    var endTime = moment()
    return {
      loading: false,
      error: undefined,
      nextPageToken: undefined
    }
  },
  computed: {
    criteria() {
      var
        domain = this.$route.params.domain,
        q = this.$route.query

      this.nextPageToken = undefined
      this.prevResults = []
      return {
        domain,
        workflowId: q.workflowId,
        runId: q.runId
      }
    }
  },
  methods: {
    fetch() {
      var
        q = Object.assign({}, this.criteria),
        domain = q.domain

      if (!q.workflowId || !q.runId) return

      this.loading = true
      this.error = undefined
      delete q.domain

      return this.$http(`/api/domain/${domain}/workflows/history/${encodeURIComponent(q.workflowId)}/${encodeURIComponent(q.runId)}`)
      .then(res => {
        this.npt = res.nextPageToken
        this.loading = false
        return this.prevResults = this.prevResults.concat(res.history.events.map(data => {
          data.timestamp = moment(data.timestamp)
          return data
        }))
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
    }
  },
  components: {
    'details-list': detailList
  }
})
</script>

<style lang="stylus">
@require "../styles/definitions.styl"

section.history
  .criteria
    padding inline-spacing-large
    .field
      flex 1 1 auto
    a
      action-button()

  paged-grid()
  
  table
    td:nth-child(3)
      one-liner-ellipsis()
</style>