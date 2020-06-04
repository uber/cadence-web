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
        <h3>Time options</h3>
        <div class="content-item">
          <label for="settingsTimeFormat">
            Time format
          </label>
          <v-select
            input-id="settingsTimeFormat"
            :on-change="onTimeFormatChange"
            :options="timeFormatOptions"
            :value="modalTimeFormat"
          />
        </div>
        <div class="content-item">
          <label for="settingsTimezone">
            Timezone
          </label>
          <v-select
            input-id="settingsTimezone"
            :on-change="onTimezoneChange"
            :options="timezoneOptions"
            :value="modalTimezone"
          />
        </div>
      </div>
      <div class="footer">
        <flex-grid align-items="center" justify-content="flex-end">
          <flex-grid-item width="102px">
            <button-fill color="tertiary" label="CANCEL" @click="onCloseClick" />
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
import { ButtonFill, ButtonIcon, FlexGrid, FlexGridItem } from '~components';

export default {
  props: {
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
      modalTimeFormat: this.getModalTimeFormat(this.timeFormat),
      modalTimezone: this.getModalTimezone(this.timezone),
    };
  },
  computed: {
    isSettingsChanged() {
      return this.isTimeFormatChanged || this.isTimezoneChanged;
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
    onTimeFormatChange(timeFormat) {
      this.modalTimeFormat = timeFormat;
    },
    onTimezoneChange(timezone) {
      this.modalTimezone = timezone;
    },
    onSubmitClick() {
      this.$emit('onChange', {
        ...(this.isTimeFormatChanged && { timeFormat: this.modalTimeFormat.value }),
        ...(this.isTimezoneChanged && { timezone: this.modalTimezone.value }),
      });
      this.close();
    },
    resetModalValues() {
      this.setModalTimeFormat(this.timeFormat);
      this.setModalTimezone(this.timezone);
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
  },
  watch: {
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
    min-height: 280px;
    min-width: 400px;
    overflow-y: auto;
  }

  .content-item {
    margin: 15px 0;
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
