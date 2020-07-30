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
            v-bind:value="queryString"
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
            v-bind:value="workflowId"
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
            v-bind:value="workflowName"
            @input="setWorkflowFilter"
          />
          <label for="workflowName">Workflow Name</label>
        </div>
        <v-select
          class="status"
          :value="status"
          :options="statusList"
          :on-change="setStatus"
          :searchable="false"
        />
        <div class="field workflow-filter-by">
          <input
            class="workflow-filter-by"
            name="filterBy"
            placeholder=" "
            readonly
            v-bind:value="filterBy"
          />
          <label for="filterBy">Filter by</label>
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
    <span class="error" v-if="error">{{ error }}</span>
    <span class="no-results" v-if="showNoResults">No Results</span>
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
          <tr v-for="wf in formattedResults" :key="wf.runId">
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
  </section>
</template>

<script>
import moment from 'moment';
import debounce from 'lodash-es/debounce';
import pagedGrid from '~components/paged-grid';
import { DateRangePicker } from '~components';
import {
  getDatetimeFormattedString,
  getEndTimeIsoString,
  getStartTimeIsoString,
} from '~helpers';
import {
  getCriteria,
  getFetchUrl,
  getFilterBy,
  getFormattedResults,
  getMinStartDate,
  getStartTime,
  getState,
  getStatus,
  getStatusName,
} from './helpers';
import { STATUS_LIST } from './constants';

export default pagedGrid({
  props: [
    'dateFormat',
    'domain',
    'timeFormat',
    'timezone',
    // 'workflowId'
  ],
  data() {
    return {
      loading: true,
      results: [],
      error: undefined,
      nextPageToken: undefined,
      now: undefined,
      statusList: STATUS_LIST,
      maxRetentionDays: undefined,
      filterMode: 'basic',
    };
  },

  // TODO - code could be cleaned up
  created() {
    console.log('created called??');
    this.$http(`/api/domains/${this.domain}`).then(r => {
      const {
        maxRetentionDays,
        now,
        state,
        statusName,
      } = this;

      this.maxRetentionDays =
        Number(r.configuration.workflowExecutionRetentionPeriodInDays) || 30;

      const minStartDate = getMinStartDate({ maxRetentionDays, now, statusName });

      if (!this.isRouteRangeValid(minStartDate)) {
        const prevRange = localStorage.getItem(
          `${this.domain}:workflows-time-range`
        );

        if (prevRange && this.isRangeValid(prevRange, minStartDate)) {
          this.setRange(prevRange);
        } else {
          const defaultRange = state === 'open' ? 30 : this.maxRetentionDays;

          this.setRange(`last-${defaultRange}-days`);
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
    criteria() {
      const {
        endTime,
        queryString,
        startTime,
        statusName,
        workflowId,
        workflowName,
      } = this;

      this.nextPageToken = undefined;

      return getCriteria({
        endTime,
        queryString,
        startTime,
        statusName,
        workflowId,
        workflowName,
      });
    },

    fetchUrl() {
      const { domain, queryString, state } = this;
      return getFetchUrl({ domain, queryString, state });
    },

    endTime() {
      const { endTime, range } = this.$route.query; // consider using props?
      return getEndTimeIsoString(range, endTime);
    },

    filterBy() {
      const { status: { value: status } } = this;
      return getFilterBy({ status });
    },

    formattedResults() {
      const { dateFormat, results, timeFormat, timezone } = this;
      return getFormattedResults({ dateFormat, results, timeFormat, timezone });
    },

    startTime() {
      const { range } = this;
      const { range: queryRange, startTime: queryStartTime } = this.$route.query; // consider using props?
      return getStartTime({ range, queryRange, queryStartTime });
    },

    state() {
      const { statusName } = this;
      return getState({ statusName });
    },

    status() {
      const { status: queryStatus } = this.$route.query; // consider using props?
      return getStatus({ queryStatus });
    },

    statusName() {
      const { status } = this;
      return getStatusName({ status });
    },

    // TODO - clean code up
    range() {
      const { state } = this;
      const query = this.$route.query || {};

      if (state === 'closed' && this.maxRetentionDays === undefined) {
        return null;
      }

      if (!this.isRouteRangeValid(this.minStartDate)) {
        const defaultRange = state === 'open' ? 30 : this.maxRetentionDays;
        const updatedQuery = this.setRange(`last-${defaultRange}-days`);

        // TODO - use this.$router.replaceQueryParam()
        query.startTime = getStartTimeIsoString(
          updatedQuery.range,
          query.startTime
        );
        query.endTime = getEndTimeIsoString(updatedQuery.range, query.endTime);
      }

      return query.startTime && query.endTime
        ? {
            startTime: moment(query.startTime),
            endTime: moment(query.endTime),
          }
        : query.range;
    },
    queryOnChange() {
      const { criteria, fetchUrl, nextPageToken } = this;

      if (!criteria) {
        return;
      }

      const query = { ...criteria, nextPageToken };

      console.log('queryOnChange called?', fetchUrl, query);
      this.fetch(fetchUrl, query);
    },
    queryString() {
      // TODO - consider moving this to a prop?
      return this.$route.query.queryString;
    },
    minStartDate() {
      const {
        maxRetentionDays,
        now,
        statusName,
      } = this;

      return getMinStartDate({ maxRetentionDays, now, statusName });
    },

    // TODO - consider moving this to a prop?
    workflowId() {
      return this.$route.query.workflowId;
    },

    // TODO - consider moving this to a prop?
    workflowName() {

      return this.$route.query.workflowName;
    },
  },
  methods: {
    fetch: debounce(
      function fetch(url, query) {
        console.log('fetch called???');
        this.loading = true;
        this.error = undefined;

        return this.$http(url, { query })
          .then(res => {
            this.npt = res.nextPageToken;
            this.loading = false;
            this.results = query.nextPageToken
              ? this.results.concat(res.executions)
              : res.executions;

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

    // TODO - Convert to a helper
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

    // TODO - Convert to a helper
    isRouteRangeValid(minStartDate) {
      const { endTime, range, startTime } = this.$route.query || {};  // consider using props?

      if (range) {
        return this.isRangeValid(range, minStartDate);
      }

      if (startTime && endTime) {
        return this.isRangeValid({ endTime, startTime }, minStartDate);
      }

      return false;
    },

    // TODO - code could be cleaned up
    setRange(range) {
      const query = { ...this.$route.query };

      if (range) {
        if (typeof range === 'string') {
          query.range = range;
          delete query.startTime;
          delete query.endTime;
          localStorage.setItem(`${this.domain}:workflows-time-range`, range);
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

    // TODO - Convert to a helper + method
    toggleFilter() {
      if (this.filterMode === 'advanced') {
        this.filterMode = 'basic';
        this.$route.query.queryString = ''; // TODO - use this.$router.replaceQueryParam()
      } else {
        this.filterMode = 'advanced';
      }
    },
  },
});
</script>

<style lang="stylus">
@require "../../../styles/definitions.styl"

section.workflow-list
  display: flex;
  flex: auto;
  flex-direction: column;

  .filters
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    > .field
      flex 1 1 auto
      margin-right: 5px;

    .date-range-picker {
      margin-right: 5px;
    }

    .dropdown {
      margin-right: 5px;
    }

    .status {
      width: 160px;
    }
    .workflow-filter-by {
      max-width: 105px;
    }
    a.toggle-filter
      action-button()

  paged-grid()

  section.results {
    flex: auto;
  }

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
