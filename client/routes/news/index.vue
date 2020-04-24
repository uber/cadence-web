<template>
  <section class="news">
    <iframe
      ref="iframe"
      :src="src"
    />
  </section>
</template>

<script>
import {
  NOTIFICATION_TYPE_ERROR,
  NOTIFICATION_TYPE_ERROR_MESSAGE_DEFAULT,
} from '~constants';
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
    onError() {
      this.$emit('onNotification', {
        message: NOTIFICATION_TYPE_ERROR_MESSAGE_DEFAULT,
        type: NOTIFICATION_TYPE_ERROR,
      });
    },
    onLoad() {
      const { iframe } = this.$refs;
      iframe.style.opacity = 1;
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