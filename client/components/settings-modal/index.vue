<template>
  <modal
    name="settings-modal"
    @before-close="onBeforeClose"
    @before-open="onBeforeOpen"
  >
    <div class="settings-modal">
      <flex-grid>
        <flex-grid-item margin="20px">
          <settings-list
            :active-view="activeView"
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
import SettingsList from './components/settings-list';
import SettingsWorkflowHistory from './components/settings-workflow-history';
import { SETTINGS_VIEW_LIST } from './constants';

export default {
  data() {
    return {
      activeView: null,
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
      return this.activeView === 'settings-date-format';
    },
    settingsWorkflowHistoryViewActive() {
      return this.activeView === 'settings-workflow-history';
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
      this.activeView = null;
    },
    onBeforeOpen() {
      this.activeView = 'settings-date-format';
    },
    onSettingsChange(event) {
      this.$emit('change', event);
      this.close();
    },
    onSettingsListChange({ viewName }) {
      this.activeView = viewName;
    },
  },
  components: {
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
    'settings-date-format': SettingsDateFormat,
    'settings-list': SettingsList,
    'settings-workflow-history': SettingsWorkflowHistory,
  },
};
</script>

<style lang="stylus">
.settings-modal {
  .content {
    min-height: 320px;
    min-width: 440px;
    overflow-y: auto;
  }

  .content-item {
    margin: 15px 0;
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
