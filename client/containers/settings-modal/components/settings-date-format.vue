<script>
// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  FlexGrid,
  FlexGridItem,
  SelectInput,
  SettingsFooter,
  TextInput,
} from '~components';
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
    'select-input': SelectInput,
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

<template>
  <div>
    <div class="content">
      <div class="content-item">
        <text-input
          label="Example"
          name="settingsExample"
          :readonly="true"
          :value="exampleFormattedDateTime"
        />
      </div>
      <div class="content-item">
        <flex-grid>
          <flex-grid-item grow="1">
            <select-input
              label="Date format"
              name="settingsDateFormat"
              :options="dateFormatOptions"
              :value="modalDateFormat"
              @change="onDateFormatChange"
            />
          </flex-grid-item>
          <flex-grid-item grow="1">
            <select-input
              label="Time format"
              name="settingsTimeFormat"
              :options="timeFormatOptions"
              :value="modalTimeFormat"
              @change="onTimeFormatChange"
            />
          </flex-grid-item>
          <flex-grid-item grow="1">
            <select-input
              label="Timezone"
              name="settingsTimezone"
              :options="timezoneOptions"
              :value="modalTimezone"
              @change="onTimezoneChange"
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
