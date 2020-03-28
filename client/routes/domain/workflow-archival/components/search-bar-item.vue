<template>
  <div class="search-bar-item" :style="{ maxWidth }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'search-bar-item',
  props: ['maxWidth'],
}
</script>

<style lang="stylus">
.search-bar-item {
  flex-grow: 1;
  margin-right: 5px;

  &:last-child {
    margin-right: 0;
  }
}
</style>