<template>
  <modal
    name="news-modal"
    @before-close="onBeforeClose"
  >
    <div class="news-modal">
      <div
        class="news-item"
        :key="id"
        v-for="({ id, summary, title }) in newsItems"
      >
        <h3>{{ title }}</h3>
        <p>{{ summary }}</p>
      </div>
      <router-link
        to="news"
        v-on:click.native="onLinkClick"
      >
        See more news...
      </router-link>
    </div>
  </modal>
</template>

<script>
export default {
  props: ['newsItems'],
  methods: {
    onLinkClick() {
      console.log('onLinkClick called???');
      this.$modal.hide('news-modal');
    },
    onBeforeClose() {
      this.$emit('before-close');
    },
  },
};
</script>

<style lang="stylus">
.news-modal {
  overflow-y: auto;

  .news-item {

  }
}
</style>
