<template>
<flex-grid align-items="center">
  <flex-grid-item grow="1">
    <h2>{{title}}</h2>
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