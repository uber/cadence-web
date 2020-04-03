<template>
  <div class="flex-grid-item" :style="{ maxWidth: width }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'flex-grid-item',
  props: ['width'],
};
</script>

<style lang="stylus">
.flex-grid-item {
  flex-grow: 1;
  margin-right: 5px;
  &:last-child {
    margin-right: 0;
  }
}
</style>
