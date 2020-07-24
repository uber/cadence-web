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
      <flex-grid>
        <flex-grid-item margin="20px">
          <settings-list
            :active-view-name="activeView.name"
            :view-list="viewList"
            @change="onSettingsListChange"
          />
        </flex-grid-item>
        <flex-grid-item>
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
          <settings-workflow-history
            v-if="settingsWorkflowHistoryViewActive"
            @change="onSettingsChange"
            @close="onClose"
          />
        </flex-grid-item>
      </flex-grid>
    </div>
  </modal>
</template>

<script>
import FlexGrid from '../flex-grid';
import FlexGridItem from '../flex-grid-item';
import SettingsDateFormat from './components/settings-date-format';
import SettingsHeader from './components/settings-header';
import SettingsList from './components/settings-list';
import SettingsWorkflowHistory from './components/settings-workflow-history';
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
  },
  computed: {
    settingsDateFormatViewActive() {
      return this.activeView.name === 'settings-date-format';
    },
    settingsWorkflowHistoryViewActive() {
      return this.activeView.name === 'settings-workflow-history';
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
    onSettingsListChange({ view }) {
      this.activeView = view;
    },
  },
  components: {
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
    'settings-date-format': SettingsDateFormat,
    'settings-list': SettingsList,
    'settings-workflow-history': SettingsWorkflowHistory,
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
