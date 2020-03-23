<template>
  <section class="workflow" :class="{ loading: wfLoading }">
    <navigation-bar>
      <navigation-link
        id="nav-link-summary"
        icon="icon_receipt"
        label="Summary"
        :to="{ name: 'workflow/summary' }"
      />
      <navigation-link
        id="nav-link-history"
        icon="icon_trip-history"
        label="History"
        :to="{ name: 'workflow/history' }"
      />
      <navigation-link
        id="nav-link-stack-trace"
        icon="icon_trips"
        label="Stack Trace"
        :to="{ name: 'workflow/stack-trace' }"
        v-show="isWorkflowRunning"
      />
      <navigation-link
        id="nav-link-query"
        icon="icon_lost"
        label="Query"
        :to="{ name: 'workflow/query' }"
        v-show="isWorkflowRunning"
      />
    </navigation-bar>
    <router-view
      name="summary"
      :baseAPIURL="baseAPIURL"
      :input="summary.input"
      :isWorkflowRunning="summary.isWorkflowRunning"
      :parentWorkflowRoute="summary.parentWorkflowRoute"
      :result="summary.result"
      :wfStatus="summary.wfStatus"
      :workflow="summary.workflow"
      @onNotification="onNotification"
    />
    <router-view
      name="history"
      :baseAPIURL="baseAPIURL"
      :events="history.events"
      :loading="history.loading"
      :timelineEvents="history.timelineEvents"
      @onNotification="onNotification"
    />
    <router-view
      name="stacktrace"
      :baseAPIURL="baseAPIURL"
      @onNotification="onNotification"
    />
    <router-view
      name="query"
      :baseAPIURL="baseAPIURL"
      @onNotification="onNotification"
    />
  </section>
</template>

<script>
import { RETRY_COUNT_MAX, RETRY_TIMEOUT } from './constants';
import {
  getHistoryEvents,
  getHistoryTimelineEvents,
  getSummary,
} from './helpers';
import { NOTIFICATION_TYPE_ERROR } from '~constants';
import { getErrorMessage } from '~helpers';
import { NavigationBar, NavigationLink } from '~components';

export default {
  data() {
    return {
      baseApiUrlRetryCount: 0,
      events: [],
      isWorkflowRunning: undefined,
      nextPageToken: undefined,
      fetchHistoryPageRetryCount: 0,
      wfLoading: true,
      workflow: undefined,

      history: {
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
  components: {
    'navigation-bar': NavigationBar,
    'navigation-link': NavigationLink,
  },
  computed: {
    baseAPIURL() {
      const { domain, workflowId, runId } = this;

      return `/api/domains/${domain}/workflows/${encodeURIComponent(
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
      this.fetchHistoryPageRetryCount = 0;
      this.wfLoading = true;
      this.workflow = undefined;

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
      if (
        !pagedQueryUrl ||
        this.fetchHistoryPageRetryCount >= RETRY_COUNT_MAX
      ) {
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

          this.fetchHistoryPageRetryCount = 0;

          return this.events;
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);

          // eslint-disable-next-line no-underscore-dangle
          if (this._isDestroyed || this.pqu !== pagedQueryUrl) {
            return;
          }

          this.$emit('onNotification', {
            message: getErrorMessage(error),
            type: NOTIFICATION_TYPE_ERROR,
          });

          this.fetchHistoryPageRetryCount += 1;
          setTimeout(() => this.fetchHistoryPage(pagedQueryUrl), RETRY_TIMEOUT);
        })
        .finally(() => {
          // eslint-disable-next-line no-underscore-dangle
          if (this._isDestroyed || this.pqu !== pagedQueryUrl) {
            this.history.loading = false;
          }
        });
    },
    onBaseApiUrlChange(baseAPIURL) {
      if (this.baseApiUrlRetryCount >= RETRY_COUNT_MAX) {
        return;
      }

      this.clearQueryUrlWatch();
      this.clearState();
      this.wfLoading = true;

      return this.$http(baseAPIURL)
        .then(
          wf => {
            this.workflow = wf;
            this.isWorkflowRunning = !wf.workflowExecutionInfo.closeTime;
            this.setupQueryUrlWatch();
            this.baseApiUrlRetryCount = 0;
          },
          error => {
            this.$emit('onNotification', {
              message: getErrorMessage(error),
              type: NOTIFICATION_TYPE_ERROR,
            });
            this.baseApiUrlRetryCount += 1;
            setTimeout(
              () => this.onBaseApiUrlChange(baseAPIURL),
              RETRY_TIMEOUT
            );
          }
        )
        .finally(() => {
          this.wfLoading = false;
        });
    },
    onQueryUrlChange(queryUrl) {
      this.fetchHistoryPage(queryUrl);
    },
    onNotification(event) {
      this.$emit('onNotification', event);
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
