<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
  </div>
</template>

<style lang="stylus">
.loading-spinner {
  margin: 16px auto;
  height: 32px;
  width: 32px;

  .spinner {
    animation: spin 800ms linear infinite;
    border: 3px solid #11939a;
    border-bottom-color: transparent;
    border-radius: 100%;
    height: 100%;
    width: 100%;
  }
}
</style>
