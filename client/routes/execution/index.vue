<template>
  <section :class="{ execution: true, loading: wfLoading }">
    <nav>
      <router-link :to="{ name: 'execution/summary' }" class="summary">Summary</router-link>
      <router-link :to="{ name: 'execution/history' }" class="history">History</router-link>
      <router-link :to="{ name: 'execution/stack-trace' }" class="stack-trace" v-show="isWorkflowRunning">Stack Trace</router-link>
      <router-link :to="{ name: 'execution/queries' }" class="queries" v-show="isWorkflowRunning">Queries</router-link>
    </nav>
    <router-view></router-view>
  </section>
</template>

<script>
import moment from 'moment'
import { RESULT_THRESHOLD } from './constants';

import {
  getDisplayTimeElapsed,
  getDisplayTimeStamp,
  getEventDetails,
  getEventFullDetails,
  getEventSummary,
  getKeyValuePairs,
  mapTimelineEvents
} from './helpers';

export default {
  data() {
    return {
      workflow: undefined,
      wfError: undefined,
      wfLoading: true,
      historyError: undefined,
      historyLoading: undefined,
      isWorkflowRunning: undefined,
      nextPageToken: undefined,
      results: [],
      timelineEvents: [],
    }
  },
  created() {
    this.$watch('baseAPIURL', u => {
      this.results = []
      this.nextPageToken = undefined
      return this.$http(u).then(
        wf => { this.workflow = wf; this.isWorkflowRunning = !wf.workflowExecutionInfo.closeTime },
        e => this.wfError = (e.json && e.json.message) || e.status || e.message
      ).finally(() => this.wfLoading = false)
    }, { immediate: true })

    this.$watch(() => {
      let queryUrl = this.baseAPIURL + '/history?waitForNewEvent=true'
      if (!this.nextPageToken) return queryUrl

      return queryUrl + '&nextPageToken=' + encodeURIComponent(this.nextPageToken)
    }, v => this.fetchHistoryPage(v), { immediate: true })
  },
  computed: {
    baseAPIURL() {
      var { domain, workflowId, runId } = this.$route.params
      return `/api/domain/${domain}/workflows/${encodeURIComponent(workflowId)}/${encodeURIComponent(runId)}`
    }
  },
  methods: {
    fetchHistoryPage(pagedQueryUrl) {
      this.historyError = undefined
      if (!pagedQueryUrl) {
        this.historyLoading = false
        return
      }

      this.historyLoading = true
      this.pqu = pagedQueryUrl
      return this.$http(pagedQueryUrl).then(res => {
        if (this._isDestroyed || this.pqu !== pagedQueryUrl) return
        if (res.nextPageToken && this.npt === res.nextPageToken) {
          // nothing happened, and same query is still valid, so let's long pool again
          return this.fetch(pagedQueryUrl)
        }

        if (res.nextPageToken) {
          this.isWorkflowRunning = JSON.parse(atob(res.nextPageToken)).IsWorkflowRunning
          if (this.results.length < RESULT_THRESHOLD) {
            setTimeout(() => this.nextPageToken = res.nextPageToken)
          }
        } else {
          this.isWorkflowRunning = false
        }

        var shouldHighlightEventId = this.$route.query.eventId && this.results.length <= this.$route.query.eventId
        const events = res.history.events;
        const formattedEvents = events
          .map(event => {
            const details = getEventDetails(event);
            const eventSummary = getEventSummary(event);
            const eventFullDetails = getEventFullDetails(event);
            const timestamp = moment(event.timestamp);
            return Object.assign({}, event, {
              details,
              eventSummary,
              eventFullDetails,
              timestamp,
            });
          })
          // TODO - not ideal solution but will do for now and come back and refactor later...
          .map((event, index, eventList) => {
            const displayTimeStamp = getDisplayTimeStamp(event);
            const displayTimeElapsed = getDisplayTimeElapsed(event, index, eventList);
            return Object.assign({}, event, {
              displayTimeStamp,
              displayTimeElapsed
            });
          });

        this.results = this.results.concat(formattedEvents);

        // update timeline events
        const newTimelineEvents = mapTimelineEvents(events)
          .map((event) => {
            const details = getEventDetails(event);
            return Object.assign({}, event, {
              details,
            });
          });

        this.timelineEvents = this.timelineEvents.concat(newTimelineEvents);


        if (shouldHighlightEventId) {
          this.$emit('highlight-event-id', this.$route.query.eventId)
        }
        // // https://github.com/ElemeFE/vue-infinite-scroll/issues/89
        // setImmediate(() => this.$emit('longpoll'))

        return this.results
      }).catch(e => {
        console.error(e)
        if (this._isDestroyed || this.pqu !== pagedQueryUrl) return
        this.historyError = (e.json && e.json.message) || e.status || e.message
        return []
      }).finally(() => {
        if (this._isDestroyed || this.pqu !== pagedQueryUrl) {
          this.historyLoading = false
        }
      })
    },
  }
}
</script>

<style lang="stylus">
@require "../../styles/definitions.styl"

section.execution
  & > nav
    flex-wrap wrap
    background-color black
    padding 0 12px // eyeballed lining up summary icon link with Cadence logo

    a
      display inline-block
      padding 11px 18px
      transition all 400ms ease
      //font-size 16px
      font-weight 500
      text-transform uppercase
      border-bottom 4px solid transparent
      &.router-link-active
        border-bottom-color uber-blue

    a.stack-trace
      icon-trips()
    a.history
      icon-history()
    a.summary
      icon('\ea59')
    a.queries
      icon('\ea40')
</style>