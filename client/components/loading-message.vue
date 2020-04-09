<template>
  <div class="loading-message" v-if="showMessage">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'loading-message',
  props: ['loading', 'delay'],
  data() {
    return {
      showMessage: false,
      timer: undefined,
    };
  },
  methods: {
    clearState() {
      this.stopTimer();
      this.showMessage = false;
    },
    startTimer() {
      this.clearState();
      this.timer = setTimeout(() => {
        this.showMessage = true;
      }, this.delay);
    },
    stopTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
  },
  watch: {
    loading(loading) {
      if (!loading) {
        this.clearState();
      } else {
        this.startTimer();
      }
    },
  },
};
</script>

<style lang="stylus">
@keyframes loadingMessageFadeIn {
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}

.loading-message {
  animation: loadingMessageFadeIn ease 1s;

  text-align: center;
  line-height: 24px;
}
</style>
