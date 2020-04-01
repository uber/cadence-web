<template>
  <div class="grid">
    <slot></slot>
  </div>
</template>

<style lang="stylus">
.grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
