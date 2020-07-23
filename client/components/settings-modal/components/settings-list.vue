<template>
<flex-grid
  class="settings-list"
  flex-direction="column"
>
  <flex-grid-item
    v-for="view in viewList"
    :key="view.viewName"
    margin="0"
  >
    <button
      :disabled="view.viewName === activeView"
      @click="() => onClick(view.viewName)"
    >
      {{ view.displayName }}
    </button>
  </flex-grid-item>
</flex-grid>
</template>

<script>
import ButtonIcon from '../../button-icon';
import FlexGrid from '../../flex-grid';
import FlexGridItem from '../../flex-grid-item';

export default {
  name: 'settings-list',
  props: {
    activeView: {
      type: String,
    },
    viewList: {
      type: Array,
    },
  },
  methods: {
    onClick(viewName) {
      this.$emit('change', { viewName });
    },
  },
  components: {
    'button-icon': ButtonIcon,
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
  },
};
</script>

<style lang="stylus">
.settings-list {
  padding-top: 68px;

  button {
    padding: 10px 40px 10px 15px;;
    text-align: left;
    width: 100%;

    &[disabled="disabled"] {
      background-color: #DDD;
      color: black;
    }
  }
}
</style>