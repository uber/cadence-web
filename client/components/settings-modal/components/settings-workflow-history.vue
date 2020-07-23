<template>
  <div>
    <div class="content">
      <div class="content-item">
        <setting-toggle
          label="Enable history event highlighting"
          name="workflowHistoryEventHighlightListEnabled"
          :value="workflowHistoryEventHighlightListEnabled"
          @change="onWorkflowHistoryEventHighlightListEnabledChange"
        />
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

export default {
  name: 'settings-workflow-history',
  props: {
  },
  data() {
    return {
      workflowHistoryEventHighlightListEnabled: true,
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
  },
};
</script>
