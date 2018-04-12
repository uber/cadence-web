<template>
  <section class="execution-summary">
    <dl v-if="workflow">
      <div class="workflow-name">
        <dt>Workflow Name</dt>
        <dd>{{workflow.workflowExecutionInfo.type.name}}</dd>
      </div>
      <div class="started-at">
        <dt>Started At</dt>
        <dd>{{$moment(workflow.workflowExecutionInfo.startTime).format('llll')}}</dd>
      </div>
      <div class="workflow-status">
        <dt>Status</dt>
        <dd><bar-loader v-if="!workflow.workflowExecutionInfo.closeTime" /> {{workflow.workflowExecutionInfo.closeStatus || ''}}</dd>
      </div>
      <div class="workflow-id">
        <dt>Workflow Id</dt>
        <dd>{{$route.params.workflowId}}</dd>
      </div>
      <div class="run-id">
        <dt>Run Id</dt>
        <dd>{{$route.params.runId}}</dd>
      </div>
      <div class="task-list">
        <dt>Task List</dt>
        <dd>results[0].details.taskList.name</dd>
      </div>
      <div class="workflow-input">
        <pre>results[0] and results[0].details.input</pre>
      </div>
    </dl>
    <span class="error" v-if="error">{{error}}</span>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      error: undefined,
      isWorkflowRunning: undefined,
      workflow: undefined,
      input: undefined
    }
  },
  created() {
    console.dir(this.$route.params)
    var { domain, workflowId, runId } = this.$route.params,
    baseUrl = `/api/domain/${domain}/workflows/${encodeURIComponent(workflowId)}/${encodeURIComponent(runId)}`

    this.loading = true
    Promise.all([
      this.$http(baseUrl).then(
        wf => this.workflow = wf,
        e => this.error = (e.json && e.json.message) || e.status || e.message
      ),
      this.$http(baseUrl + '/history').then(res => {
        this.input = res.history.events[0].details.input
      }, e => this.input = (e.json && e.json.message) || e.status || e.message)
    ]).finally(() => this.loading = false)
  },
  methods: {}
}
</script>

<style lang="stylus">
@require "../styles/definitions.styl"

section.execution-summary
  overflow auto
</style>