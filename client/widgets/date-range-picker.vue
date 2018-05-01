<template>
  <div class="date-range-picker" @focusout="onClickOrFocusOut">
    <v-select
      :value="relativeRange"
      :options="relativeRangeOptions"
      :on-change="onRelativeRangeChange"
      :searchable="false"
    />
    <div class="custom-range" v-show="customVisible">
      <input type="text" class="date-range" :value="customRangeDisplay" @focus="datePickerVisible = true" @blur>
      <daterange
        v-show="datePickerVisible"
        :sync-range="customRange"
        @change="onDateRangeChange"
        lang="en"
        monthYearFormat="MMMM YYYY"
      />
    </div>
  </div>
</template>

<script>
import {DateRange} from 'vue-date-range'
import moment from 'moment'

const relativeRangeOptions = [
  { label: 'Last 3 hours', value: 'last-3-hours' },
  { label: 'Last 24 hours', value: 'last-24-hours' },
  { label: 'Last 7 days', value: 'last-7-days' },
  { label: 'Last 30 days', value: 'last-30-days' },
  { label: 'Last 3 months', value: 'last-3-months' },
  { label: 'Custom range', value: 'custom' }
]

export default {
  props: ['dateRange'],
  data() {
    return {
      relativeRangeOptions,
      customVisible: this.isCustom,
      datePickerVisible: false
    }
  },
  created() {
    this.onClickOrFocusOut = e => {
      if (!this.$el.contains(e.relatedTarget || e.target)) {
        this.datePickerVisible = false
      }
    }
  },
  mounted() {
    document.body.addEventListener('click', this.onClickOrFocusOut)
  },
  destroyed() {
    document.body.removeEventListener('click', this.onClickOrFocusOut)
  },
  computed: {
    isCustom() {
      return typeof this.dateRange !== 'string'
    },
    relativeRange() {
      return this.isCustom ?
        relativeRangeOptions[relativeRangeOptions.length - 1] :
        relativeRangeOptions.find(o => o.value === this.dateRange)
    },
    customRange() {
      return {
        startDate: (this.dateRange && this.dateRange.startTime) || moment().subtract(30, 'days').startOf('day'),
        endDate: (this.dateRange && this.dateRange.endTime) || moment().endOf('day')
      }
    },
    customRangeDisplay(d) {
      return `${this.customRange.startDate.format('MMM Do')} - ${this.customRange.endDate.format('MMM Do')}`
    }
  },
  methods: {
    onRelativeRangeChange(r) {
      if (r.value === 'custom') {
        this.customVisible = true
      } else {
        this.customVisible = false
        this.$emit('change', r.value)
      }
    },
    onDateRangeChange(r) {
      this.display = this.formatDisplay(r)
      this.$emit('change', { startTime: r.startDate, endTime: r.endDate })
    }
  },
  components: {
    daterange: DateRange
  }
}
</script>

<style lang="stylus">
@require "../styles/definitions"

.date-range-picker
  display flex

  bkgnd-color = #f2f2f4
  cell-size = 36px
  header-height = 46px
  brdr = 1px solid uber-white-40
  .custom-range
    position relative
    flex 0 0 252px
  input, .custom-range
    width 252px
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