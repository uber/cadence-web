<template>
  <section :class="{ execution: true, loading: wfLoading }">
    <nav>
      <router-link :to="{ name: 'execution/summary' }" class="summary">Summary</router-link>
      <router-link :to="{ name: 'execution/history' }" class="history">History</router-link>
      <router-link :to="{ name: 'execution/stack-trace' }" class="stack-trace" v-show="isWorkflowRunning">Stack Trace</router-link>
      <router-link :to="{ name: 'execution/queries' }" class="queries" v-show="isWorkflowRunning">Queries</router-link>
    </nav>
    <router-view
      name="summary"
      :baseAPIURL="baseAPIURL"
      :input="summary.input"
      :isWorkflowRunning="summary.isWorkflowRunning"
      :parentWorkflowRoute="summary.parentWorkflowRoute"
      :result="summary.result"
      :wfStatus="summary.wfStatus"
      :workflow="summary.workflow"
    />
    <router-view
      name="history"
      :baseAPIURL="baseAPIURL"
      :error="history.error"
      :events="history.events"
      :loading="history.loading"
      :timelineEvents="history.timelineEvents"
    />
    <router-view
      name="stacktrace"
      :baseAPIURL="baseAPIURL"
    />
    <router-view
      name="queries"
      :baseAPIURL="baseAPIURL"
    />
  </section>
</template>

<script>
import { RESULT_THRESHOLD } from './constants';

import {
  getHistoryEvents,
  getHistoryTimelineEvents,
  getSummary,
} from './helpers';

export default {
  data() {
    return {
      events: [],
      isWorkflowRunning: undefined,
      nextPageToken: undefined,
      wfError: undefined,
      wfLoading: true,
      workflow: undefined,

      history: {
        error: undefined,
        events: [],
        loading: undefined,
        timelineEvents: [],
      },

      summary: {
        input: undefined,
        isWorkflowRunning: undefined,
        parentWorkflowRoute: undefined,
        result: undefined,
        wfStatus: undefined,
        workflow: undefined,
      },
    };
  },
  props: [
    'domain',
    'runId',
    'workflowId',
  ],
  created() {
    this.$watch('baseAPIURL', (u) => {
      this.results = [];
      this.nextPageToken = undefined;
      return this.$http(u)
        .then(
          (wf) => {
            this.workflow = wf;
            this.isWorkflowRunning = !wf.workflowExecutionInfo.closeTime;
          },
          (e) => this.wfError = (e.json && e.json.message) || e.status || e.message,
        )
        .finally(() => this.wfLoading = false);
    }, { immediate: true });

    this.$watch(() => {
      const queryUrl = `${this.baseAPIURL}/history?waitForNewEvent=true`;
      if (!this.nextPageToken) {
        return queryUrl;
      }

      return `${queryUrl}&nextPageToken=${encodeURIComponent(this.nextPageToken)}`;
    }, (v) => this.fetchHistoryPage(v), { immediate: true });
  },
  computed: {
    baseAPIURL() {
      const { domain, workflowId, runId } = this;
      return `/api/domain/${domain}/workflows/${encodeURIComponent(workflowId)}/${encodeURIComponent(runId)}`;
    },
  },
  methods: {
    fetchHistoryPage(pagedQueryUrl) {
      this.history.error = undefined;
      if (!pagedQueryUrl) {
        this.history.loading = false;
        return;
      }

      this.history.loading = true;
      this.pqu = pagedQueryUrl;
      return this.$http(pagedQueryUrl).then((res) => {
        if (this._isDestroyed || this.pqu !== pagedQueryUrl) {
          return;
        }

        if (res.nextPageToken && this.npt === res.nextPageToken) {
          // nothing happened, and same query is still valid, so let's long pool again
          return this.fetch(pagedQueryUrl);
        }

        if (res.nextPageToken) {
          this.isWorkflowRunning = JSON.parse(atob(res.nextPageToken)).IsWorkflowRunning;
          if (this.results.length < RESULT_THRESHOLD) {
            setTimeout(() => this.nextPageToken = res.nextPageToken);
          }
        } else {
          this.isWorkflowRunning = false;
        }

        const shouldHighlightEventId = this.$route.query.eventId && this.results.length <= this.$route.query.eventId;

        const { events } = res.history;
        this.events = this.events.concat(events);

        this.history.events = getHistoryEvents(this.events);
        this.history.timelineEvents = getHistoryTimelineEvents(this.history.events);

        this.summary = getSummary({
          events: this.events,
          isWorkflowRunning: this.isWorkflowRunning,
          workflow: this.workflow,
        });

        if (shouldHighlightEventId) {
          this.$emit('highlight-event-id', this.$route.query.eventId);
        }

        return this.results;
      }).catch((e) => {
        console.error(e);
        if (this._isDestroyed || this.pqu !== pagedQueryUrl) {
          return;
        }
        this.history.error = (e.json && e.json.message) || e.status || e.message;
        return [];
      }).finally(() => {
        if (this._isDestroyed || this.pqu !== pagedQueryUrl) {
          this.history.loading = false;
        }
      });
    },
  },
};
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
