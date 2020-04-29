<template>
  <div
    class="flex-grid"
    :style="{
      'align-items': alignItems,
      'justify-content': justifyContent,
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['alignItems', 'justifyContent'],
};
</script>

<style lang="stylus">
.flex-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
