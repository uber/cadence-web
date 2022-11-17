<script>
// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import { PendingTaskListItem } from './components';
import { PENDING_TASK_FILTERS } from './constants';
import { ButtonGroup, NoResults } from '~components';

export default {
  name: 'workflow-pending',
  data() {
    return {
      pendingTaskFilters: PENDING_TASK_FILTERS,
    };
  },
  props: {
    filter: {
      type: String,
      default: 'all',
    },
    emptyMessage: {
      type: String,
      default: 'No results',
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
};
</script>

<template>
  <div class="workflow-pending">
    <div class="top-navigation">
      <button-group
        :items="pendingTaskFilters"
        label="Filters"
        uppercase
        :value="filter"
        @change="$emit('filterChanged', $event)"
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
            <pending-task-list-item :index="index" :item="item" />
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
