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

import PartitionTable from './components/partition-table';
import { FlexGrid, FlexGridItem } from '~components';
import { httpService } from '~services';

export default {
  name: 'partition',
  data() {
    return {
      activityPartitionList: undefined,
      decisionPartitionList: undefined,
    };
  },
  props: ['domain', 'taskList'],
  async created() {
    const partitions = await httpService.get(
      `/api/domains/${this.domain}/task-lists/${this.taskList}/partitions`
    );

    this.activityPartitionList = partitions.activityTaskListPartitions;
    this.decisionPartitionList = partitions.decisionTaskListPartitions;
  },
  components: {
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
    'partition-table': PartitionTable,
  },
};
</script>

<template>
  <section class="task-list-partition">
    <flex-grid width="100%">
      <flex-grid-item grow="1" margin="10px">
        <partition-table
          title="Activity Partitions"
          :partition-list="activityPartitionList"
        />
      </flex-grid-item>
      <flex-grid-item grow="1">
        <partition-table
          title="Decision Partitions"
          :partition-list="decisionPartitionList"
        />
      </flex-grid-item>
    </flex-grid>
  </section>
</template>
