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

import { DetailList } from '~components';

export default {
  name: 'pending-task-list-item',
  props: {
    index: {
      type: Number,
      default: 0,
    },
    item: {
      type: Object,
      default: () => ({
        kvps: [],
        pendingTaskTypeDisplay: '',
      }),
    },
  },
  components: {
    'detail-list': DetailList,
  },
};
</script>

<template>
  <div class="pending-task-list-item" :class="{ odd: index % 2 === 1 }">
    <div class="col type">{{ item.pendingTaskTypeDisplay }}</div>
    <div class="col detail">
      <detail-list :item="item" />
    </div>
  </div>
</template>

<style lang="stylus">
.pending-task-list-item {
  display: flex;

  &.odd {
    background-color: #f8f8f9;
  }

  .col {
    padding: 8px;

    &.type {
      width: 200px;
    }

    &.detail {
      flex: 1;
    }
  }
}
</style>
