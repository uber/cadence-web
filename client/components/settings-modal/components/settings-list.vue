<template>
<div class="settings-list">
  TODO - Add tab pane on left side...

  see https://vuetifyjs.com/en/components/tabs/
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