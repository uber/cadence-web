<template>
  <div class="flex-grid">
    <slot></slot>
  </div>
</template>

<style lang="stylus">
.flex-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
