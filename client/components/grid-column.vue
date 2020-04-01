<template>
  <div class="grid-column" :style="{ maxWidth: width }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'grid-column',
  props: ['width'],
};
</script>

<style lang="stylus">
.grid-column {
  flex-grow: 1;
  margin-right: 5px;

  &:last-child {
    margin-right: 0;
  }
}
</style>
