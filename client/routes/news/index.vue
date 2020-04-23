<template>
  <section class="news">
    <iframe
      :src="src"
    />
  </section>
</template>

<script>
export default {
  computed: {
    src() {
      return window.location.origin + '/_news/';
    },
  },
};
</script>

<style lang="stylus">
section.news {
  height: 100%;

  iframe {
    height: 100%;
    width: 100%;
  }
}
</style>