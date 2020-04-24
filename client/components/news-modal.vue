<template>
  <modal
    name="news-modal"
    @before-close="onBeforeClose"
  >
    <div>
      Hello world?
    </div>
  </modal>
</template>

<script>
export default {
  props: ['newsItems'],
  methods: {
    onBeforeClose() {
      this.$emit('before-close');
    },
  },
};
</script>