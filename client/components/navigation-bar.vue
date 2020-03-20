<template>
  <nav class="navigation-bar">
    <slot></slot>
  </nav>
</template>

<script>
export default {
  name: 'navigation-bar',
};
</script>

<style lang="stylus">
.navigation-bar {
  flex-wrap: wrap;
  background-color: #000;
  padding: 0 12px;
}
</style>
