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
import { getIFrameSrc, getIFrameLocation } from './helpers';
export default {
  props: ['article', 'date', 'month', 'year'],
  data() {
    return {
      src: this.getIFrameSrc(),
    };
  },
  computed: {
    url() {
      return this.getIFrameSrc();
    },
  },
  mounted() {
    const { iframe } = this.$refs;
    iframe.onload = this.onIFrameLoad;
    iframe.onerror = this.onIFrameError;
  },
  beforeDestroy() {
    this.unsubscribeToIFrameNavigationChange();
  },
  methods: {
    fadeInIFrame() {
      const { iframe } = this.$refs;
      iframe.style.opacity = 1;
    },
    fadeOutIFrame() {
      const { iframe } = this.$refs;
      iframe.style.opacity = 0;
    },
    getIFrameSrc() {
      const { origin } = window.location;
      const { article, date, month, year } = this;
      return getIFrameSrc({
        article,
        date,
        month,
        origin,
        year,
      });
    },
    onIFrameError() {
      this.$emit('onNotification', {
        message: NOTIFICATION_TYPE_ERROR_MESSAGE_DEFAULT,
        type: NOTIFICATION_TYPE_ERROR,
      });
    },
    onIFrameLoad() {
      this.fadeInIFrame();
      this.subscribeToIFrameNavigationChange();
      // iframe.onload adds its iframe page to the history stack
      this.$router.go(-1);
    },
    onIFrameBodyChange() {
      const { location } = window;
      const { iframe } = this.$refs;
      const iframeLocation = getUpdatedIFrameLocation({ iframe, location });
      if (iframeLocation) {
        // means iframe has navigated to another page. Update browser url.
        this.$router.replace(iframeLocation);
      }
    },
    onBrowserUrlChange() {
      const { location } = window;
      const { iframe } = this.$refs;
      const iframeLocation = getUpdatedIFrameLocation({ iframe, location });
      if (iframeLocation) {
        // means browser url is out of sync with iframe url
        // this can happen when clicking on the news tab from a news story
        // -> need to force iframe to rerender
        this.reloadIFrame();
      }
    },
    reloadIFrame() {
      this.src = '';

      setTimeout(() => {
        this.src = this.url;
        this.fadeOutIFrame();
      }, 100);

      setTimeout(() => {
        this.fadeInIFrame();
      }, 500);
    },
    subscribeToIFrameNavigationChange() {
      // need to observe iframe body change as there is no
      // event to subscribe to for iframe route change
      const { iframe } = this.$refs;
      this.observer = new MutationObserver(this.onIFrameBodyChange);
      this.observer.observe(iframe.contentDocument.body, { childList: true });
    },
    unsubscribeToIFrameNavigationChange() {
      if (this.observer) {
        this.observer.disconnect();
      }
    },
  },
  watch: {
    url(url) {
      this.onBrowserUrlChange();
    },
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