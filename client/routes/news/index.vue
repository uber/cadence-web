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
    return {
      src: this.getSrc(),
    };
  },
  computed: {
    url() {
      return this.getSrc();
    },
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
    getSrc() {
      const { origin } = window.location;
      const { article, date, month, year } = this;
      return getSrc({
        article,
        date,
        month,
        origin,
        year,
      });
    },
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
      this.$router.go(-1);  // iframe.onload adds its child page to history stack
    },
    onBodyChange() {
      const { location } = window;
      const { iframe } = this.$refs;
      const childLocation = getLocation({ iframe, location });
      if (childLocation) {
        this.$router.replace(childLocation);
      }
    },
    onParentUrlChange() {
      const { location } = window;
      const { iframe } = this.$refs;
      const childLocation = getLocation({ iframe, location });
      if (childLocation) {
        // means parent url is out of sync with child
        // this can happen when clicking on the news tab from a news story
        // -> need to force iframe to rerender

        this.src = '';

        setTimeout(() => {
          this.src = this.url;
          const { iframe } = this.$refs;
          iframe.style.opacity = 0;
        }, 100);

        setTimeout(() => {
          const { iframe } = this.$refs;
          iframe.style.opacity = 1;
        }, 500);
      }
    },
  },
  watch: {
    url(url) {
      this.onParentUrlChange();
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