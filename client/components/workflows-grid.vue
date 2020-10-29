<template>
  <section class="workflow-grid" :class="{ loading }">
    <div class="row-header">
      <div class="col col-id">Workflow Id</div>
      <div class="col col-link">Run Id</div>
      <div class="col col-name">Name</div>
      <div class="col col-status">Status</div>
      <div class="col col-start">Start Time</div>
      <div class="col col-end">End Time</div>
    </div>
    <div class="spacer" />
    <no-results :results="workflows" />
    <RecycleScroller
      key-field="runId"
      :items="workflows"
      :item-size="38"
      emit-update
      @update="onScroll"
      ref="workflowGrid"
      data-cy="workflow-list"
      class="workflow-grid"
      v-if="anyWorkflows"
      v-slot="{ item, index }"
    >
      <div class="row" :class="{ odd: index % 2 === 1 }">
        <div class="col col-id">{{ item.workflowId }}</div>
        <div class="col col-link">
          <router-link
            :to="{
              name: 'workflow/summary',
              params: { runId: item.runId, workflowId: item.workflowId },
            }"
            data-cy="workflow-link"
            >{{ item.runId }}
          </router-link>
        </div>
        <div class="col col-name">{{ item.workflowName }}</div>

        <div class="col col-status" :class="item.status">{{ item.status }}</div>
        <div class="col col-start">{{ item.startTime }}</div>
        <div class="col col-end">{{ item.endTime }}</div>
      </div>
    </RecycleScroller>
  </section>
</template>

<script>
import moment from 'moment';
import orderBy from 'lodash-es/orderBy';
import { RecycleScroller } from 'vue-virtual-scroller';
import { NoResults } from '~components';

export default {
  name: 'workflows-grid',
  props: ['workflows', 'onWorkflowsScroll', 'loading'],
  data() {
    return {
      nextPageToken: undefined,
    };
  },
  methods: {
    onScroll(startIndex, endIndex) {
      if (!this.workflows || endIndex < this.workflows.length) {
        return;
      }

      this.$emit('onWorkflowsScroll', startIndex, endIndex);
    },
  },
  computed: {
    anyWorkflows() {
      return this.workflows?.length > 0;
    },
  },
  components: {
    RecycleScroller,
    'no-results': NoResults,
  },
};
</script>

<style lang="stylus">
@require "../styles/definitions.styl"

paged-grid()

.workflow-grid
  height: calc(100vh - 203px)

  &.loading.has-results
    &::after
      content none

  .row-header
    display: flex;
    position: relative;
    flex-direction: row;
    justify-content: start;
    align-items: stretch;

    color: rgb(0, 0, 0);
    font-weight: 500;
    text-transform: uppercase;

    box-shadow 0px 2px 2px rgba(0,0,0,0.2)
    width: calc(100% - 10px);

  .row
    height: 38px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: stretch;
    &.odd
      background-color: temporal-white;
    .col
      &.col-status
        text-transform: capitalize;

  .col
    align-self: center;
    flex-basis: auto;
    padding: 0.5rem;
    &.col-id
      flex-basis: 400px;
    &.col-link
      flex-basis: 400px;
    &.col-name
      flex-basis: 300px;
    &.col-status
      flex-basis: 100px;
      &.completed
        color uber-green
      &.failed
        color uber-orange
      &.running
        color uber-blue-120
    &.col-start
      flex-basis: 200px;
    &.col-end
      flex-basis: 200px;
</style>
