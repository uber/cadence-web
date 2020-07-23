<template>
<flex-grid
  align-items="center"
  class="settings-header"
>
  <flex-grid-item grow="1">
    <h2>{{displayTitle}}</h2>
  </flex-grid-item>
  <flex-grid-item width="40px">
    <button-icon
      icon="icon_delete-thin"
      size="30px"
      @click="onCloseClick"
    />
  </flex-grid-item>
</flex-grid>
</template>

<script>
import ButtonIcon from '../../button-icon';
import FlexGrid from '../../flex-grid';
import FlexGridItem from '../../flex-grid-item';

export default {
  name: 'settings-header',
  props: {
    title: {
      type: String,
    },
    titleSuffix: {
      type: String,
    },
  },
  computed: {
    displayTitle() {
      const { title, titleSuffix } = this;
      return [title, titleSuffix].join(' ');
    },
  },
  methods: {
    onCloseClick() {
      this.$emit('close');
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
.settings-header {
  margin-bottom: 15px;
}
</style>