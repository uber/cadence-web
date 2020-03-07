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

      <!-- <input
        type="text"
        class="date-range"
        :value="customRangeDisplay"
        @focus="datePickerVisible = true"
      />
      <daterange
        v-show="datePickerVisible"
        :sync-range="customRange"
        @change="onDateRangeChange"
        lang="en"
        :disabled-func="isDayDisabled"
        monthYearFormat="MMMM YYYY"
      /> -->


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

  bkgnd-color = #f2f2f4
  cell-size = 36px
  header-height = 46px
  brdr = 1px solid uber-white-40

  .relative-range {
    width: 160px;
  }
  .custom-range {
    padding-left: 10px;
    position: relative;

    input {
      height: auto;
      margin: 0;
      padding: 12px 30px 11px 10px;
      width: 325px;
    }
  }
  input.form-control {
    width: 170px;
  }
  .ayou-date-range
    position absolute
    box-shadow 1px 1px 2px rgba(0,0,0,0.2)
    top calc(100% + 26px)
    left 10px
    width 254px
    &::before
      position absolute
      content ' '
      background-color bkgnd-color
      width 32px
      height 32px
      border brdr
      left calc(50% - 16px)
      top -16px
      transform rotate(45deg)

    .ayou-calendar, .month-year .month-button
      background-color bkgnd-color
    .month-year
      height header-height
      display flex
      border brdr
      border-bottom none
      .month-button i
        border-color black
      > span
        flex 1 1 auto
        z-index 5
        background-color bkgnd-color
      span
        display inline-block
        line-height header-height
        vertical-align center
        font-size 16px
        font-weight 500

    .week-days span, .days span, .days div
      font-size 10px
    .days
      background-color white
      border brdr
      border-bottom none
      div.solar
        width 100%
        height 100%
        line-height cell-size
      .ayou-day-cell
        padding 0
        width cell-size
        height cell-size
        line-height cell-size
        border-bottom brdr
        border-right brdr
        &.in-range
          range-color = alpha(uber-blue, 85%)
          border-bottom-color range-color
          border-right-color range-color
          .solar
            border-radius 0
            background-color range-color
          &.start-day, &.end-day
            font-weight 500
            background-color uber-blue
        &:nth-child(7n)
          border-right none

</style>
