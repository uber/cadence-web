<template>
  <section :class="{ queries: true, loading: queryLoading }">
    <header v-if="queries && queries.length">
      <div class="query-name">
        <v-select
          placeholder="Choose a Query"
          :value="queryName"
          :options="queries"
          :on-change="setQuery"
          :searchable="false"
        />
      </div>
      <a :href="queryName && !running ? '#' : undefined" :class="{ run: true, running }" @click.prevent="run">Run</a>
    </header>
    <pre v-if="queryResult">{{queryResult}}</pre>
    <span class="error" v-if="queryError">{{queryError}}</span>
    <span class="no-queries" v-if="queries && queries.length === 0">No queries registered</span>
  </section>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      queryLoading: false,
      queryName: undefined,
      queryInput: undefined,
      queries: undefined,
      queryResult: undefined,
      queryError: undefined,
      running: false
    }
  },
  props: [
    'baseAPIURL',

    // unused props but need to be declaired otherwise automatically injected into dom
    'error',
    'events',
    'input',
    'isWorkflowRunning',
    'loading',
    'parentWorkflowRoute',
    'result',
    'timelineEvents',
    'wfStatus',
    'workflow',
  ],
  created() {
    this.queryLoading = true
    this.$http(this.baseAPIURL + '/queries').then(
      r => {
        this.queries = r.filter(r => r !== '__stack_trace')
        if (!this.queryName) {
          this.queryName = this.queries[0]
        }
      },
      e => this.queryError = (e.json && e.json.message) || e.status || e.message
    ).finally(() => this.queryLoading = false)
  },
  methods: {
    setQuery(queryName) {
      this.queryResult = undefined
      this.queryError = undefined
      this.queryName = queryName
    },
    run() {
      this.running = true
      this.$http.post(`${this.baseAPIURL}/queries/${this.queryName}`)
        .then(r => this.queryResult = r.queryResult, e => this.queryError = (e.json && e.json.message) || e.status || e.message)
        .finally(() => this.running = false)
    }
  }
}
</script>

<style lang="stylus">
@require "../../styles/definitions.styl"

section.queries
  padding layout-spacing-small
  header
    display flex
    padding-top layout-spacing-small
    margin-bottom layout-spacing-medium
    align-items center
    .query-name
      flex 0 0 auto
      min-width 350px
      superlabel()
      &::before
        top -16px
        content 'query'
    a.run
      flex 0 0 auto
      margin 0 1em
      action-button()
      icon-play()
      &:not([href="#"])
        opacity 0.7
      &.running
        icon-refresh()

  span.no-queries
    display block
    width 100%
    text-align center
    font-size 16px
    color uber-black-60
</style>