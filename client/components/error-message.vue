<script>
export default {
  name: 'error-message',
  props: ['error'],
};
</script>

<template>
  <div class="error-message-container" v-if="error">
    <span class="error">
      {{ error }}
    </span>
  </div>
</template>

<style lang="stylus">
.error-message-container {
  padding: 70px 0;
}
</style>
