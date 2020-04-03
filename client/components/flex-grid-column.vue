<template>
  <div class="flex-grid-column" :style="{ maxWidth: width }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'flex-grid-column',
  props: ['width'],
};
</script>

<style lang="stylus">
.flex-grid-column {
  flex-grow: 1;
  margin-right: 5px;
  &:last-child {
    margin-right: 0;
  }
}
</style>
