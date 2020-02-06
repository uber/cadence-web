<template>
  <section :class="{ execution: true, loading: wfLoading }">
    <nav>
      <router-link :to="{ name: 'execution/summary' }" class="summary"
        >Summary</router-link
      >
      <router-link :to="{ name: 'execution/history' }" class="history"
        >History</router-link
      >
      <router-link
        :to="{ name: 'execution/stack-trace' }"
        class="stack-trace"
        v-show="isWorkflowRunning"
        >Stack Trace</router-link
      >
      <router-link
        :to="{ name: 'execution/queries' }"
        class="queries"
        v-show="isWorkflowRunning"
        >Queries</router-link
      >
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
    <router-view name="stacktrace" :baseAPIURL="baseAPIURL" />
    <router-view name="queries" :baseAPIURL="baseAPIURL" />
  </section>
</template>

<script>
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

      unwatch: [],
    };
  },
  props: ['domain', 'runId', 'workflowId'],
  created() {
    this.unwatch.push(
      this.$watch('baseAPIURL', this.onBaseApiUrlChange, { immediate: true })
    );
  },
  beforeDestroy() {
    this.clearWatches();
  },
  computed: {
    baseAPIURL() {
      const { domain, workflowId, runId } = this;

      return `/api/domain/${domain}/workflows/${encodeURIComponent(
        workflowId
      )}/${encodeURIComponent(runId)}`;
    },
    queryUrl() {
      const queryUrl = `${this.baseAPIURL}/history?waitForNewEvent=true`;

      if (!this.nextPageToken) {
        return queryUrl;
      }

      return `${queryUrl}&nextPageToken=${encodeURIComponent(
        this.nextPageToken
      )}`;
    },
  },
  methods: {
    clearState() {
      this.events = [];
      this.isWorkflowRunning = undefined;
      this.nextPageToken = undefined;
      this.wfError = undefined;
      this.wfLoading = true;
      this.workflow = undefined;

      this.history.error = undefined;
      this.history.events = [];
      this.history.loading = undefined;
      this.history.timelineEvents = [];

      this.summary.input = undefined;
      this.summary.isWorkflowRunning = undefined;
      this.summary.parentWorkflowRoute = undefined;
      this.summary.result = undefined;
      this.summary.wfStatus = undefined;
      this.summary.workflow = undefined;
    },
    clearWatches() {
      while (this.unwatch.length) {
        this.unwatch.pop()();
      }
    },
    clearQueryUrlWatch() {
      while (this.unwatch.length > 1) {
        this.unwatch.pop()();
      }
    },
    fetchHistoryPage(pagedQueryUrl) {
      this.history.error = undefined;

      if (!pagedQueryUrl) {
        this.history.loading = false;

        return;
      }

      this.history.loading = true;
      this.pqu = pagedQueryUrl;
      this.$http(pagedQueryUrl)
        .then(res => {
          // eslint-disable-next-line no-underscore-dangle
          if (this._isDestroyed || this.pqu !== pagedQueryUrl) {
            return null;
          }

          if (res.nextPageToken && this.npt === res.nextPageToken) {
            // nothing happened, and same query is still valid, so let's long pool again
            return this.fetch(pagedQueryUrl);
          }

          if (res.nextPageToken) {
            this.isWorkflowRunning = JSON.parse(
              atob(res.nextPageToken)
            ).IsWorkflowRunning;
            setTimeout(() => {
              this.nextPageToken = res.nextPageToken;
            });
          } else {
            this.isWorkflowRunning = false;
          }

          const shouldHighlightEventId =
            this.$route.query.eventId &&
            this.events.length <= this.$route.query.eventId;

          const { events } = res.history;

          this.events = this.events.concat(events);

          this.history.events = getHistoryEvents(this.events);
          this.history.timelineEvents = getHistoryTimelineEvents(
            this.history.events
          );

          this.summary = getSummary({
            events: this.events,
            isWorkflowRunning: this.isWorkflowRunning,
            workflow: this.workflow,
          });

          if (shouldHighlightEventId) {
            this.$emit('highlight-event-id', this.$route.query.eventId);
          }

          return this.events;
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.error(e);

          // eslint-disable-next-line no-underscore-dangle
          if (this._isDestroyed || this.pqu !== pagedQueryUrl) {
            return;
          }

          this.history.error =
            (e.json && e.json.message) || e.status || e.message;
        })
        .finally(() => {
          // eslint-disable-next-line no-underscore-dangle
          if (this._isDestroyed || this.pqu !== pagedQueryUrl) {
            this.history.loading = false;
          }
        });
    },
    onBaseApiUrlChange(baseAPIURL) {
      this.clearQueryUrlWatch();
      this.clearState();
      this.wfLoading = true;

      return this.$http(baseAPIURL)
        .then(
          wf => {
            this.workflow = wf;
            this.isWorkflowRunning = !wf.workflowExecutionInfo.closeTime;
            this.setupQueryUrlWatch();
          },
          e => {
            this.wfError = (e.json && e.json.message) || e.status || e.message;
          }
        )
        .finally(() => {
          this.wfLoading = false;
        });
    },
    onQueryUrlChange(queryUrl) {
      this.fetchHistoryPage(queryUrl);
    },
    setupQueryUrlWatch() {
      this.clearQueryUrlWatch();
      this.unwatch.push(
        this.$watch('queryUrl', this.onQueryUrlChange, { immediate: true })
      );
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
