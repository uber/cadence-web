<template>
  <div class="date-range-picker">
    <div class="custom-range">

    </div>
    <date-picker
      range
      type="datetime"
      v-model="customRange"
      :disabled-date="isDayDisabled"
      :disabled-time="isTimeDisabled"

      :showTimePanel="showTimePanel"
      :shortcuts="relativeRangeOptions"
      :open.sync="open"
      @change="onDateRangeChange"
      @clear="onDateRangeClear"
    >
      <template v-slot:input>
        <input readonly type="text" :value="formattedRange" />
      </template>
      <template v-slot:footer>
        <button class="mx-btn mx-btn-text" @click="onClickTimePanelLabel">
          {{ showTimePanel ? 'select date' : 'select time' }}
        </button>
      </template>
    </date-picker>
  </div>
</template>

<script>
import { DateRange } from 'vue-date-range';
import DatePicker from 'vue2-datepicker';
import moment from 'moment';

const baseRelativeRangeOptions = [
  { text: 'Last 3 hours', value: 'last-3-hours', daysAgo: 0.125 },
  { text: 'Last 24 hours', value: 'last-24-hours', daysAgo: 1 },
  { text: 'Last 3 days', value: 'last-3-days', daysAgo: 3 },
  { text: 'Last 7 days', value: 'last-7-days', daysAgo: 7 },
  { text: 'Last 30 days', value: 'last-30-days', daysAgo: 30 },
  { text: 'Last 3 months', value: 'last-3-months', daysAgo: 90 },
];

const dateTimeFormat = 'MM/DD/YYYY HH:mm:ss';

export default {
  props: ['dateRange', 'maxDays'],
  data() {
    return {
      isCleared: false,
      customRange: this.getCustomRange(),
      open: false,
      showTimePanel: false,
    };
  },
  computed: {
    isCustom() {
      return typeof this.dateRange !== 'string';
    },
    formattedRange() {
      if (this.isCleared) {
        return '';
      }

      if (this.isCustom) {
        return `${this.dateRange.startTime.format(dateTimeFormat)} - ${this.dateRange.endTime.format(dateTimeFormat)}`;
      }

      const relativeRangeOption = this.relativeRangeOptions.find(o => o.value === this.dateRange);
      if (!relativeRangeOption) {
        return '';
      }

      return relativeRangeOption.text;
    },
    relativeRange() {
      return this.isCustom
        ? this.relativeRangeOptions[this.relativeRangeOptions.length - 1]
        : this.relativeRangeOptions.find(o => o.value === this.dateRange);
    },
    relativeRangeOptions() {
      let options = baseRelativeRangeOptions.slice();

      if (
        this.maxDays &&
        this.maxDays < 90
      ) {
        options = options
          .filter(o => o.daysAgo < this.maxDays);

        const option = {
          daysAgo: this.maxDays,
          text: `Last ${this.maxDays} days`,
          value: `last-${this.maxDays}-days`,
        };

        options.push(option);
        options.sort((a, b) => a.daysAgo - b.daysAgo);
      }

      options = options.map((option) => ({
        ...option,
        onClick: () => this.onRelativeRangeChange(option),
      }));

      return options;
    },
    maxStartDate() {
      return moment()
        .startOf('day')
        .subtract(this.maxDays, 'days');
    },
  },
  methods: {
    getCustomRange() {
      if (typeof this.dateRange !== 'string') {
        return [this.dateRange.startTime.toDate(), this.dateRange.endTime.toDate()];
      }

      const rangeOption = baseRelativeRangeOptions.find(o => o.value === this.dateRange)
      if (!rangeOption) {
        return [];
      }

      const rangeDateTime = moment()
        .subtract(rangeOption.daysAgo * 24, 'hours')
        .toDate();

      const now = moment().toDate();
      console.log('relative range = Ago:', rangeOption.daysAgo, 'range: ', [rangeDateTime, now]);
      return [rangeDateTime, now];
    },
    isDayDisabled(date) {
      const momentDate = moment(date);

      if (this.maxDays) {
        if (momentDate.isBefore(this.maxStartDate)) {
          return true;
        }
      }

      return momentDate.isAfter(moment().endOf('day'));
    },
    isTimeDisabled(date) {
      const momentDate = moment(date);
      return momentDate.isAfter(moment().endOf('minute'));
    },
    onRelativeRangeChange(r) {
      this.$emit('change', r.value);
      this.open = false;
    },
    onDateRangeChange(range) {
      const [startDate, endDate] = range;
      if (!startDate || !endDate) {
        return;
      }
      this.$emit('change', { startTime: startDate, endTime: endDate });
    },
    onDateRangeClear() {
      this.isCleared = true;
      this.customRange = [];
    },
    onClickTimePanelLabel() {
      this.showTimePanel = !this.showTimePanel;
    },
  },
  components: {
    daterange: DateRange,
    DatePicker,
  },
  watch: {
    dateRange() {
      console.log('dateRange = ', this.dateRange);
      this.isCleared = false;
      this.customRange = this.getCustomRange();
    },
    maxDays() {
      this.customRange = this.getCustomRange();
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
    width: 110px;

    &+ .mx-datepicker-content {
      margin-left: 110px !important;
    }
  }
}

.date-range-picker {
  input {
    border: 1px solid #e5e5e4;
    border-radius: 0;
    box-shadow: none;
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
