<script>
import {
  DynamicScroller,
  DynamicScrollerItem,
} from 'vue-virtual-scroller';
import { ButtonGroup } from '~components';

export default {
  name: 'workflow-pending',
  props: {
    filter: {
      type: String,
      default: 'ALL',
    },
    pendingActivities: {
      type: Array,
      default: [],
    },
  },
  computed: {
    filteredActivities() {
      // TODO
      return this.pendingActivities;
    }
  },
  components: {
    'button-group': ButtonGroup,
    DynamicScroller,
    DynamicScrollerItem,
  },
  methods: {
    onFilterChange(filter) {
      console.log('onFilterChange called:', filter);
      this.$router.replace({
        query: { ...this.$route.query, filter },
      });
    }
  }
};
</script>

<template>
  <div>
    <div>
      <button-group
        :items="['ALL', 'ACTIVITIES', 'CHILDREN']"
        @onChange="onFilterChange"
        :value="filter"
      />
    </div>
    <DynamicScroller
      key-field="activityId"
      :items="filteredActivities"
      :min-item-size="38"
      ref="scrollerGrid"
      style="height: 0px;"
    >
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
          class="scroller-item"
          :active="active"
          :data-active="active"
          :data-index="index"
          :item="item"
        >

        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>