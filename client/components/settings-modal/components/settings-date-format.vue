<template>
  <div>
    <div class="content">
      <div class="content-item">
        <label for="settingsExample">
          Example
        </label>
        <text-input
          name="settingsExample"
          :readonly="true"
          :value="exampleFormattedDateTime"
        />
      </div>
      <div class="content-item">
        <flex-grid>
          <flex-grid-item grow="1">
            <label for="settingsDateFormat">
              Date format
            </label>
            <v-select
              input-id="settingsDateFormat"
              :on-change="onDateFormatChange"
              :options="dateFormatOptions"
              :value="modalDateFormat"
            />
          </flex-grid-item>
          <flex-grid-item grow="1">
            <label for="settingsTimeFormat">
              Time format
            </label>
            <v-select
              input-id="settingsTimeFormat"
              :on-change="onTimeFormatChange"
              :options="timeFormatOptions"
              :value="modalTimeFormat"
            />
          </flex-grid-item>
          <flex-grid-item grow="1">
            <label for="settingsTimezone">
              Timezone
            </label>
            <v-select
              input-id="settingsTimezone"
              :on-change="onTimezoneChange"
              :options="timezoneOptions"
              :value="modalTimezone"
            />
          </flex-grid-item>
        </flex-grid>
      </div>
    </div>
    <settings-footer
      :submit-enabled="isSettingsChanged"
      @cancel="onClose"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import FlexGrid from '../../flex-grid';
import FlexGridItem from '../../flex-grid-item';
import TextInput from '../../text-input';
import SettingsFooter from './settings-footer';
import { getDatetimeFormattedString } from '~helpers';

export default {
  name: 'settings-date-format',
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
  data() {
    return {
      exampleDate: new Date(),
      modalDateFormat: this.getModalDateFormat(this.dateFormat),
      modalTimeFormat: this.getModalTimeFormat(this.timeFormat),
      modalTimezone: this.getModalTimezone(this.timezone),
    };
  },
  computed: {
    exampleFormattedDateTime() {
      return getDatetimeFormattedString({
        date: this.exampleDate,
        dateFormat: this.modalDateFormat.value,
        timeFormat: this.modalTimeFormat.value,
        timezone: this.modalTimezone.value,
      });
    },
    isDateFormatChanged() {
      return this.modalDateFormat.value !== this.dateFormat;
    },
    isSettingsChanged() {
      return (
        this.isDateFormatChanged ||
        this.isTimeFormatChanged ||
        this.isTimezoneChanged
      );
    },
    isTimeFormatChanged() {
      return this.modalTimeFormat.value !== this.timeFormat;
    },
    isTimezoneChanged() {
      return this.modalTimezone.value !== this.timezone;
    },
  },
  methods: {
    getModalDateFormat(dateFormat) {
      return this.dateFormatOptions.find(({ value }) => dateFormat === value);
    },
    getModalTimeFormat(timeFormat) {
      return this.timeFormatOptions.find(({ value }) => timeFormat === value);
    },
    getModalTimezone(timezone) {
      return this.timezoneOptions.find(({ value }) => timezone === value);
    },
    onClose() {
      this.$emit('close');
    },
    onDateFormatChange(dateFormat) {
      this.modalDateFormat = dateFormat;
    },
    onTimeFormatChange(timeFormat) {
      this.modalTimeFormat = timeFormat;
    },
    onTimezoneChange(timezone) {
      this.modalTimezone = timezone;
    },
    onSubmit() {
      this.$emit('change', {
        ...(this.isDateFormatChanged && {
          dateFormat: this.modalDateFormat.value,
        }),
        ...(this.isTimeFormatChanged && {
          timeFormat: this.modalTimeFormat.value,
        }),
        ...(this.isTimezoneChanged && { timezone: this.modalTimezone.value }),
      });
    },
    setModalDateFormat(dateFormat) {
      this.modalDateFormat = this.getModalDateFormat(dateFormat);
    },
    setModalTimeFormat(timeFormat) {
      this.modalTimeFormat = this.getModalTimeFormat(timeFormat);
    },
    setModalTimezone(timezone) {
      this.modalTimezone = this.getModalTimezone(timezone);
    },
  },
  components: {
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
    'settings-footer': SettingsFooter,
    'text-input': TextInput,
  },
  watch: {
    dateFormat(dateFormat) {
      this.setModalDateFormat(dateFormat);
    },
    timeFormat(timeFormat) {
      this.setModalTimeFormat(timeFormat);
    },
    timezone(timezone) {
      this.setModalTimezone(timezone);
    },
  },
};
</script>
