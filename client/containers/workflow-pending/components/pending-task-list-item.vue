<script>
import { DetailList } from '~components';

export default {
  name: 'pending-task-list-item',
  props: {
    index: {
      type: Number,
    },
    item: {
      type: Object,
    }
  },
  components: {
    'detail-list': DetailList,
  }
};
</script>

<template>
  <div
    class="pending-task-list-item"
    :class="{ odd: index % 2 === 1 }"
  >
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