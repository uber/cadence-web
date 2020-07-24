<template>
  <div class="settings-workflow-history">
    <div class="content">
      <div class="content-item">
        <setting-toggle
          label="Enable history event param highlighting"
          name="workflowHistoryEventHighlightListEnabled"
          :value="workflowHistoryEventHighlightListEnabled"
          @change="onWorkflowHistoryEventHighlightListEnabledChange"
        />
      </div>

      <div class="history-event-param-content" :class="{ 'disabled': !workflowHistoryEventHighlightListEnabled }">

        <div class="content-item">
          <flex-grid align-items="center">
            <flex-grid-item grow="1">
              <h4>History event params</h4>
            </flex-grid-item>
            <flex-grid-item>
              <button-fill
                :disabled="!workflowHistoryEventHighlightListEnabled"
                label="NEW"
              />
            </flex-grid-item>
          </flex-grid>
        </div>

        <div class="content-item"
          v-for="event in workflowHistoryEventHighlightList"
          :key="event.eventType + '_' + event.eventParamName"
        >
          <flex-grid align-items="center">
            <flex-grid-item grow="1">
              <flex-grid align-items="center">
                <flex-grid-item>
                  <v-select
                    :disabled="!workflowHistoryEventHighlightListEnabled || !event.isEnabled"
                    :value="event.eventType"
                    :options="[{ label: 'ActivityTaskScheduled', value: 'ActivityTaskScheduled' }]"
                  />
                </flex-grid-item>
                <flex-grid-item>
                  <text-input
                    :disabled="!workflowHistoryEventHighlightListEnabled || !event.isEnabled"
                    :value="event.eventParamName"
                  />
                </flex-grid-item>
              </flex-grid>
            </flex-grid-item>
            <flex-grid-item>
              <toggle-button
                :disabled="!workflowHistoryEventHighlightListEnabled"
                :labels="true"
                :value="event.isEnabled"
              />
            </flex-grid-item>
            <flex-grid-item>
              <button-icon
                :disabled="!workflowHistoryEventHighlightListEnabled"
                icon="icon_trash"
                size="20px"
              />
            </flex-grid-item>
          </flex-grid>
        </div>
      </div>
    </div>
    <settings-footer
      :apply-enabled="isSettingsChanged"
      @close="onClose"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import ButtonFill from '../../button-fill';
import ButtonIcon from '../../button-icon';
import FlexGrid from '../../flex-grid';
import FlexGridItem from '../../flex-grid-item';
import SettingsFooter from './settings-footer';
import SettingsHeader from './settings-header';
import SettingToggle from '../../setting-toggle';
import TextInput from '../../text-input';
import { ToggleButton } from 'vue-js-toggle-button';

export default {
  name: 'settings-workflow-history',
  props: {
  },
  data() {
    return {
      workflowHistoryEventHighlightListEnabled: true,
      workflowHistoryEventHighlightList: [
        {"eventParamName":"activityId","eventType":"ActivityTaskScheduled","isEnabled":true},
        {"eventParamName":"activityType.name","eventType":"ActivityTaskScheduled","isEnabled":false},
        {"eventParamName":"activityType","eventType":"ActivityTaskScheduled","isEnabled":false}
      ],
    };
  },
  computed: {
    isSettingsChanged() {
      return (
        false
        // this.isDateFormatChanged ||
        // this.isTimeFormatChanged ||
        // this.isTimezoneChanged
      );
    },
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
    onWorkflowHistoryEventHighlightListEnabledChange({ value }) {
      this.workflowHistoryEventHighlightListEnabled = value;
    },
    onSubmit() {
      // this.$emit('change', {
      //   ...(this.isDateFormatChanged && {
      //     dateFormat: this.modalDateFormat.value,
      //   }),
      //   ...(this.isTimeFormatChanged && {
      //     timeFormat: this.modalTimeFormat.value,
      //   }),
      //   ...(this.isTimezoneChanged && { timezone: this.modalTimezone.value }),
      // });
    },
  },
  components: {
    'button-fill': ButtonFill,
    'button-icon': ButtonIcon,
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
    'settings-footer': SettingsFooter,
    'settings-header': SettingsHeader,
    'setting-toggle': SettingToggle,
    'text-input': TextInput,
    'toggle-button': ToggleButton,
  },
};
</script>

<style lang="stylus">
.settings-workflow-history {
  .history-event-param-content {
    &.disabled {
      opacity: 0.3;
    }
  }
}
</style>
