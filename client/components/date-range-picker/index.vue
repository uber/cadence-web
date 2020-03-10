<template>
  <div class="date-range-picker">
    <date-picker
      range
      type="datetime"
      v-model="range"
      :clearable="false"
      :disabled-date="isDayDisabled"
      :showTimePanel="showTimePanel"
      :shortcuts="shortcuts"
      :open.sync="open"
      @change="onDateRangeChange"
    >
      <template v-slot:input>
        <input
          placeholder="Date Range"
          readonly
          type="text"
          :value="rangeDisplayText"
        />
      </template>
      <template v-slot:footer>
        <button
          class="mx-btn mx-btn-text"
          @click="onClickTimePanelLabel"
        >
          {{ timePanelLabel }}
        </button>
      </template>
    </date-picker>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import moment from 'moment';
import {
  getMaxStartDate,
  getRange,
  getRangeDisplayText,
  getShortcuts,
  getTimePanelLabel,
  isDayDisabled,
} from './helpers';

export default {
  props: ['dateRange', 'maxDays'],
  data() {
    return {
      range: getRange(this.dateRange),
      open: false,
      showTimePanel: false,
    };
  },
  computed: {
    isDayDisabled() {
      return isDayDisabled(this.maxStartDate);
    },
    maxStartDate() {
      return getMaxStartDate(this.maxDays);
    },
    rangeDisplayText() {
      return getRangeDisplayText(this.dateRange);
    },
    shortcuts() {
      return getShortcuts(this.maxDays, this.onShortcutClick);
    },
    timePanelLabel() {
      return getTimePanelLabel(this.showTimePanel);
    },
  },
  methods: {
    onShortcutClick(range) {
      this.$emit('change', range.value);
      this.open = false;
    },
    onDateRangeChange(range) {
      const [startTime, endTime] = range;

      if (!startTime || !endTime) {
        return;
      }

      this.$emit('change', { startTime, endTime });
    },
    onClickTimePanelLabel() {
      this.showTimePanel = !this.showTimePanel;
    },
  },
  components: {
    DatePicker,
  },
  watch: {
    dateRange() {
      this.range = getRange(this.dateRange);
    },
  },
};
</script>

<style lang="stylus">
.mx-datepicker-popup {
  td {
    text-align: center;
  }

  .mx-datepicker-sidebar {
    width: 125px;

    &+ .mx-datepicker-content {
      margin-left: 125px;
    }
  }
}

.date-range-picker {
  input {
    border: 1px solid #e5e5e4;
    border-radius: 0;
    box-shadow: none;
    cursor: pointer;
    height: auto;
    margin: 0;
    padding: 8px 30px 8px 10px;
    width: 325px;
  }

  .mx-datepicker-range {
    width: auto;
  }
}
</style>
