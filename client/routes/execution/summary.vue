<template>
  <section class="execution-summary">
    <dl v-if="$parent.workflow">
      <div class="workflow-name">
        <dt>Workflow Name</dt>
        <dd>{{$parent.workflow.workflowExecutionInfo.type.name}}</dd>
      </div>
      <div class="started-at">
        <dt>Started At</dt>
        <dd>{{$moment($parent.workflow.workflowExecutionInfo.startTime).format('dddd MMMM Do, h:mm:ss a')}}</dd>
      </div>
      <div class="workflow-status" :data-status="wfStatus()">
        <dt>Status</dt>
        <dd><bar-loader v-if="!$parent.workflow.workflowExecutionInfo.closeTime" /> {{wfStatus()}}</dd>
      </div>
      <div class="close-time" v-if="$parent.workflow.workflowExecutionInfo.closeTime">
        <dt>Closed Time</dt>
        <dd>{{$moment($parent.workflow.workflowExecutionInfo.closeTime).format('dddd MMMM Do, h:mm:ss a')}}</dd>
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
        <dd>{{$parent.workflow.executionConfiguration.taskList.name}}</dd>
      </div>
      <div class="history-length">
        <dt>History Events</dt>
        <dd>{{$parent.workflow.workflowExecutionInfo.historyLength}}</dd>
      </div>
      <div class="workflow-input">
        <dt>Input</dt>
        <dd><pre v-if="$parent.input !== undefined">{{JSON.stringify($parent.input, null, 2)}}</pre></dd>
      </div>
      <div class="pending-activities" v-if="$parent.workflow.pendingActivities">
        <dt>Pending Activities</dt>
        <dd v-for="pa in $parent.workflow.pendingActivities"><details-list :item="pa" /></dd>
      </div>
    </dl>
    <span class="error" v-if="$parent.error">{{$parent.error}}</span>
  </section>
</template>

<script>
export default {
  data() {
    return {
      inputLoading: false
    }
  },
  created() {
    if (!this.$parent.input) {
      this.inputLoading = true
      this.$http(this.$parent.baseAPIURL + '/history').then(
        res => this.$parent.input = res.history.events[0].details.input,
        e => this.$parent.input = (e.json && e.json.message) || e.status || e.message
      ).finally(() => this.inputLoading = false)
    }
  },
  methods: {
    wfStatus() {
      return ((this.$parent.workflow && this.$parent.workflow.workflowExecutionInfo.closeStatus) || 'running').toLowerCase()
    }
  }
}
</script>

<style lang="stylus">
@require "../../styles/definitions.styl"

section.execution-summary
  overflow auto
  padding layout-spacing-small

  dl:not(.details)
    & > div
      margin-bottom 1em
      & > dt
        text-transform uppercase
        font-size 11px
      dd, dt
        line-height 1.5em
  dl.details
    border 1px solid uber-black-60
    margin-bottom 1em
    dt
      padding 0 4px
  .run-id, .task-list, .workflow-id, .workflow-name
    dd
      font-weight 300
      font-family monospace-font-family
  .workflow-status
    dd
      text-transform capitalize
    &[data-status="completed"] dd
      color uber-green
    &[data-status="failed"] dd
      color uber-orange
</style>