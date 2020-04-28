<template>
  <modal
    name="news-modal"
    @before-close="onBeforeClose"
  >
    <div class="news-modal">
      <div class="header">
        <flex-grid align-items="center">
          <flex-grid-item>
            <h2>Whats new</h2>
          </flex-grid-item>
          <flex-grid-item width="40px">
            <button-icon
              icon="icon_delete-thin"
              size="30px"
              @click="onDismissClick"
            />
          </flex-grid-item>
        </flex-grid>
      </div>
      <div class="content">
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
      <div class="footer">
        <flex-grid align-items="center">
          <flex-grid-item>
            <router-link
              to="news"
              v-on:click.native="onLinkClick"
            >
              See more news...
            </router-link>
          </flex-grid-item>
          <flex-grid-item width="102px">
            <button-fill label="DISMISS" @click="onDismissClick" />
          </flex-grid-item>
        </flex-grid>
      </div>
    </div>
  </modal>
</template>

<script>
import {
  ButtonFill,
  ButtonIcon,
  FlexGrid,
  FlexGridItem
} from '~components';
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
    'button-icon': ButtonIcon,
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
  },
};
</script>

<style lang="stylus">
.news-modal {
  .content {
    max-height: 400px
    overflow-y: auto;
  }

  .footer {
    padding-top: 15px;
  }

  .header {
    padding-bottom: 15px;
  }

  .news-item {

  }
}
</style>
