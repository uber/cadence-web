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
      @clear="onDateRangeClear"
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
        <button class="mx-btn mx-btn-text" @click="onClickTimePanelLabel">
          {{ showTimePanel ? 'select date' : 'select time' }}
        </button>
      </template>
    </date-picker>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import moment from 'moment';
import {
  ALLOWED_PERIOD_TYPES,
  DATETIME_FORMAT,
  RANGE_OPTIONS,
} from './constants';
import {
  getRange,
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
    rangeDisplayText() {
      if (!this.dateRange) {
        return '';
      }

      if (typeof this.dateRange !== 'string') {
        return `${this.dateRange.startTime.format(
          DATETIME_FORMAT
        )} - ${this.dateRange.endTime.format(DATETIME_FORMAT)}`;
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
    shortcuts() {
      let options = RANGE_OPTIONS.slice();

      if (this.maxDays && this.maxDays < 90) {
        options = options.filter(o => o.daysAgo < this.maxDays);

        const option = {
          daysAgo: this.maxDays,
          text: `Last ${this.maxDays} days`,
          value: `last-${this.maxDays}-days`,
        };

        options.push(option);
        options.sort((a, b) => a.daysAgo - b.daysAgo);
      }

      options = options.map(option => ({
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
      this.range = getRange(this.dateRange);
    },
    maxDays() {
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
