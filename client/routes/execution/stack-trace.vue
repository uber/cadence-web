<template>
  <section :class="{ 'stack-trace': true, loading: stackTraceLoading }">
    <header v-if="stackTraceTimestamp">
      <span>Stack trace at {{stackTraceTimestamp.format('h:mm:ss a')}}</span>
      <a href="#" class="refresh" @click="getStackTrace">Refresh</a>
    </header>

    <pre v-if="typeof stackTrace === 'string'">{{stackTrace}}</pre>
    <span class="error" v-if="stackTrace && stackTrace.error">{{stackTrace.error}}</span>
  </section>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      stackTrace: undefined,
      stackTraceTimestamp: undefined,
      stackTraceLoading: undefined
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
    this.getStackTrace()
  },
  methods: {
    getStackTrace() {
      this.stackTraceLoading = true
      return this.$http.post(`${this.baseAPIURL}/queries/__stack_trace`).then(({ queryResult }) => {
        this.stackTrace = queryResult
        this.stackTraceTimestamp = moment()
      })
      .catch(e => {
        console.error(e)
        this.stackTrace = { error: (e.json && e.json.message) || e.status || e.message }
      })
      .finally(() => this.stackTraceLoading = false)
    }
  }
}
</script>

<style lang="stylus">
@require "../../styles/definitions.styl"

section.stack-trace
  padding layout-spacing-small
  header
    margin-bottom layout-spacing-medium
  a.refresh
    margin 0 1em
    action-button()
    icon-refresh()
</style>