<template>
  <div class="archival-lag-messaging">
    <p>It looks like this request is taking some time to process.</p>
    <p>Try narrowing the time range to improve search time.</p>
  </div>
</template>

<script>
export default {
  name: 'archival-lag-messaging',
};
</script>

<style lang="stylus">
@keyframes lagMessageFadeIn {
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}

.archival-lag-messaging {
  animation: lagMessageFadeIn ease 1s;

  text-align: center;
  line-height: 24px;
}
</style>