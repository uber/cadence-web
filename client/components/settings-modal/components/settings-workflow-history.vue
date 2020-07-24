<template>
  <div class="settings-workflow-history">
    <div class="content">
      <div class="content-item">
        <setting-toggle
          label="Enable history event param highlighting"
          name="workflowHistoryEventHighlightListEnabled"
          :value="modalWorkflowHistoryEventHighlightListEnabled"
          @change="onWorkflowHistoryEventHighlightListEnabledChange"
        />
      </div>

      <div class="history-event-param-content" :class="{ 'disabled': !modalWorkflowHistoryEventHighlightListEnabled }">

        <div class="content-item">
          <flex-grid align-items="center">
            <flex-grid-item grow="1">
              <h4>History event params</h4>
            </flex-grid-item>
            <flex-grid-item>
              <button-fill
                :disabled="!modalWorkflowHistoryEventHighlightListEnabled"
                label="NEW"
                @click="onWorkflowHistoryEventHighlightListAdd"
              />
            </flex-grid-item>
          </flex-grid>
        </div>

        <div class="content-item"
          v-for="event in modalWorkflowHistoryEventHighlightList"
          :key="event.id"
        >
          <flex-grid align-items="center">
            <flex-grid-item grow="1">
              <flex-grid align-items="center">
                <flex-grid-item>
                  <v-select
                    :disabled="!modalWorkflowHistoryEventHighlightListEnabled || !event.isEnabled"
                    :value="event.eventType"
                    :options="[{ label: 'ActivityTaskScheduled', value: 'ActivityTaskScheduled' }]"
                  />
                </flex-grid-item>
                <flex-grid-item>
                  <text-input
                    :disabled="!modalWorkflowHistoryEventHighlightListEnabled || !event.isEnabled"
                    :value="event.eventParamName"
                  />
                </flex-grid-item>
              </flex-grid>
            </flex-grid-item>
            <flex-grid-item>
              <toggle-button
                :disabled="!modalWorkflowHistoryEventHighlightListEnabled"
                :labels="true"
                :value="event.isEnabled"
              />
            </flex-grid-item>
            <flex-grid-item>
              <button-icon
                :disabled="!modalWorkflowHistoryEventHighlightListEnabled"
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
import {
  workflowHistoryEventHighlightListAddOrUpdate,
  workflowHistoryEventHighlightListRemove,
} from '~helpers';

export default {
  name: 'settings-workflow-history',
  props: {
    workflowHistoryEventHighlightListEnabled: {
      type: Boolean,
      default: true, // TODO - Remove once hooked up.
    }
  },
  data() {
    return {
      isWorkflowHistoryEventHighlightListChanged: false,
      modalWorkflowHistoryEventHighlightListEnabled: true,
      modalWorkflowHistoryEventHighlightList: [
        {"id": "1595610041952", "eventParamName":"activityId","eventType":"ActivityTaskScheduled","isEnabled":true},
        {"id": "1595610044312", "eventParamName":"activityType.name","eventType":"ActivityTaskScheduled","isEnabled":false},
        {"id": "1595610057394", "eventParamName":"activityType","eventType":"ActivityTaskScheduled","isEnabled":false}
      ],
    };
  },
  computed: {
    isWorkflowHistoryEventHighlightListEnabledChanged() {
      console.log('isWorkflowHistoryEventHighlightListEnabledChanged = ',
        this.modalWorkflowHistoryEventHighlightListEnabled !== this.workflowHistoryEventHighlightListEnabled,
        this.modalWorkflowHistoryEventHighlightListEnabled,
        this.workflowHistoryEventHighlightListEnabled,
      );
      return this.modalWorkflowHistoryEventHighlightListEnabled !== this.workflowHistoryEventHighlightListEnabled;
    },
    isSettingsChanged() {
      console.log('isSettingsChanged = ', this.isWorkflowHistoryEventHighlightListChanged ||
        this.isWorkflowHistoryEventHighlightListEnabledChanged,
        this.isWorkflowHistoryEventHighlightListChanged,
        this.isWorkflowHistoryEventHighlightListEnabledChanged);

      return (
        this.isWorkflowHistoryEventHighlightListChanged ||
        this.isWorkflowHistoryEventHighlightListEnabledChanged
      );
    },
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
    onWorkflowHistoryEventHighlightListChange({ eventParamName, eventType, id, isEnabled }) {
      this.modalWorkflowHistoryEventHighlightList = workflowHistoryEventHighlightListAddOrUpdate({
        eventParamName,
        eventType,
        id,
        isEnabled,
        workflowHistoryEventHighlightList: this.modalWorkflowHistoryEventHighlightList,
      });
      this.isWorkflowHistoryEventHighlightListChanged = true;
    },
    onWorkflowHistoryEventHighlightListRemove({ id }) {
      this.modalWorkflowHistoryEventHighlightList = workflowHistoryEventHighlightListRemove({
        id,
        workflowHistoryEventHighlightList: this.modalWorkflowHistoryEventHighlightList,
      });
      this.isWorkflowHistoryEventHighlightListChanged = true;
    },
    onWorkflowHistoryEventHighlightListAdd() {
      this.modalWorkflowHistoryEventHighlightList = workflowHistoryEventHighlightListAddOrUpdate({
        eventParamName: '',
        eventType: 'ActivityTaskScheduled', // TODO - have defaults here...
        id: new Date().getTime(),
        isEnabled: true,
        workflowHistoryEventHighlightList: this.modalWorkflowHistoryEventHighlightList,
      });
      this.isWorkflowHistoryEventHighlightListChanged = true;
    },
    onWorkflowHistoryEventHighlightListEnabledChange({ value }) {
      this.modalWorkflowHistoryEventHighlightListEnabled = value;
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
