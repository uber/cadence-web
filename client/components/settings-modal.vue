<template>
  <modal name="settings-modal" @before-close="onBeforeClose">
    <div class="settings-modal">
      <div class="header">
        <flex-grid align-items="center">
          <flex-grid-item grow="1">
            <h2>Settings</h2>
          </flex-grid-item>
          <flex-grid-item width="40px">
            <button-icon
              icon="icon_delete-thin"
              size="30px"
              @click="onCloseClick"
            />
          </flex-grid-item>
        </flex-grid>
      </div>
      <div class="content">
        <h3>DateTime options</h3>
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
      <div class="footer">
        <flex-grid align-items="center" justify-content="flex-end">
          <flex-grid-item width="102px">
            <button-fill
              color="tertiary"
              label="CANCEL"
              @click="onCloseClick"
            />
          </flex-grid-item>
          <flex-grid-item>
            <button-fill
              :disabled="!isSettingsChanged"
              label="APPLY"
              @click="onSubmitClick"
            />
          </flex-grid-item>
        </flex-grid>
      </div>
    </div>
  </modal>
</template>

<script>
import ButtonFill from './button-fill';
import ButtonIcon from './button-icon';
import FlexGrid from './flex-grid';
import FlexGridItem from './flex-grid-item';
import TextInput from './text-input';
import { getDatetimeFormattedString } from '~helpers';

export default {
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
    close() {
      this.$modal.hide('settings-modal');
    },
    getModalDateFormat(dateFormat) {
      return this.dateFormatOptions.find(({ value }) => dateFormat === value);
    },
    getModalTimeFormat(timeFormat) {
      return this.timeFormatOptions.find(({ value }) => timeFormat === value);
    },
    getModalTimezone(timezone) {
      return this.timezoneOptions.find(({ value }) => timezone === value);
    },
    onCloseClick() {
      this.close();
    },
    onBeforeClose() {
      this.resetModalValues();
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
    onSubmitClick() {
      this.$emit('onChange', {
        ...(this.isDateFormatChanged && {
          dateFormat: this.modalDateFormat.value,
        }),
        ...(this.isTimeFormatChanged && {
          timeFormat: this.modalTimeFormat.value,
        }),
        ...(this.isTimezoneChanged && { timezone: this.modalTimezone.value }),
      });
      this.close();
    },
    resetModalValues() {
      this.setModalDateFormat(this.dateFormat);
      this.setModalTimeFormat(this.timeFormat);
      this.setModalTimezone(this.timezone);
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
    'button-fill': ButtonFill,
    'button-icon': ButtonIcon,
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
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

<style lang="stylus">
.settings-modal {
  .content {
    min-height: 320px;
    min-width: 400px;
    overflow-y: auto;
  }

  .content-item {
    margin: 15px 0;
  }

  .dropdown-menu {
    min-width: 90px !important;
  }

  .footer {
    padding-top: 15px;
  }

  label {
    display: inline-block;
    margin-bottom: 5px;
  }

  .header {
    padding-bottom: 15px;
  }
}
</style>
