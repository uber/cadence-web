<script>
export default {
  props: {
    alignItems: {
      type: String,
    },
    flexDirection: {
      type: String,
      default: 'row',
    },
    justifyContent: {
      type: String,
    },
    width: {
      type: String,
    },
  },
};
</script>

<template>
  <div
    class="flex-grid"
    :style="{
      'align-items': alignItems,
      'flex-direction': flexDirection,
      'justify-content': justifyContent,
      width: width,
    }"
  >
    <slot></slot>
  </div>
</template>

<style lang="stylus">
.flex-grid {
  display: flex;
  flex-wrap: wrap;
}
</style>
