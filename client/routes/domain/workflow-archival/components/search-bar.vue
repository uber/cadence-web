<template>
  <header class="search-bar">
    <slot></slot>
  </header>
</template>

<style lang="stylus">
.search-bar {
  display: flex;
  padding: 16px;
  flex-direction: row;
}
</style>