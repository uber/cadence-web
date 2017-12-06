<template>
  <div class="date-range-picker" @focusout="onClickOrFocusOut">
    <input type="text" class="date-range" :value="display" @focus="visible = true" @blur>
    <daterange
      v-show="visible"
      :sync-range="dateRange"
      @change="onChange"
      lang="en"
      monthYearFormat="MMMM YYYY"
    />
  </div>
</template>

<script>
import {DateRange} from 'vue-date-range'

export default {
  props: ['dateRange'],
  data() {
    return {
      visible: false,
      display: this.formatDisplay(this.dateRange)
    }
  },
  created() {
    this.onClickOrFocusOut = e => {
      if (!this.$el.contains(e.relatedTarget || e.target)) {
        this.visible = false
      }
    }
  },
  mounted() {
    document.body.addEventListener('click', this.onClickOrFocusOut)
  },
  destroyed() {
    document.body.removeEventListener('click', this.onClickOrFocusOut)
  },
  methods: {
    onChange(r) {
      this.display = this.formatDisplay(r)
      this.$emit('change', r)
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
  position relative

  bkgnd-color = #f2f2f4
  cell-size = 36px
  header-height = 46px
  brdr = 1px solid uber-white-40
  input
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