<template>
  <div class="date-range-picker" @focusout="onClickOrFocusOut">
    <v-select
      :value="relativeRange"
      :options="relativeRangeOptions"
      :on-change="onRelativeRangeChange"
      :searchable="false"
    />
    <div class="custom-range" v-show="customVisible">
      <input type="text" class="date-range" :value="display" @focus="datePickerVisible = true" @blur>
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

export default {
  props: ['dateRange'],
  data() {
    var isCustom = typeof this.dateRange !== 'string',
    customRange = {
      startDate: this.dateRange.startTime || moment().subtract(30, 'days').startOf('day'),
      endDate: this.dateRange.endTime || moment().endOf('day')
    }

    return {
      relativeRange: isCustom ? 'custom' : this.dateRange,
      relativeRangeOptions: [
        { label: 'Last 3 hours', value: 'last-3-hours' },
        { label: 'Last 24 hours', value: 'last-24-hours' },
        { label: 'Last 7 days', value: 'last-7-days' },
        { label: 'Last 30 days', value: 'last-30-days' },
        { label: 'Last 3 months', value: 'last-3-months' },
        { label: 'Custom range', value: 'custom' }
      ],
      customRange,
      customVisible: isCustom,
      datePickerVisible: false,
      display: this.formatDisplay(customRange)
    }
  },
  created() {
    this.onClickOrFocusOut = e => {
      if (!this.$el.contains(e.relatedTarget || e.target)) {
        this.datePickerVisible = false
      }
    }
    this.onR
  },
  mounted() {
    document.body.addEventListener('click', this.onClickOrFocusOut)
  },
  destroyed() {
    document.body.removeEventListener('click', this.onClickOrFocusOut)
  },
  methods: {
    onRelativeRangeChange(r) {
      if (r === 'custom') {
        let [,count,unit] = (this.relativeRangeOptions.map(o => o.value).find(o => o === this.dateRange) || 'last-30-days').split('-')
        this.customRange = { startDate: moment().subtract(count, unit).startOf(unit), endDate: moment().endOf(unit) }
        this.customVisible = true
      } else {
        this.customVisible = false
        this.$emit('change', r)
      }
    },
    onDateRangeChange(r) {
      this.display = this.formatDisplay(r)
      this.$emit('change', { startTime: r.startDate, endTime: r.endDate })
    },
    formatDisplay(d) {
      return `${d.startDate.format('MMM Do')} - ${d.endDate.format('MMM Do')}`
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