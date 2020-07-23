<template>
<flex-grid align-items="center" justify-content="flex-end">
  <flex-grid-item width="102px">
    <button-fill
      color="tertiary"
      label="CANCEL"
      @click="onCloseClick"
    />
  </flex-grid-item>
  <flex-grid-item>
    <button-fill
      :disabled="!applyEnabled"
      label="APPLY"
      @click="onSubmitClick"
    />
  </flex-grid-item>
</flex-grid>
</template>

<script>
import ButtonFill from '../../button-fill';
import FlexGrid from '../../flex-grid';
import FlexGridItem from '../../flex-grid-item';

export default {
  name: 'settings-footer',
  props: {
    applyEnabled: {
      type: Boolean,
    },
  },
  methods: {
    onCloseClick() {
      this.$emit('close');
    },
    onSubmitClick() {
      this.$emit('submit');
    },
  },
  components: {
    'button-fill': ButtonFill,
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
  },
};
</script>