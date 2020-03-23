<template>
  <section class="workflow-list" :class="{ loading }">
    <header class="filters">
      <template v-if="filterMode === 'advanced'">
        <div class="field query-string">
          <input
            type="search"
            class="query-string"
            placeholder=" "
            key="sql-query"
            name="queryString"
            v-bind:value="$route.query.queryString"
            @input="setWorkflowFilter"
          />
          <label for="queryString">Query</label>
        </div>
      </template>
      <template v-else>
        <div class="field workflow-id">
          <input
            type="search"
            class="workflow-id"
            placeholder=" "
            name="workflowId"
            v-bind:value="$route.query.workflowId"
            @input="setWorkflowFilter"
          />
          <label for="workflowId">Workflow ID</label>
        </div>
        <div class="field workflow-name">
          <input
            type="search"
            class="workflow-name"
            placeholder=" "
            name="workflowName"
            v-bind:value="$route.query.workflowName"
            @input="setWorkflowFilter"
          />
          <label for="workflowName">Workflow Name</label>
        </div>
        <v-select
          class="status"
          :value="status"
          :options="statuses"
          :on-change="setStatus"
          :searchable="false"
        />
        <div class="field workflow-filter-by">
          <input
            class="workflow-filter-by"
            placeholder=" "
            readonly
            v-bind:value="filterBy"
          />
        </div>
        <date-range-picker
          :date-range="range"
          :max-days="maxRetentionDays"
          :min-start-date="minStartDate"
          @change="setRange"
        />
      </template>
      <a class="toggle-filter" @click="toggleFilter">{{
        filterMode === 'advanced' ? 'basic' : 'advanced'
      }}</a>
    </header>
    <section
      class="results"
      v-infinite-scroll="nextPage"
      infinite-scroll-disabled="disableInfiniteScroll"
      infinite-scroll-distance="20"
      infinite-scroll-immediate-check="false"
    >
      <table v-show="showTable">
        <thead>
          <th>Workflow ID</th>
          <th>Run ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Start Time</th>
          <th>End Time</th>
        </thead>
        <tbody>
          <tr v-for="wf in results" :key="wf.runId">
            <td>{{ wf.workflowId }}</td>
            <td>
              <router-link
                :to="{
                  name: 'workflow/summary',
                  params: { runId: wf.runId, workflowId: wf.workflowId },
                }"
                >{{ wf.runId }}</router-link
              >
            </td>
            <td>{{ wf.workflowName }}</td>
            <td :class="wf.status">{{ wf.status }}</td>
            <td>{{ wf.startTime }}</td>
            <td>{{ wf.endTime }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <span class="error" v-if="error">{{ error }}</span>
    <span class="no-results" v-if="showNoResults">No Results</span>
  </section>
</template>

<script>
import moment from 'moment';
import debounce from 'lodash-es/debounce';
import pagedGrid from '~components/paged-grid';
import { DateRangePicker } from '~components';

export default pagedGrid({
  data() {
    return {
      loading: true,
      results: [],
      error: undefined,
      nextPageToken: undefined,
      statuses: [
        { value: 'OPEN', label: 'Open' },
        { value: 'CLOSED', label: 'Closed' },
        { value: 'COMPLETED', label: 'Completed' },
        { value: 'FAILED', label: 'Failed' },
        { value: 'CANCELED', label: 'Cancelled' },
        { value: 'TERMINATED', label: 'Terminated' },
        { value: 'CONTINUED_AS_NEW', label: 'Continued As New' },
        { value: 'TIMED_OUT', label: 'Timed Out' },
      ],
      maxRetentionDays: 30,
      filterMode: 'basic',
    };
  },
  created() {
    this.$http(`/api/domains/${this.$route.params.domain}`).then(r => {
      this.maxRetentionDays =
        Number(r.configuration.workflowExecutionRetentionPeriodInDays) || 30;

      if (!this.isRouteRangeValid(this.minStartDate)) {
        const prevRange = localStorage.getItem(
          `${this.$route.params.domain}:workflows-time-range`
        );

        if (prevRange && this.isRangeValid(prevRange, this.minStartDate)) {
          this.setRange(prevRange);
        } else {
          this.setRange(`last-${Math.min(30, this.maxRetentionDays)}-days`);
        }
      }
    });

    this.$watch('queryOnChange', () => {}, { immediate: true });
  },
  mounted() {
    this.interval = setInterval(() => {
      this.now = new Date();
    }, 60 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  components: {
    'date-range-picker': DateRangePicker,
  },
  computed: {
    filterBy() {
      return this.status.value === 'OPEN' ? 'StartTime' : 'CloseTime';
    },
    status() {
      if (!this.$route.query || !this.$route.query.status) {
        return this.statuses[0];
      }

      return this.statuses.find(s => s.value === this.$route.query.status);
    },
    range() {
      const q = this.$route.query || {};

      return q.startTime && q.endTime
        ? {
            startTime: moment(q.startTime),
            endTime: moment(q.endTime),
          }
        : q.range;
    },
    criteria() {
      const { domain } = this.$route.params;
      const q = this.$route.query;
      const startTime = this.getStartTimeIsoString(q.range, q.startTime);
      const endTime = this.getEndTimeIsoString(q.range, q.endTime);

      this.nextPageToken = undefined;

      return {
        domain,
        startTime,
        endTime,
        status: q.status,
        workflowId: q.workflowId,
        workflowName: q.workflowName,
        queryString: q.queryString,
      };
    },
    queryOnChange() {
      const q = { ...this.criteria };
      const { domain } = q;
      const state = !q.status || q.status === 'OPEN' ? 'open' : 'closed';

      if (!q.startTime || !q.endTime || !q.status) {
        return;
      }

      if (!this.isRouteRangeValid(this.minStartDate)) {
        const updatedQuery = this.setRange(
          `last-${Math.min(30, this.maxRetentionDays)}-days`
        );

        q.startTime = this.getStartTimeIsoString(
          updatedQuery.range,
          q.startTime
        );
        q.endTime = this.getEndTimeIsoString(updatedQuery.range, q.endTime);
      }

      if (['OPEN', 'CLOSED'].includes(q.status)) {
        delete q.status;
      }

      delete q.domain;
      q.nextPageToken = this.nextPageToken;

      if (q.queryString) {
        this.fetch(`/api/domains/${domain}/workflows/list`, q);

        return;
      }

      this.fetch(`/api/domains/${domain}/workflows/${state}`, q);
    },
    minStartDate() {
      const {
        maxRetentionDays,
        status: { value: status },
      } = this;

      if (status === 'OPEN') {
        return null;
      }

      return moment(this.now)
        .subtract(maxRetentionDays, 'days')
        .startOf('days');
    },
  },
  methods: {
    getStartTimeIsoString(range, startTimeString) {
      if (range && typeof range === 'string') {
        const [, count, unit] = range.split('-');

        return moment()
          .subtract(count, unit)
          .startOf(unit)
          .toISOString();
      }

      return startTimeString;
    },
    getEndTimeIsoString(range, endTimeString) {
      if (range && typeof range === 'string') {
        const [, , unit] = range.split('-');

        return moment()
          .endOf(unit)
          .toISOString();
      }

      return endTimeString;
    },
    fetch: debounce(
      function fetch(url, query) {
        this.loading = true;
        this.error = undefined;

        return this.$http(url, { query })
          .then(res => {
            this.npt = res.nextPageToken;
            this.loading = false;
            const formattedResults = res.executions.map(data => ({
              workflowId: data.execution.workflowId,
              runId: data.execution.runId,
              workflowName: data.type.name,
              startTime: moment(data.startTime).format('lll'),
              endTime: data.closeTime
                ? moment(data.closeTime).format('lll')
                : '',
              status: (data.closeStatus || 'open').toLowerCase(),
            }));

            this.results = query.nextPageToken
              ? this.results.concat(formattedResults)
              : formattedResults;

            return this.results;
          })
          .catch(e => {
            this.npt = undefined;
            this.loading = false;
            this.error = (e.json && e.json.message) || e.status || e.message;

            return [];
          });
      },
      typeof Mocha === 'undefined' ? 200 : 60,
      { maxWait: 1000 }
    ),
    setWorkflowFilter(e) {
      const target = e.target || e.testTarget; // test hook since Event.target is readOnly and unsettable

      this.$router.replaceQueryParam(
        target.getAttribute('name'),
        target.value.trim()
      );
    },
    setStatus(status) {
      if (status) {
        this.$router.replace({
          query: { ...this.$route.query, status: status.value },
        });
      }
    },
    isRangeValid(range, minStartDate) {
      if (typeof range === 'string') {
        const [, count, unit] = range.split('-');
        let startTime;

        try {
          startTime = moment()
            .subtract(count, unit)
            .startOf(unit);
        } catch (e) {
          return false;
        }

        if (minStartDate && startTime < minStartDate) {
          return false;
        }

        return true;
      }

      if (range.startTime && range.endTime) {
        const startTime = moment(range.startTime);
        const endTime = moment(range.endTime);

        if (startTime > endTime) {
          return false;
        }

        if (minStartDate && startTime < minStartDate) {
          return false;
        }

        return true;
      }

      return false;
    },
    isRouteRangeValid(minStartDate) {
      const q = this.$route.query || {};
      const { endTime, range, startTime } = q;

      if (range) {
        return this.isRangeValid(range, minStartDate);
      }

      if (startTime && endTime) {
        return this.isRangeValid({ endTime, startTime }, minStartDate);
      }

      return false;
    },
    setRange(range) {
      const query = { ...this.$route.query };

      if (range) {
        if (typeof range === 'string') {
          query.range = range;
          delete query.startTime;
          delete query.endTime;
          localStorage.setItem(
            `${this.$route.params.domain}:workflows-time-range`,
            range
          );
        } else {
          query.startTime = range.startTime.toISOString();
          query.endTime = range.endTime.toISOString();
          delete query.range;
        }
      } else {
        delete query.range;
        delete query.startTime;
        delete query.endTime;
      }

      this.$router.replace({ query });

      return query;
    },
    toggleFilter() {
      if (this.filterMode === 'advanced') {
        this.filterMode = 'basic';
        this.$route.query.queryString = '';
      } else {
        this.filterMode = 'advanced';
      }
    },
  },
});
</script>

<style lang="stylus">
@require "../../styles/definitions.styl"

section.workflow-list
  .filters
    flex-wrap wrap
    > .field
      flex 1 1 auto
    .status {
      width: 160px;
    }
    .workflow-filter-by {
      max-width: 105px;
    }
    a.toggle-filter
      action-button()

  paged-grid()

  &.loading section.results table
    opacity 0.7

  table
    td:nth-child(4)
      text-transform capitalize
      &.completed
        color uber-green
      &.failed
        color uber-orange
      &.open
        color uber-blue-120
    td:nth-child(5), td:nth-child(6)
      one-liner-ellipsis()
</style>
