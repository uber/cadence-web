<template>
<div class="settings-list">
  TODO - Add tab pane on left side...
</div>
</template>

<script>
import ButtonIcon from '../../button-icon';
import FlexGrid from '../../flex-grid';
import FlexGridItem from '../../flex-grid-item';

export default {
  name: 'settings-list',
  props: {
    viewList: {
      type: Array,
    },
  },
  methods: {
    onChange() {
      this.$emit('change');
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

}
</style>