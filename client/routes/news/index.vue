<template>
  <section class="news">
    <iframe
      ref="iframe"
      :src="src"
    />
  </section>
</template>

<script>
export default {
  mounted() {
    const { iframe } = this.$refs;
    iframe.onload = this.onLoad;
    iframe.onerror = this.onError;
  },
  computed: {
    src() {
      return window.location.origin + '/_news/';
    },
  },
  methods: {
    onError(error) {
      console.log('error = ', error);
    },
    onLoad() {
      const { iframe } = this.$refs;
      iframe.style.opacity = 1;
      console.log('loaded iframe???');
    },
  },
};
</script>

<style lang="stylus">
section.news {
  height: 100%;

  iframe {
    height: 100%
    opacity: 0;
    width: 100%;
    transition: opacity 0.5s;
  }
}
</style>