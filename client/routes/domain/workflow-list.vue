<script>
// Copyright (c) 2017-2021 Uber Technologies Inc.
// Portions of the Software are attributed to Copyright (c) 2020-2021 Temporal Technologies Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import moment from 'moment';
import debounce from 'lodash-es/debounce';
import { maxBy } from 'lodash-es';
import { DateRangePicker, WorkflowsGrid } from '~components';
import {
  getDatetimeFormattedString,
  getEndTimeIsoString,
  getStartTimeIsoString,
} from '~helpers';

export default {
  props: ['dateFormat', 'domain', 'timeFormat', 'timezone'],
  data() {
    return {
      loading: false,
      results: [],
      error: undefined,
      nextPageToken: undefined,
      npt: undefined,
      nptAlt: undefined,
      statuses: [
        { value: 'ALL', label: 'All' },
        { value: 'OPEN', label: 'Open' },
        { value: 'CLOSED', label: 'Closed' },
        { value: 'COMPLETED', label: 'Completed' },
        { value: 'FAILED', label: 'Failed' },
        { value: 'CANCELED', label: 'Cancelled' },
        { value: 'TERMINATED', label: 'Terminated' },
        { value: 'CONTINUED_AS_NEW', label: 'Continued As New' },
        { value: 'TIMED_OUT', label: 'Timed Out' },
      ],
      maxRetentionDays: undefined,
      filterMode: 'basic',
    };
  },
  created() {
    this.fetchNamespace();
    this.fetchWorkflows();
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
    'workflows-grid': WorkflowsGrid,
  },
  computed: {
    fetchUrl() {
      const { domain, queryString, state } = this;

      if (queryString) {
        return `/api/domains/${domain}/workflows/list`;
      }

      return `/api/domains/${domain}/workflows/${state}`;
    },
    endTime() {
      const { endTime, range } = this.$route.query;

      return getEndTimeIsoString(range, endTime);
    },
    filterBy() {
      return ['ALL', 'OPEN'].includes(this.status.value)
        ? 'StartTime'
        : 'CloseTime';
    },
    formattedResults() {
      const { dateFormat, results, timeFormat, timezone } = this;

      return results.map(result => ({
        workflowId: result.execution.workflowId,
        runId: result.execution.runId,
        workflowName: result.type.name,
        startTime: getDatetimeFormattedString({
          date: result.startTime,
          dateFormat,
          timeFormat,
          timezone,
        }),
        endTime: result.closeTime
          ? getDatetimeFormattedString({
              date: result.closeTime,
              dateFormat,
              timeFormat,
              timezone,
            })
          : '',
        status: (result.closeStatus || 'open').toLowerCase(),
      }));
    },
    startTime() {
      const { range, startTime } = this.$route.query;

      if (this.range && this.range.startTime) {
        return getStartTimeIsoString(null, this.range.startTime.toISOString());
      }

      return getStartTimeIsoString(range, startTime);
    },
    state() {
      const { statusName } = this;

      if (!this.statusName || statusName == 'ALL') {
        return 'all';
      }

      return statusName === 'OPEN' ? 'open' : 'closed';
    },
    status() {
      return !this.$route.query || !this.$route.query.status
        ? this.statuses[0]
        : this.statuses.find(s => s.value === this.$route.query.status);
    },
    statusName() {
      return this.status.value;
    },
    range() {
      const { state } = this;
      const query = this.$route.query || {};

      if (state === 'closed' && this.maxRetentionDays === undefined) {
        return null;
      }

      if (!this.isRouteRangeValid(this.minStartDate)) {
        const defaultRange =
          state === 'open' ? 30 : this.maxRetentionDays || 30;
        const updatedQuery = this.setRange(
          `last-${Math.min(30, defaultRange)}-days`
        );

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
    criteria() {
      const {
        endTime,
        queryString,
        startTime,
        statusName: status,
        workflowId,
        workflowName,
      } = this;

      if (!startTime || !endTime) {
        return null;
      }

      const criteria = {
        startTime,
        status,
        endTime,
        ...(queryString && { queryString }),
        ...(workflowId && { workflowId }),
        ...(workflowName && { workflowName }),
      };

      return criteria;
    },
    queryString() {
      return this.$route.query.queryString;
    },
    minStartDate() {
      const {
        maxRetentionDays,
        status: { value: status },
      } = this;

      if (['OPEN', 'ALL'].includes(status)) {
        return null;
      }

      return moment(this.now)
        .subtract(maxRetentionDays, 'days')
        .startOf('days');
    },
    workflowId() {
      return this.$route.query.workflowId;
    },
    workflowName() {
      return this.$route.query.workflowName;
    },
  },
  methods: {
    refreshWorkflows: debounce(
      function refreshWorkflows() {
        this.results = [];
        this.npt = undefined;
        this.nptAlt = undefined;
        this.fetchWorkflows();
      },
      typeof Mocha === 'undefined' ? 200 : 60,
      { maxWait: 1000 }
    ),
    async fetch(url, queryWithStatus) {
      this.loading = true;
      this.error = undefined;

      const includeStatus = !['ALL', 'OPEN', 'CLOSED'].includes(
        queryWithStatus.status
      );
      const { status, ...queryWithoutStatus } = queryWithStatus;
      const query = includeStatus ? queryWithStatus : queryWithoutStatus;

      let workflows = [];
      let nextPageToken;

      try {
        const res = await this.$http(url, { query });

        workflows = res.executions;

        nextPageToken = res.nextPageToken;
      } catch (e) {
        this.error = (e.json && e.json.message) || e.status || e.message;
      }

      this.loading = false;

      return { workflows, nextPageToken };
    },
    fetchNamespace() {
      const { domain } = this;

      return this.$http(`/api/domains/${domain}`).then(r => {
        const { minStartDate } = this;

        this.maxRetentionDays =
          Number(r.configuration.workflowExecutionRetentionPeriodInDays) || 30;

        if (!this.isRouteRangeValid(minStartDate)) {
          const prevRange = localStorage.getItem(
            `${domain}:workflows-time-range`
          );

          if (prevRange && this.isRangeValid(prevRange, minStartDate)) {
            this.setRange(prevRange);
          } else {
            this.setRange(`last-${Math.min(30, this.maxRetentionDays)}-days`);
          }
        }
      });
    },
    async fetchWorkflows() {
      if (!this.criteria || this.loading) {
        return;
      }

      let workflows = [];

      if (this.state !== 'all') {
        const query = { ...this.criteria, nextPageToken: this.npt };

        if (query.queryString) {
          query.queryString = decodeURI(query.queryString);
        }

        const { workflows: wfs, nextPageToken } = await this.fetch(
          this.fetchUrl,
          query
        );

        workflows = wfs;
        this.npt = nextPageToken;
      } else {
        const { domain } = this;
        const queryOpen = { ...this.criteria, nextPageToken: this.npt };
        const queryClosed = { ...this.criteria, nextPageToken: this.nptAlt };
        const { workflows: wfsOpen, nextPageToken: nptOpen } = await this.fetch(
          `/api/domains/${domain}/workflows/open`,
          queryOpen
        );
        let totalWfsOpen = wfsOpen;

        this.npt = nptOpen;

        const {
          workflows: wfsClosed,
          nextPageToken: nptClosed,
        } = await this.fetch(
          `/api/domains/${domain}/workflows/closed`,
          queryClosed
        );
        let totalWfsClosed = wfsClosed;

        this.nptAlt = nptClosed;

        if (this.npt && this.nptAlt) {
          // saturate diff in workflows between the max dates
          // so both open and closed workflows are fetched until the same date
          let maxOpen = maxBy(wfsOpen, w => moment(w.startTime));
          let maxClosed = maxBy(wfsClosed, w => moment(w.startTime));

          let nptDiff;
          let saturateOpen;

          if (
            maxOpen &&
            maxClosed &&
            maxOpen.startTime !== maxClosed.startTime
          ) {
            maxOpen = moment(maxOpen.startTime);
            maxClosed = moment(maxClosed.startTime);
            saturateOpen = maxOpen < maxClosed;

            let [startTime, endTime] = saturateOpen
              ? [maxOpen, maxClosed]
              : [maxClosed, maxOpen];

            startTime = startTime.add(1, 'seconds').toISOString();
            endTime = endTime.add(1, 'seconds').toISOString();
            const queryDiff = { ...this.criteria, startTime, endTime };

            const diff = await this.fetch(
              `/api/domains/${domain}/workflows/${
                saturateOpen ? 'open' : 'closed'
              }`,
              queryDiff
            );

            nptDiff = diff.nextPageToken;

            if (saturateOpen === true) {
              this.npt = nptDiff;
              totalWfsOpen = [...wfsOpen, ...diff.workflows];
            } else if (saturateOpen === false) {
              this.nptAlt = nptDiff;
              totalWfsClosed = [...wfsClosed, ...diff.workflows];
            }
          }
        }

        workflows = [...totalWfsOpen, ...totalWfsClosed];
      }

      this.results = [...this.results, ...workflows];
    },
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
      const { endTime, range, startTime } = this.$route.query || {};

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
    toggleFilter() {
      if (this.filterMode === 'advanced') {
        this.filterMode = 'basic';
        this.$route.query.queryString = '';
      } else {
        this.filterMode = 'advanced';
      }
    },
    onWorkflowsScroll(startIndex, endIndex) {
      if (this.loading || !this.npt) {
        return;
      }

      return this.fetchWorkflows();
    },
  },
  watch: {
    criteria(newCriteria, oldCriteria) {
      if (
        !newCriteria ||
        !oldCriteria ||
        newCriteria.startTime !== oldCriteria.startTime ||
        newCriteria.endTime !== oldCriteria.endTime ||
        newCriteria.queryString !== oldCriteria.queryString ||
        newCriteria.status !== oldCriteria.status ||
        newCriteria.workflowId !== oldCriteria.workflowId ||
        newCriteria.workflowName !== oldCriteria.workflowName
      ) {
        this.refreshWorkflows();
      }
    },
  },
};
</script>

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
          data-cy="status-filter"
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
    <workflows-grid
      :workflows="formattedResults"
      :loading="loading"
      @onWorkflowsScroll="onWorkflowsScroll"
      v-if="!error"
    />
  </section>
</template>

<style lang="stylus">
@require "../../styles/definitions.styl"

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

  &.loading section.results table
    opacity 0.7
</style>
