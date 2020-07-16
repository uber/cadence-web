<script>
import { version } from '../package.json';
import logo from './assets/logo.svg';
import {
  ButtonIcon,
  FeatureFlag,
  FlexGrid,
  FlexGridItem,
  NewsModal,
  NotificationBar,
  SettingsModal,
} from '~components';
import {
  DATE_FORMAT_MMM_D_YYYY,
  DATE_FORMAT_OPTIONS,
  ENVIRONMENT_LIST,
  LOCAL_STORAGE_NEWS_LAST_VIEWED_AT,
  LOCAL_STORAGE_SETTINGS,
  NOTIFICATION_TIMEOUT,
  NOTIFICATION_TYPE_SUCCESS,
  TIME_FORMAT_12,
  TIME_FORMAT_OPTIONS,
  TIMEZONE_LOCAL,
  TIMEZONE_OPTIONS,
} from '~constants';
import {
  getEnvironment,
  getEnvironmentList,
  getEnvironmentLocation,
  getLatestNewsItems,
} from '~helpers';

export default {
  components: {
    'button-icon': ButtonIcon,
    'feature-flag': FeatureFlag,
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
    'news-modal': NewsModal,
    'notification-bar': NotificationBar,
    'settings-modal': SettingsModal,
  },
  data() {
    const { origin } = window.location;
    const environmentList = ENVIRONMENT_LIST;

    return {
      environment: {
        list: getEnvironmentList({
          environmentList,
          origin,
        }),
        value: getEnvironment({
          environmentList,
          origin,
        }),
      },
      newsLastUpdated: localStorage.getItem(LOCAL_STORAGE_NEWS_LAST_VIEWED_AT),
      newsItems: [],
      logo,
      notification: {
        message: '',
        show: false,
        type: '',
        timeout: undefined,
      },
      settings: {
        dateFormat:
          localStorage.getItem(LOCAL_STORAGE_SETTINGS.dateFormat) ||
          DATE_FORMAT_MMM_D_YYYY,
        dateFormatOptions: DATE_FORMAT_OPTIONS,
        timeFormat:
          localStorage.getItem(LOCAL_STORAGE_SETTINGS.timeFormat) ||
          TIME_FORMAT_12,
        timeFormatOptions: TIME_FORMAT_OPTIONS,
        timezone:
          localStorage.getItem(LOCAL_STORAGE_SETTINGS.timezone) ||
          TIMEZONE_LOCAL,
        timezoneOptions: TIMEZONE_OPTIONS,
      },
    };
  },
  beforeDestroy() {
    clearTimeout(this.notification.timeout);
  },
  async mounted() {
    await this.fetchLatestNewsItems();

    if (this.newsItems.length) {
      this.$modal.show('news-modal');
    }
  },
  methods: {
    async fetchLatestNewsItems() {
      const { newsLastUpdated } = this;
      const response = await this.$http('/feed.json');

      this.newsItems = getLatestNewsItems({ newsLastUpdated, response });
    },
    globalClick(e) {
      // Code required for mocha tests to run correctly without infinite looping.
      if (window.mocha !== undefined && e.target.tagName === 'A') {
        const href = e.target.getAttribute('href');

        if (
          href &&
          href.startsWith('/') &&
          !e.target.getAttribute('download') &&
          !e.target.getAttribute('target')
        ) {
          e.preventDefault();
          e.stopPropagation();
          this.$router.push(href);
        }
      }
    },
    onEnvironmentSelectChange(environment) {
      if (environment === this.environment.value) {
        return;
      }

      const { pathname, search } = window.location;

      window.location = getEnvironmentLocation({
        environment,
        pathname,
        search,
      });
    },
    onNewsDismiss() {
      localStorage.setItem(
        LOCAL_STORAGE_NEWS_LAST_VIEWED_AT,
        this.newsItems[0].date_modified
      );
    },
    onNotification({ message, type = NOTIFICATION_TYPE_SUCCESS }) {
      this.notification.message = message;
      this.notification.type = type;
      this.notification.show = true;
    },
    onNotificationClose() {
      this.notification.show = false;
    },
    onSettingsChange(values) {
      for (const key in values) {
        const value = values[key];

        localStorage.setItem(LOCAL_STORAGE_SETTINGS[key], value);
        this.settings[key] = value;
      }
    },
    onSettingsClick() {
      this.$modal.show('settings-modal');
    },
  },
  watch: {
    'notification.show'(value) {
      clearTimeout(this.notification.timeout);

      if (value) {
        this.notification.timeout = setTimeout(
          this.onNotificationClose,
          NOTIFICATION_TIMEOUT
        );
      }
    },
  },
  computed: {
    version() {
      return `v${version}`;
    },
  },
};
</script>

<template>
  <main @click="globalClick">
    <notification-bar
      :message="notification.message"
      :onClose="onNotificationClose"
      :show="notification.show"
      :type="notification.type"
    />
    <header class="top-bar">
      <flex-grid align-items="center" width="100%">
        <flex-grid-item>
          <a href="/domains" class="logo">
            <div v-html="logo"></div>
            <span class="version">{{ version }}</span>
          </a>
        </flex-grid-item>

        <feature-flag name="environmentSelect">
          <flex-grid-item>
            <v-select
              class="environment-select"
              :on-change="onEnvironmentSelectChange"
              :options="environment.list"
              :searchable="false"
              :value="environment.value"
            />
          </flex-grid-item>
        </feature-flag>

        <flex-grid-item v-if="$route.params.domain" margin="15px">
          <a
            class="workflows"
            :class="{
              'router-link-active':
                $route.path === `/domains/${$route.params.domain}/workflows`,
            }"
            :href="`/domains/${$route.params.domain}/workflows`"
          >
            {{ $route.params.domain }}
          </a>
        </flex-grid-item>

        <flex-grid-item v-if="$route.params.workflowId">
          <span>{{ $route.params.workflowId }}</span>
        </flex-grid-item>

        <flex-grid-item v-if="$route.params.taskList">
          <span>{{ $route.params.taskList }}</span>
        </flex-grid-item>

        <flex-grid-item grow="1">
          <button-icon
            color="primary"
            icon="icon_settings"
            label="SETTINGS"
            size="30px"
            style="float: right"
            @click="onSettingsClick"
          />
        </flex-grid-item>
      </flex-grid>
    </header>
    <router-view
      :date-format="settings.dateFormat"
      :time-format="settings.timeFormat"
      :timezone="settings.timezone"
      @onNotification="onNotification"
    ></router-view>
    <modals-container />
    <v-dialog />
    <news-modal :news-items="newsItems" @before-close="onNewsDismiss" />
    <settings-modal
      :date-format="settings.dateFormat"
      :date-format-options="settings.dateFormatOptions"
      :time-format="settings.timeFormat"
      :time-format-options="settings.timeFormatOptions"
      :timezone="settings.timezone"
      :timezone-options="settings.timezoneOptions"
      @onChange="onSettingsChange"
    />
  </main>
</template>

<style src="vue-virtual-scroller/dist/vue-virtual-scroller.css"></style>
<style src="vue2-datepicker/index.css"></style>
<style lang="stylus">
@import "https://d1a3f4spazzrp4.cloudfront.net/uber-fonts/4.0.0/superfine.css"
@import "https://d1a3f4spazzrp4.cloudfront.net/uber-icons/3.14.0/uber-icons.css"
@require "./styles/definitions"
@require "./styles/reset"

global-reset()

@import "./styles/base"
@import "./styles/select"
@import "./styles/modal"
@import "./styles/code"

header.top-bar
  display flex
  flex 0 0 auto
  align-items center
  background-color uber-black
  padding 0 page-margin-x
  color base-ui-color
  height top-nav-height
  h2
    font-size 18px
    margin-right inline-spacing-large
    padding page-margin-y inline-spacing-large page-margin-y 0
  a
    display inline-block
    h2
      color uber-white-80
    &.config
      margin-left inline-spacing-medium
      icon('\ea5f')
    &.logo {
      margin-right: layout-spacing-medium;
      position: relative;
    }

  svg
    display inline-block
    height top-nav-height - 20px

  spacing = 1.3em
  nav-label-color = uber-white-40
  nav-label-font-size = 11px

  .detail-view span::before
    font-size nav-label-font-size
    color nav-label-color
    margin-right spacing
  div.workflow-id span::before
      content 'WORKFLOW ID'
  div.task-list span::before
      content 'TASK LIST'
  .version {
    color: #c6c6c6;
    font-size: 10px;
    position: absolute;
    right: 4px;
    bottom: 0;
  }

  .environment-select {
    .dropdown-toggle {
      border-color: transparent;
    }

    .open-indicator:before {
      border-color: uber-blue;
    }

    .selected-tag {
      color: white;
      font-weight: bold;
    }
  }

body, main
  height 100%
main
  position absolute
  width 100%
  display flex
  flex-direction column

main
  > section
    display flex
    flex-direction column
    flex 1 1 auto
    > header:last-of-type
      margin-bottom layout-spacing-small
    > header
      display flex
      align-items: start;
      flex 0 0 auto
      > *
        margin inline-spacing-small

area-loader, section.loading
  size = 32px
  &::after
    content ''
    display block
    position absolute
    width size
    height size
    border-radius size
    left "calc(50% - %s)" % (size/2)
    top 300px;
    border 3px solid uber-blue
    border-bottom-color transparent
    animation spin 800ms linear infinite
</style>
