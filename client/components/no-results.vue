<template>
  <div class="no-results-container" v-if="results && !results.length">
    <div class="no-results">
      No Results
    </div>
  </div>
</template>

<script>
export default {
  name: 'no-results',
  props: ['results'],
};
</script>

<style lang="stylus">
.no-results-container {
  padding: 70px 0;
}
</style>
