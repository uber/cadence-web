<template>
<flex-grid
  class="settings-list"
  flex-direction="column"
>
  <flex-grid-item
    v-for="view in viewList"
    :key="view.name"
    margin="0"
  >
    <button-fill
      class="settings-list-item"
      :color="view.name === activeViewName ? 'primary' : 'tertiary'"
      :label="view.displayName"
      @click="() => onClick(view)"
    />
  </flex-grid-item>
</flex-grid>
</template>

<script>
import ButtonFill from '../../button-fill';
import FlexGrid from '../../flex-grid';
import FlexGridItem from '../../flex-grid-item';

export default {
  name: 'settings-list',
  props: {
    activeViewName: {
      type: String,
    },
    viewList: {
      type: Array,
    },
  },
  methods: {
    onClick(view) {
      if (view.name !== this.activeViewName) {
        this.$emit('change', { view });
      }
    },
  },
  components: {
    'button-fill': ButtonFill,
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
  },
};
</script>

<style lang="stylus">
.settings-list {
  background-color: #fafafa;
  height: 100%;

  .settings-list-item {
    padding: 10px 40px 10px 15px;;
    text-align: left;
    width: 100%;
  }
}
</style>