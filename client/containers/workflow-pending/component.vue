<script>
import {
  DynamicScroller,
  DynamicScrollerItem,
} from 'vue-virtual-scroller';
import { ButtonGroup } from '~components';
import { PendingTaskListItem } from './components';

export default {
  name: 'workflow-pending',
  props: {
    filter: {
      type: String,
      default: 'all',
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
    'pending-task-list-item': PendingTaskListItem,
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
    <div class="pending-list">
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
    padding: 24px;
  }

  .pending-list {
    max-height: calc(100vh - 190px);
    overflow-y: auto;
  }
}
</style>