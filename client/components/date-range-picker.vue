<template>
  <div class="date-range-picker" @focusout="onClickOrFocusOut">
    <v-select
      class="relative-range"
      :value="relativeRange"
      :options="relativeRangeOptions"
      :on-change="onRelativeRangeChange"
      :searchable="false"
    />
    <div class="custom-range" v-if="customVisible">
      <date-picker
        range
        type="datetime"
        v-model="customRange"
        :disabled-date="isDayDisabled"
        :disabled-time="isTimeDisabled"
        @change="onDateRangeChange"
      />
    </div>
  </div>
</template>

<script>
import { DateRange } from 'vue-date-range';
import DatePicker from 'vue2-datepicker';
import moment from 'moment';

const baseRelativeRangeOptions = [
  { label: 'Last 3 hours', value: 'last-3-hours', daysAgo: 0.2 },
  { label: 'Last 24 hours', value: 'last-24-hours', daysAgo: 1 },
  { label: 'Last 3 days', value: 'last-3-days', daysAgo: 3 },
  { label: 'Last 7 days', value: 'last-7-days', daysAgo: 7 },
  { label: 'Last 30 days', value: 'last-30-days', daysAgo: 30 },
  { label: 'Last 3 months', value: 'last-3-months', daysAgo: 90 },
  { label: 'Custom range', value: 'custom', daysAgo: Number.MAX_VALUE },
];

export default {
  props: ['dateRange', 'maxDays'],
  data() {
    return {
      customRange: this.getCustomRange(),
      customVisible: this.isCustom,
      datePickerVisible: false,
      relativeRangeOptions: this.getRelativeRangeOptions()
    };
  },
  created() {
    this.onClickOrFocusOut = e => {
      if (!this.$el.contains(e.relatedTarget || e.target)) {
        this.datePickerVisible = false;
      }
    };
  },
  mounted() {
    document.body.addEventListener('click', this.onClickOrFocusOut);
  },
  destroyed() {
    document.body.removeEventListener('click', this.onClickOrFocusOut);
  },
  computed: {
    isCustom() {
      return typeof this.dateRange !== 'string';
    },
    relativeRange() {
      return this.isCustom
        ? this.relativeRangeOptions[this.relativeRangeOptions.length - 1]
        : this.relativeRangeOptions.find(o => o.value === this.dateRange);
    },
    maxStartDate() {
      return moment()
        .startOf('day')
        .subtract(this.maxDays, 'days');
    },
  },
  methods: {
    getCustomRange() {
      return [
        moment()
          .startOf('minute')
          .subtract(this.maxDays || 30, 'days')
          .toDate(),
        moment()
          .startOf('minute')
          .toDate()
      ];
    },
    getRelativeRangeOptions() {
      let options = baseRelativeRangeOptions;

      if (
        this.maxDays &&
        this.maxDays < 90
      ) {
        options = options
          .slice()
          .filter(o => o.value === 'custom' || o.daysAgo < this.maxDays);
        options.push({
          label: `Last ${this.maxDays} days`,
          value: `last-${this.maxDays}-days`,
          daysAgo: this.maxDays,
        });
        options.sort((a, b) => a.daysAgo - b.daysAgo);
      }

      return options;
    },
    onRelativeRangeChange(r) {
      if (r.value === 'custom') {
        this.customVisible = true;
        const [startDate, endDate] = this.customRange;
        if (startDate && endDate) {
          this.$emit('change', { startTime: startDate, endTime: endDate });
        }
      } else {
        this.customVisible = false;
        this.$emit('change', r.value);
      }
    },
    onDateRangeChange(range) {
      const [startDate, endDate] = range;
      if (!startDate || !endDate) {
        return;
      }
      this.$emit('change', { startTime: startDate, endTime: endDate });
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
  },
  components: {
    daterange: DateRange,
    DatePicker,
  },
  watch: {
    maxDays() {
      this.customRange = this.getCustomRange();
      this.relativeRangeOptions = this.getRelativeRangeOptions();
    },
  },
};
</script>

<style lang="stylus">
@require "../styles/definitions"

.mx-datepicker-popup {
  td {
    text-align: center;
  }
}

.date-range-picker
  display: flex;

  .relative-range {
    width: 160px;
  }

  .custom-range {
    padding-left: 16px;
    position: relative;
  }

  .mx-datepicker-range {
    width: auto;

    input {
      border: 1px solid #e5e5e4;
      border-radius: 0;
      box-shadow: none;
      height: auto;
      margin: 0;
      padding: 12px 30px 11px 10px;
      width: 325px;
    }
  }

  input.form-control {
    width: 170px;
  }

</style>
