<template>
  <section :class="{ execution: true, loading: wfLoading }">
    <nav>
      <router-link :to="{ name: 'execution/summary' }" class="summary">Summary</router-link>
      <router-link :to="{ name: 'execution/history' }" class="history">History</router-link>
      <router-link :to="{ name: 'execution/stack-trace' }" class="stack-trace" v-show="isWorkflowRunning">Stack Trace</router-link>
    </nav>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  data() {
    var { domain, workflowId, runId } = this.$route.params
    return {
      workflow: undefined,
      input: undefined,
      error: undefined,
      baseAPIURL: `/api/domain/${domain}/workflows/${encodeURIComponent(workflowId)}/${encodeURIComponent(runId)}`,
      wfLoading: true,
      isWorkflowRunning: undefined
    }
  },
  created() {
    this.$http(this.baseAPIURL).then(
      wf => { this.workflow = wf; this.isWorkflowRunning = !wf.workflowExecutionInfo.closeTime },
      e => this.error = (e.json && e.json.message) || e.status || e.message
    ).finally(() => this.wfLoading = false)
  },
  methods: {}
}
</script>

<style lang="stylus">
@require "../../styles/definitions.styl"

section.execution
  & > nav
    flex-wrap wrap
    background-color black
    padding 0 12px // eyeballed lining up summary icon link with Cadence logo

    a
      display inline-block
      padding 11px 18px
      transition all 400ms ease
      //font-size 16px
      font-weight 500
      text-transform uppercase
      border-bottom 4px solid transparent
      &.router-link-active
        border-bottom-color uber-blue

    a.stack-trace
      icon-trips()
    a.history
      icon-history()
    a.summary
      icon('\ea59')
</style>