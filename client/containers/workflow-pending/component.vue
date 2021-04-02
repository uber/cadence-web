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
      default: 'all',
    },
    pendingActivities: {
      type: Array,
      default: () => [],
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

<style lang="stylus">
.workflow-pending {
  .top-navigation {
    padding: 24px;
  }
}
</style>