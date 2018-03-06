<template>
  <section :class="{ workflows: true, loading: loading }">
    <header class="filters">
      <div class="field">
        <input type="search" class="workflow-id"
          placeholder=" "
          name="workflowId"
          v-bind:value="$route.query.workflowId"
          @input="debouncedSetQuery" />
        <label for="workflowId">Workflow ID</label>
      </div>
      <div class="field workflow-name">
        <input type="search" class="workflow-name"
          placeholder=" "
          name="workflowName"
          v-bind:value="$route.query.workflowName"
          @input="debouncedSetQuery" />
        <label for="workflowName">Workflow Name</label>
      </div>
      <date-range-picker
        :date-range="range"
        @change="setRange"
      />
      <v-select
        class="status"
        :value="status"
        :options="statuses"
        :on-change="setStatus"
        :searchable="false"
      />
    </header>
    <section class="results"
      v-infinite-scroll="nextPage"
      infinite-scroll-disabled="disableInfiniteScroll"
      infinite-scroll-distance="20"
      infinite-scroll-immediate-check="false"
    >
      <table v-show="showTable">
        <thead>
          <th>Workflow ID</th>
          <th>Run ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Start Time</th>
          <th>End Time</th>
        </thead>
        <tbody>
          <tr v-for="wf in results">
            <td>{{wf.workflowId}}</td>
            <td><a :href="historyLinkFor(wf)">{{wf.runId}}</a></td>
            <td>{{wf.workflowName}}</td>
            <td :class="wf.status">{{wf.status}}</td>
            <td>{{wf.startTime}}</td>
            <td>{{wf.endTime}}</td>
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

export default pagedGrid({
  data() {
    var q = this.$route.query || {}
    return {
      loading: false,
      results: [],
      error: undefined,
      nextPageToken: undefined,
      statuses: [
        { value: 'OPEN', label: 'Open' },
        { value: 'CLOSED', label: 'Closed' },
        { value: 'COMPLETED', label: 'Completed' },
        { value: 'FAILED', label: 'Failed' },
        { value: 'CANCELED', label: 'Cancelled' },
        { value: 'TERMINATED', label: 'Terminated' },
        { value: 'CONTINUED_AS_NEW', label: 'Continued As New' },
        { value: 'TIMED_OUT', label: 'Timed Out'}
      ],
      range: {
        startDate: q.startDate ? moment(q.startDate) : moment().subtract(1, 'day').startOf('minute'),
        endDate: moment(q.startDate).startOf('minute')
      }
    }
  },
  created() {
    var q = this.$route.query || {}
    if (!q.startDate || !q.endDate) {
      this.setRange(this.range)
    }
    this.$watch('fetch', () => {}, { immediate: true })
  },
  computed: {
    status() {
      if (!this.$route.query || !this.$route.query.status) {
        return this.statuses[0]
      }
      return this.statuses.find(s => s.value === this.$route.query.status)
    },
    criteria() {
      var
        domain = this.$route.params.domain,
        q = this.$route.query

      this.nextPageToken = undefined
      return {
        domain,
        startTime: q.startTime,
        endTime: q.endTime,
        status: q.status,
        workflowId: q.workflowId,
        workflowName: q.workflowName
      }
    },
    fetch() {
      var
        q = Object.assign({}, this.criteria),
        domain = q.domain,
        state = (!q.status || q.status === 'OPEN') ? 'open' : 'closed'

      if (!q.startTime || !q.endTime || !q.status) return

      this.loading = true
      this.error = undefined
      q.nextPageToken = this.nextPageToken
      if (['OPEN', 'CLOSED'].includes(q.status)) {
        delete q.status
      }
      delete q.domain

      return this.$http(`/api/domain/${domain}/workflows/${state}`, { query: q })
      .then(res => {
        this.npt = res.nextPageToken
        this.loading = false
        var formattedResults = res.executions.map(data => ({
          workflowId: data.execution.workflowId,
          runId: data.execution.runId,
          workflowName: data.type.name,
          startTime: moment(data.startTime).format('lll'),
          endTime: data.closeTime ? moment(data.closeTime).format('lll') : '',
          status: (data.closeStatus || 'open').toLowerCase(),
        }))
        return this.results = q.nextPageToken ? this.results.concat(formattedResults) : formattedResults
      }).catch(e => {
        this.npt = undefined
        this.loading = false
        this.error = (e.json && e.json.message) || e.status || e.message
        return []
      })
    }
  },
  methods: {
    setStatus(status) {
      if (status) {
        this.$router.replace({
          query: Object.assign({}, this.$route.query, { status: status.value })
        })
      }
    },
    setRange(r) {
      if (r) {
        this.$router.replace({
          query: Object.assign({}, this.$route.query, {
            startTime: r.startDate.toISOString(),
            endTime: r.endDate.toISOString()
          })
        })
      }
    },
    historyLinkFor(wf) {
      return `/domain/${this.$route.params.domain}/history?workflowId=${encodeURIComponent(wf.workflowId)}&runId=${encodeURIComponent(wf.runId)}`
    }
  }
})
</script>

<style lang="stylus">
@require "../styles/definitions.styl"

section.workflows
  .filters
    flex-wrap wrap
    > .field
      flex 3 1 auto
    > .time-picker
      flex 1 1 340px
    .v-select
      flex 1 1 240px

  paged-grid()

  table
    td:nth-child(4)
      text-transform capitalize
      &.completed
        color uber-green
      &.failed
        color uber-orange
      &.open
        color uber-blue-120
    td:nth-child(5), td:nth-child(6)
      one-liner-ellipsis()
</style>