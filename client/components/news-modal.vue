<template>
  <modal
    name="news-modal"
    @before-close="onBeforeClose"
  >
    <div class="news-modal">
      <div
        class="news-item"
        :key="id"
        v-for="({ id, summary, title, url }) in newsItems"
      >
        <h3>
          <router-link
            :to="url"
            v-on:click.native="onLinkClick"
          >
            {{ title }}
          </router-link>
        </h3>
        <p>{{ summary }}</p>
      </div>

    </div>
    <flex-grid>
      <flex-grid-item>
        <router-link
          to="news"
          v-on:click.native="onLinkClick"
        >
          See more news...
        </router-link>
      </flex-grid-item>
      <flex-grid-item width="90px">
        <button-fill label="DISMISS" @click="onDismissClick" />
      </flex-grid-item>
    </flex-grid>
  </modal>
</template>

<script>
import { ButtonFill, FlexGrid, FlexGridItem } from '~components';
export default {
  props: ['newsItems'],
  methods: {
    onLinkClick() {
      this.$modal.hide('news-modal');
    },
    onDismissClick() {
      this.$modal.hide('news-modal');
    },
    onBeforeClose() {
      this.$emit('before-close');
    },
  },
  components: {
    'button-fill': ButtonFill,
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
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
