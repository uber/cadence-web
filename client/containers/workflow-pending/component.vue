<script>
import {
  DynamicScroller,
  DynamicScrollerItem,
} from 'vue-virtual-scroller';
import { ButtonGroup, NoResults } from '~components';
import { PendingTaskListItem } from './components';
import { PENDING_TASK_FILTER_TO_EMPTY_MESSAGE_MAP } from './constants';

export default {
  name: 'workflow-pending',
  props: {
    filter: {
      type: String,
      default: 'all',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    pendingTaskList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    'button-group': ButtonGroup,
    DynamicScroller,
    DynamicScrollerItem,
    'no-results': NoResults,
    'pending-task-list-item': PendingTaskListItem,
  },
  computed: {
    emptyMessage() {
      const { filter } = this;
      return PENDING_TASK_FILTER_TO_EMPTY_MESSAGE_MAP[filter];
    },
  },
  methods: {
    onFilterChange(filter) {
      this.$emit('filterChanged', filter);
    },
  },
};
</script>

<template>
  <div class="workflow-pending">
    <div class="top-navigation">
      <button-group
        :items="['all', 'activities', 'children']"
        label="Filters"
        uppercase
        :value="filter"
        @change="onFilterChange"
      />
    </div>
    <no-results
      :is-loading="isLoading"
      :message="emptyMessage"
      :results="pendingTaskList"
    />
    <div class="pending-task-list" v-if="pendingTaskList.length">
      <DynamicScroller
        key-field="pendingTaskId"
        :items="pendingTaskList"
        :min-item-size="38"
      >
        <template v-slot="{ item, index, active }">
          <DynamicScrollerItem
            class="scroller-item"
            :active="active"
            :data-active="active"
            :data-index="index"
            :item="item"
          >
            <pending-task-list-item
              :index="index"
              :item="item"
            />
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>
    </div>
  </div>
</template>

<style lang="stylus">
.workflow-pending {
  .top-navigation {
    border-bottom: 1px solid #c6c6c6;
    box-shadow: 0 2px 2px rgba(0,0,0,0.2);
    padding: 24px;
  }

  .pending-task-list {
    max-height: calc(100vh - 191px);
    overflow-y: auto;
  }
}
</style>