<template>
  <div
    class="flex-grid-item"
    :style="{ flexGrow: grow, marginRight: margin, maxWidth: width }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'flex-grid-item',
  props: ['grow', 'margin', 'width'],
};
</script>

<style lang="stylus">
.flex-grid-item {
  margin-right: 5px;
  &:last-child {
    margin-right: 0;
  }
}
</style>
