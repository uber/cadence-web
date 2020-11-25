<script>
import ButtonFill from '../../button-fill';
import FlexGrid from '../../flex-grid';
import FlexGridItem from '../../flex-grid-item';

export default {
  name: 'settings-footer',
  props: {
    submitEnabled: {
      type: Boolean,
    },
  },
  methods: {
    onCancelClick() {
      this.$emit('cancel');
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

<template>
  <flex-grid align-items="center" justify-content="flex-end">
    <flex-grid-item width="102px">
      <button-fill color="tertiary" label="CANCEL" @click="onCancelClick" />
    </flex-grid-item>
    <flex-grid-item>
      <button-fill
        :disabled="!submitEnabled"
        label="APPLY"
        @click="onSubmitClick"
      />
    </flex-grid-item>
  </flex-grid>
</template>
