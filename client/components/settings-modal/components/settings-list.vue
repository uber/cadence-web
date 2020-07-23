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
    <button
      :disabled="view.name === activeViewName"
      @click="() => onClick(view)"
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
    activeViewName: {
      type: String,
    },
    viewList: {
      type: Array,
    },
  },
  methods: {
    onClick(view) {
      this.$emit('change', { view });
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