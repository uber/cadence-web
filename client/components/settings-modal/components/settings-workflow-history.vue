<template>
  <div>
    <settings-header
      title="Workflow History Settings"
      @close="onClose"
    />
    <div class="content">
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
import TextInput from '../../text-input';

export default {
  name: 'settings-workflow-history',
  props: {
  },
  data() {
    return {
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
    'text-input': TextInput,
  },
};
</script>
