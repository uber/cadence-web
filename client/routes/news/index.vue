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
import { getSrc, getLocation } from './helpers';
export default {
  props: ['article', 'date', 'month', 'year'],
  data() {
    const { origin } = window.location;
    const { article, date, month, year } = this;
    const src = getSrc({
      article,
      date,
      month,
      origin,
      year,
    });

    return {
      src,
    };
  },
  mounted() {
    const { iframe } = this.$refs;
    iframe.onload = this.onLoad;
    iframe.onerror = this.onError;
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
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
      this.observer = new MutationObserver(this.onBodyChange);
      this.observer.observe(iframe.contentDocument.body, { childList: true });
      this.$router.go(-1);
    },
    onBodyChange() {
      const { iframe } = this.$refs;
      if (!iframe || !iframe.contentWindow) {
        return;
      }

      const newLocation = getLocation(iframe.contentWindow.location.pathname);
      if (window.location.pathname === newLocation) {
        return;
      }

      this.$router.replace(newLocation);
    }
  },
};
</script>

<style lang="stylus">
section.news {
  height: 100%;

  iframe {
    height: 100%
    width: 100%;
    opacity: 0;
    transition: opacity 0.5s;
  }
}
</style>