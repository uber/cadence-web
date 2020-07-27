<template>
  <modal
    name="settings-modal"
    @before-close="onBeforeClose"
    @before-open="onBeforeOpen"
  >
    <div class="settings-modal">
      <settings-header
        :title="activeView.displayName"
        title-suffix="Settings"
        @close="onClose"
      />
      <settings-date-format
        :date-format="dateFormat"
        :date-format-options="dateFormatOptions"
        :time-format="timeFormat"
        :time-format-options="timeFormatOptions"
        :timezone="timezone"
        :timezone-options="timezoneOptions"
        v-if="settingsDateFormatViewActive"
        @change="onSettingsChange"
        @close="onClose"
      />
    </div>
  </modal>
</template>

<script>
import SettingsDateFormat from './components/settings-date-format';
import SettingsHeader from './components/settings-header';
import { SETTINGS_VIEW_LIST } from './constants';

export default {
  data() {
    return {
      activeView: {},
      viewList: SETTINGS_VIEW_LIST,
    };
  },
  props: {
    dateFormat: {
      type: String,
    },
    dateFormatOptions: {
      type: Array,
    },
    timeFormat: {
      type: String,
    },
    timeFormatOptions: {
      type: Array,
    },
    timezone: {
      type: String,
    },
    timezoneOptions: {
      type: Array,
    },
    workflowHistoryEventHighlightList: {
      type: Array,
    },
    workflowHistoryEventHighlightListEnabled: {
      type: Boolean,
    },
  },
  computed: {
    settingsDateFormatViewActive() {
      return this.activeView.name === 'settings-date-format';
    },
  },
  methods: {
    close() {
      this.$modal.hide('settings-modal');
    },
    onClose() {
      this.close();
    },
    onBeforeClose() {
      this.activeView = {};
    },
    onBeforeOpen() {
      this.activeView = this.viewList[0];
    },
    onSettingsChange(event) {
      this.$emit('change', event);
      this.close();
    },
  },
  components: {
    'settings-date-format': SettingsDateFormat,
    'settings-header': SettingsHeader,
  },
};
</script>

<style lang="stylus">
.settings-modal {
  .content {
    min-height: 320px;
    min-width: 630px;
    overflow-y: auto;
  }

  .content-item {
    margin: 10px 0 15px;
  }

  .dropdown-menu {
    min-width: 90px !important;
  }

  label {
    display: inline-block;
    margin-bottom: 5px;
  }
}
</style>
