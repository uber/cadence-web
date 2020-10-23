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

<script>
import PartitionTable from './components/partition-table';
import { FlexGrid, FlexGridItem } from '~components';

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
    const partitions = await this.$http(
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
