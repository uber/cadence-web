<template>
  <section :class="{ history: true, loading: $parent.historyLoading, 'has-results': !!$parent.results.length, 'split-enabled': true }">
    <header class="controls">
      <div class="view-format">
        <label for="format">View Format</label>
        <div class="view-formats">
          <a href="#" class="compact" @click.prevent="setFormat('compact')" :class="format === 'compact' ? 'active' : ''">Compact</a>
          <a href="#" class="grid" @click.prevent="setFormat('grid')" :class="format === 'grid' ? 'active' : ''">Grid</a>
          <a href="#" class="json" @click.prevent="setFormat('json')" :class="format === 'json' ? 'active' : ''">JSON</a>
        </div>
      </div>
      <div class="actions">
        <a class="export" :href="$parent.baseAPIURL + '/export'" :download="exportFilename">Export</a>
      </div>
    </header>

    <Split class="split-panel" direction="vertical" @onDrag="onSplitResize" @onDragStart="enableSplitting" v-if="!showNoResults && !$parent.historyError" ref="splitPanel">
      <SplitArea
        class="timeline-split"
        :min-size="splitSizeMinSet[0]"
        :size="splitSizeSet[0]"
      >
        <timeline :events="timelineEvents" :selected-event-id="eventId" v-if="format !== 'json'" />
      </SplitArea>
      <SplitArea
        class="view-split"
        :min-size="splitSizeMinSet[1]"
        ref="viewSplit"
        :size="splitSizeSet[1]"
      >
        <section v-snapscroll class="results" ref="results">
          <div class="table" v-if="format === 'grid' && showTable" :class="{ compact: compactDetails }">
            <div class="thead" ref="thead">
              <div class="th col-id">ID</div>
              <div class="th col-type">
                Type
                <v-select
                  class="eventType"
                  value="All"
                  :options="eventTypes"
                  :on-change="setEventType"
                  :searchable="false"
                />
              </div>
              <div class="th col-time">
                <a class="elapsed" :href="tsFormat === 'elapsed' ? null : '#'" @click.prevent="setTsFormat('elapsed')">Elapsed</a> /
                <a class="ts" :href="tsFormat === 'elapsed' ? '#' : null" @click.prevent="setTsFormat('ts')">Time</a>
              </div>
              <div class="th col-summary">
                <a class="summary" :href="compactDetails ? null : '#'" @click.prevent="setCompactDetails(true)">Summary</a> /
                <a class="details" :href="compactDetails ? '#' : null" @click.prevent="setCompactDetails(false)">Full Details</a>
              </div>
            </div>
            <div class="spacer" />
            <DynamicScroller
              key-field="eventId"
              :items="filteredEvents"
              :min-item-size="38"
              ref="scrollerGrid"
              style="height: 0px;"
            >
              <template v-slot="{ item, index, active }">
                <DynamicScrollerItem
                  class="scroller-item"
                  :active="active"
                  :data-active="active"
                  :data-index="index"
                  :item="item"
                >
                  <div
                    class="tr"
                    :class="{ active: item.expanded, odd: index % 2 === 1 }"
                    :data-event-type="item.eventType"
                    :data-event-id="item.eventId"
                    @click.prevent="$router.replaceQueryParam('eventId', item.eventId)"
                  >
                    <div class="td col-id">{{item.eventId}}</div>
                    <div class="td col-type">{{item.eventType}}</div>
                    <div class="td col-time">{{timeCol(item && item.timestamp, index)}}</div>
                    <div class="td col-summary">
                      <event-details
                        :event="item"
                        :compact="compactDetails && !item.expanded"
                        :highlight="$parent.results.length < 100"
                      />
                    </div>
                  </div>
                </DynamicScrollerItem>
              </template>
            </DynamicScroller>
          </div>
          <prism class="json" language="json" v-if="format === 'json' && $parent.results.length < 90">{{JSON.stringify($parent.results, null, 2)}}</prism>
          <pre class="json" v-if="format === 'json' && $parent.results.length >= 90">{{JSON.stringify($parent.results, null, 2)}}</pre>
          <div class="compact-view" v-if="format === 'compact'">
            <RecycleScroller
              class="scroller-compact"
              key-field="id"
              :items="timelineEvents"
              :item-size="70"
              ref="scrollerCompact"
              style="height: 0px;"
            >
              <template v-slot="{ item }">
                <div
                  :class="`timeline-event ${item.className || ''} ${(item === selectedTimelineEvent ? ' vis-selected' : '')}`"
                  @click.prevent="selectTimelineEvent(item)"
                >
                  <span class="event-title">{{item.content}}</span>
                  <details-list :item="item.details" :title="item.content" />
                </div>
              </template>
            </RecycleScroller>
            <div class="selected-event-details" v-if="selectedTimelineEvent" :class="{ active: !!selectedTimelineEvent }">
              <a href="#" class="close" @click.prevent="deselectEvent"></a>
              <span class="event-title" v-if="!selectedTimelineEvent.titleLink">{{selectedTimelineEvent.content}}</span>
              <router-link class="event-title" v-if="selectedTimelineEvent.titleLink" :to="selectedTimelineEvent.titleLink">{{selectedTimelineEvent.content}}</router-link>
              <details-list class="timeline-details" :item="selectedTimelineEvent.details" :title="selectedTimelineEvent.content" />
              <div class="event-tabs">
                <span>Events</span>
                <a href="#"
                  :class="'event' + (eventId === eid ? ' active' : '')"
                  v-for="eid in selectedTimelineEvent.eventIds"
                  :key="eid"
                  @click.prevent="$router.replaceQueryParam('eventId', eid)"
                  :data-event-id="eid">
                    {{$parent.results.find(e => e.eventId === eid).eventType}}
                </a>
              </div>
              <details-list class="event-details" :item="selectedEventDetails" :title="`${selectedTimelineEvent.content} - ${selectedEvent.eventType}`" />
            </div>
          </div>
        </section>
      </SplitArea>
    </Split>

    <span class="error" v-if="$parent.historyError">{{$parent.historyError}}</span>
    <span class="no-results" v-if="showNoResults">No Results</span>
  </section>
</template>

<script>
import moment from 'moment'
import eventDetails from './event-details.vue'
import Prism from 'vue-prism-component'
import { DynamicScroller, DynamicScrollerItem, RecycleScroller } from 'vue-virtual-scroller';
import timeline from './timeline.vue'
import mapTimelineEvents from './timeline-events'
import debounce from 'lodash-es/debounce'
import omit from 'lodash-es/omit'


export default {
  data() {
    return {
      tsFormat: localStorage.getItem(`${this.$route.params.domain}:history-ts-col-format`) || 'elapsed',
      compactDetails: localStorage.getItem(`${this.$route.params.domain}:history-compact-details`) === 'true',
      splitEnabled: false,
      eventType: "",
      eventTypes: [
        { value: 'All', label: 'All' },
        { value: 'Decision', label: 'Decision' },
        { value: 'Activity', label: 'Activity' },
        { value: 'Signal', label: 'Signal' },
        { value: 'Timer', label: 'Timer' },
        { value: 'ChildWorkflow', label: 'ChildWorkflow' },
        { value: 'Workflow', label: 'Workflow' },
      ],
      splitSizeSet: [20, 80],
      splitSizeMinSet: [0, 0],
    }
  },
  props: ['format', 'eventId'],
  created() {
    this.onResizeWindow = debounce(() => {
      const { scrollerCompact, scrollerGrid, thead, viewSplit } = this.$refs;
      const scroller = this.isGrid ? scrollerGrid : scrollerCompact;
      if (!scroller) {
        return;
      }
      const offsetHeight = this.isGrid ? thead.offsetHeight : 0;
      const viewSplitHeight = viewSplit.$el.offsetHeight;
      const scrollerHeight = viewSplitHeight - offsetHeight;
      scroller.$el.style.height = `${scrollerHeight}px`;
    }, 5);
  },
  mounted() {
    this.$watch(
      () => `${this.$parent.results.length}${this.tsFormat.length}${this.$route.query.format}${this.compactDetails}`,
      this.onResizeWindow,
      { immediate: true }
    );
    window.addEventListener('resize', this.onResizeWindow);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResizeWindow);
  },
  computed: {
    timelineEvents() {
      return mapTimelineEvents(this.$parent.results)
    },
    selectedTimelineEvent() {
      return this.timelineEvents.find(te => te.eventIds.includes(this.eventId))
    },
    selectedEvent() {
      return this.$parent.results.find(e => e.eventId == this.eventId)
    },
    selectedEventDetails() {
      if (!this.selectedEvent) return {}
      return Object.assign({
        timestamp: this.selectedEvent.timestamp.format('MMM Do h:mm:ss a'),
        eventId: this.selectedEvent.eventId
      }, this.selectedEvent.details)
    },
    showTable() {
      return !this.$parent.historyError && (this.$parent.historyLoading || this.$parent.results.length)
    },
    showNoResults() {
      return !this.$parent.historyError && !this.$parent.historyLoading && this.$parent.results.length === 0
    },
    exportFilename() {
      return `${this.$route.params.workflowId.replace(/[\\~#%&*{}\/:<>?|\"-]/g, ' ')} - ${this.$route.params.runId}.json`
    },
    filteredEvents() {
      const { eventId, eventType } = this;
      const formattedResults = this.$parent.results.map((item) => Object.assign({}, item, {
        expanded: item.eventId === eventId,
      }));
      return eventType && eventType !== "All" ?
        formattedResults.filter(result => result.eventType.includes(eventType)) :
        formattedResults;
    },
    filteredEventIdToIndex() {
      return this.filteredEvents
        .map(({ eventId }) => eventId)
        .reduce((accumulator, eventId, index) => {
          accumulator[eventId] = index;
          return accumulator;
        }, {});
    },
    isGrid() {
      return this.format === 'grid';
    },
    timelineEventIdToIndex() {
      return this.timelineEvents
        .map(({ eventIds }) => eventIds)
        .reduce((accumulator, eventIds, index) =>
          Object.assign({}, accumulator, eventIds.reduce((acc, eventId) => {
            acc[eventId] = index;
            return acc;
          }, {})), {});
    },
  },
  methods: {
    setEventType(et){
      this.eventType = et.value
    },
    setFormat(format) {
      this.$router.replace({
        query: Object.assign({}, this.$route.query, { format }),
      });
      setTimeout(() => this.scrollEventIntoView(this.eventId), 100);
    },
    setTsFormat(tsFormat) {
      this.tsFormat = tsFormat
      localStorage.setItem(`${this.$route.params.domain}:history-ts-col-format`, tsFormat)
    },
    setCompactDetails(compact) {
      const { scrollerGrid } = this.$refs;
      this.compactDetails = compact;
      localStorage.setItem(`${this.$route.params.domain}:history-compact-details`, JSON.stringify(compact));
      scrollerGrid.forceUpdate();
    },
    timeCol(ts, i) {
      if (i === -1) {
        return '';
      }

      if (i === 0 || this.tsFormat !== 'elapsed') {
        return ts.format('MMM Do h:mm:ss a')
      }

      let deltaFromPrev = moment.duration(ts - this.$parent.results[i - 1].timestamp),
          elapsed = moment.duration(ts - this.$parent.results[0].timestamp).format()

      if (deltaFromPrev.asSeconds() >= 1) {
        elapsed += ` (+${deltaFromPrev.format()})`
      }
      return elapsed
    },
    scrollEventIntoView(eventId) {
      const index = this.isGrid ?
        this.filteredEventIdToIndex[eventId] :
        this.timelineEventIdToIndex[eventId];

      this.scrollToItem(index);

      if (this.isGrid) {
        // Need to fire twice as the scroller items can have dynamic height which causes the scrolling position to not be accurate.
        setTimeout(() => this.scrollToItem(index, true), 100);
      }
    },
    scrollToItem(index, forceUpdate) {
      const { scrollerCompact, scrollerGrid } = this.$refs;
      const scroller = this.isGrid ? scrollerGrid : scrollerCompact;
      if (index === undefined || !scroller) {
        return;
      }
      try {
        scroller.scrollToItem(index);
        if (forceUpdate) {
          scroller.forceUpdate();
        }
      } catch (error) {
        console.warn('vue-virtual-scroller: Could not scrollToItem:', error);
      }
    },
    selectTimelineEvent(i) {
      this.$router.replaceQueryParam('eventId', i.eventIds[i.eventIds.length - 1])
    },
    deselectEvent() {
      this.$router.replace({ query: omit(this.$route.query, 'eventId') })
    },
    enableSplitting() {
      if (!this.splitEnabled) {
        var timelineHeightPct = (this.$refs.splitPanel.$el.firstElementChild.offsetHeight / this.$refs.splitPanel.$el.offsetHeight) * 100
        this.splitSizeSet = [timelineHeightPct, 100 - timelineHeightPct];
        this.splitEnabled = true
      }
    },
    onSplitResize: debounce(function (size) {
      window.dispatchEvent(new Event('resize'))
    }, 5)
  },
  watch: {
    eventId(eventId) {
      this.scrollEventIntoView(eventId);
    },
    filteredEvents() {
      this.scrollEventIntoView(this.eventId);
    },
  },
  components: {
    DynamicScroller,
    DynamicScrollerItem,
    'event-details': eventDetails,
    'prism': Prism,
    RecycleScroller,
    timeline,
  }
}
</script>

<style lang="stylus">
@require "../../styles/definitions.styl"

section.history
  brdr = 1px solid uber-black-60
  display flex
  flex-direction column
  flex 1 1 auto

  header.controls
    display flex
    flex-wrap wrap
    justify-content space-between
    padding inline-spacing-large
    flex 0 0 auto
    .field
      flex 1 1 auto
    & > div
      display flex
      align-items center
      & > *
        margin inline-spacing-small
    a
      action-button()
  .view-formats
    display flex
    a
      flex 0 0 auto
      margin 0
      text-transform none
      &.active
        background-color darken(uber-blue, 20%)

  paged-grid()

  &:not(.has-results) header .actions
    display none
  &.loading.has-results
    &::after
      content none

  a.export
    icon-download()

  .gutter.gutter-vertical
    border-top 1px solid uber-white-80
    border-bottom 1px solid uber-white-80
    background-color uber-white-20
  div.split-panel
    .timeline-split
      overflow hidden
    .view-split
      flex 1
      overflow hidden
      display flex
      position relative
      flex-direction column
  &:not(.split-enabled) div.split-panel
    display flex
    flex-direction column
    flex 1
    .gutter
      flex 0 0 auto
    .timeline-split
      flex 0 0 auto
      max-height 350px
  &.split-enabled div.split-panel
    height calc(100vh - 188px)

  section pre
    border brdr
    overflow auto

  .table
    .vue-recycle-scroller__slot,
    .vue-recycle-scroller__item-view,
    .scroller-item
      display: flex;
      width: 100%;
    .col-id
      min-width: 50px;
    .col-summary
      flex: 1;
    .col-time
      min-width: 150px;
    .col-type
      min-width: 212px;
    .thead
      background-color uber-white-10
      box-shadow 2px 2px 2px rgba(0,0,0,0.2)
      position: absolute;
      display: flex;
      top: 0;
      left: 0;
      z-index: 2;
      width: calc(100% - 10px);
      .th
        color: rgb(0, 0, 0);
        display: inline-block;
        font-weight: 500;
        text-transform: uppercase;
        & > .v-select.eventType
          margin-left: 10px;
          display: inline-block;
          width: 150px;
      & + .spacer
        width: 100%;
        height: 60px;
    .tr
      display: flex;
      flex: 1;
      &.odd
        background-color: #f8f8f9;
    .td, .th
      flex-basis: auto;
      padding: 8px;
    .th a:not([href])
      border-bottom 1px solid black
    .td:nth-child(3), .td:nth-child(2)
      one-liner-ellipsis()
    .tr[data-event-type*="Started"] .td:nth-child(2)
      color uber-blue-120
    .tr[data-event-type*="Failed"], .tr[data-event-type*="TimedOut"]
      .td:nth-child(2), [data-prop="reason"], [data-prop="details"]
        color uber-orange
    .tr[data-event-type*="Completed"]
      .td:nth-child(2), [data-prop="result"] dt
        color uber-green
    .tr.active
      border-top brdr
      border-bottom brdr
      background-color alpha(uber-blue, 5%)
    pre
      max-height 15vh
    &.compact .tr:not(.active)
      .td:nth-child(4)
        overflow hidden
      dl.details
        max-width 50vw

  .table.compact .tr:not(.active), .compact-view .timeline-event
    dl.details
      white-space nowrap
      & > div
        display inline-block
        padding 0
        &:nth-child(2n)
          background none
      dt, dd
        display inline-block
        vertical-align middle
        margin 0 0.5em
      dt
        font-family primary-font-family
        font-weight 200
        text-transform uppercase
      pre
        display inline-block
        max-width 40vw
        one-liner-ellipsis()

  section.results
    flex 1
    & > pre
      margin layout-spacing-small
      padding layout-spacing-small

  wide-title-width = 400px

  .compact-view
    line-height 1.5em
    overflow-y auto
    .scroller-compact
      padding: layout-spacing-small;
      padding-bottom: 0;
    .event-title
      padding 4px
      font-size 16px
    pre
      max-height 15vh

    .timeline-event
      border 2px solid primary-color
      padding 6px
      margin-bottom layout-spacing-small
      history-item-state-color(3%)
      dl.details dd
        max-width none

      @media (max-width: 1400px)
        dl.details
          display none
      @media (min-width: 1400px)
        display flex
        align-items center
        .event-title
          flex 0 0 wide-title-width
        dl.details
          flex 1
          align-items center
          overflow hidden
          pre
            max-width none

    .selected-event-details
      position absolute
      width "calc(100vw - %s)" % (wide-title-width + 30px)
      height 100%
      top 0
      left wide-title-width + 15px
      overflow auto
      background-color white
      padding layout-spacing-small
      border-left 1px solid uber-black-80
      box-shadow -5px 0 5px rgba(0,0,0,0.25)
      .event-title
        display block
        font-size 1.4em
        margin-bottom 0.5em
      .event-tabs
        //border-bottom 1px solid uber-black-60
        margin-bottom layout-spacing-small
        margin-top layout-spacing-small
        a
          display inline-block
          padding inline-spacing-medium
          font-family monospace-font-family
          border-bottom 2px solid transparent
          &.active
            border-bottom-color primary-color
        & > span
          font-weight 200
          text-transform uppercase
          font-size 11px
      dl.details
        background-color alpha(uber-white-80, 0.2)
        &.timeline-details dt, dd
          padding 4px
      a.close
        top layout-spacing-small

</style>