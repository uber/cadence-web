<template>
  <div class="date-range-picker">
    <div class="custom-range">

    </div>
    <date-picker
      range
      type="datetime"
      v-model="range"
      :clearable="false"
      :disabled-date="isDayDisabled"
      :showTimePanel="showTimePanel"
      :shortcuts="relativeRangeOptions"
      :open.sync="open"
      @change="onDateRangeChange"
      @clear="onDateRangeClear"
    >
      <template v-slot:input>
        <input placeholder="Date Range" readonly type="text" :value="formattedRange" />
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
  { text: 'Last 1 second', value: 'last-1-second', daysAgo: 0.00001 },
  { text: 'Last 10 seconds', value: 'last-10-seconds', daysAgo: 0.0001 },
  { text: 'Last 60 seconds', value: 'last-60-seconds', daysAgo: 0.0007 },
  { text: 'Last 10 minutes', value: 'last-10-minutes', daysAgo: 0.007 },
  { text: 'Last 60 minutes', value: 'last-60-minutes', daysAgo: 0.041 },
  { text: 'Last 3 hours', value: 'last-3-hours', daysAgo: 0.125 },
  { text: 'Last 24 hours', value: 'last-24-hours', daysAgo: 1 },
  { text: 'Last 3 days', value: 'last-3-days', daysAgo: 3 },
  { text: 'Last 7 days', value: 'last-7-days', daysAgo: 7 },
  { text: 'Last 30 days', value: 'last-30-days', daysAgo: 30 },
  { text: 'Last 3 months', value: 'last-3-months', daysAgo: 90 },
];

const dateTimeFormat = 'MM/DD/YYYY HH:mm:ss';

const ALLOWED_PERIOD_TYPES = [
  'second',
  'seconds',
  'minute',
  'minutes',
  'hour',
  'hours',
  'day',
  'days',
  'month',
  'months',
];

export default {
  props: ['dateRange', 'maxDays'],
  data() {
    return {
      range: this.getRange(),
      open: false,
      showTimePanel: false,
    };
  },
  computed: {
    formattedRange() {
      if (!this.dateRange) {
        return '';
      }

      if (typeof this.dateRange !== 'string') {
        return `${this.dateRange.startTime.format(dateTimeFormat)} - ${this.dateRange.endTime.format(dateTimeFormat)}`;
      }

      const [, count, unit] = this.dateRange.split('-');

      const parsedCount = parseInt(count);
      if (!parsedCount) {
        return '';
      }

      if (!ALLOWED_PERIOD_TYPES.includes(unit)) {
        return '';
      }

      return `Last ${parsedCount} ${unit}`;
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
    getRange() {
      if (!this.dateRange) {
        return [];
      }

      if (typeof this.dateRange !== 'string') {
        return [this.dateRange.startTime.toDate(), this.dateRange.endTime.toDate()];
      }

      const [, count, unit] = this.dateRange.split('-');

      const startTime = moment()
          .subtract(count, unit)
          .startOf(unit)
          .toDate();

      const endTime = moment()
          .endOf(unit)
          .toDate();

      return [startTime, endTime];
    },
    isDayDisabled(date) {
      const momentDate = moment(date);

      if (this.maxStartDate) {
        if (momentDate.isBefore(this.maxStartDate)) {
          return true;
        }
      }

      return momentDate.isAfter(moment().endOf('day'));
    },
    onRelativeRangeChange(r) {
      this.$emit('change', r.value);
      this.open = false;
    },
    onDateRangeChange(range) {
      const [startTime, endTime] = range;
      if (!startTime || !endTime) {
        return;
      }
      this.$emit('change', { startTime, endTime });
    },
    onDateRangeClear() {
      this.$emit('change', null);
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
      this.range = this.getRange();
    },
    maxDays() {
      this.range = this.getRange();
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
