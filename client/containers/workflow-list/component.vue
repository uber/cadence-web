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
import {
  ButtonFill,
  DateRangePicker,
  ErrorMessage,
  TextInput,
  WorkflowGrid,
} from '~components';
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
      npt: undefined,
      nptAlt: undefined,
      statusList: [
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
    };
  },
  async created() {
    await this.fetchDomain();
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
    'button-fill': ButtonFill,
    'date-range-picker': DateRangePicker,
    'error-message': ErrorMessage,
    'text-input': TextInput,
    'workflow-grid': WorkflowGrid,
  },
  computed: {
    fetchUrl() {
      const { domain, filterMode, state } = this;

      if (filterMode === 'advanced') {
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
    filterMode() {
      return this.$route.query.filterMode || 'basic';
    },
    formattedResults() {
      const { dateFormat, results, timeFormat, timezone } = this;

      return results.map(result => ({
        workflowId: result.execution.workflowId,
        runId: result.execution.runId,
        uniqueId: `${result.execution.runId}-${result.closeStatus || 'OPEN'}`,
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
        ? this.statusList[0]
        : this.statusList.find(s => s.value === this.$route.query.status);
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
        const defaultRange = ['all', 'open'].includes(state)
          ? 30
          : this.maxRetentionDays;
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
        filterMode,
        queryString,
        startTime,
        statusName: status,
        workflowId,
        workflowName,
      } = this;

      if (!startTime || !endTime) {
        return null;
      }

      if (filterMode === 'advanced') {
        return {
          queryString: queryString.trim(),
        };
      }

      const criteria = {
        startTime,
        endTime,
        status,
        ...(workflowId && { workflowId: workflowId.trim() }),
        ...(workflowName && { workflowName: workflowName.trim() }),
      };

      return criteria;
    },
    queryString() {
      return this.$route.query.queryString || '';
    },
    minStartDate() {
      return this.getMinStartDate();
    },
    workflowId() {
      return this.$route.query.workflowId;
    },
    workflowName() {
      return this.$route.query.workflowName;
    },
  },
  methods: {
    clearState() {
      this.error = undefined;
      this.loading = false;
      this.npt = undefined;
      this.nptAlt = undefined;
      this.results = [];
    },
    async fetch(url, queryWithStatus) {
      let workflows = [];
      let nextPageToken = '';

      if ([null, ''].includes(queryWithStatus.nextPageToken)) {
        return { workflows, nextPageToken };
      }

      this.loading = true;
      this.error = undefined;

      const includeStatus = !['ALL', 'OPEN', 'CLOSED'].includes(
        queryWithStatus.status
      );
      const { status, ...queryWithoutStatus } = queryWithStatus;
      const query = includeStatus ? queryWithStatus : queryWithoutStatus;

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
    fetchDomain() {
      const { domain } = this;

      this.loading = true;

      return this.$http(`/api/domains/${domain}`).then(r => {
        this.maxRetentionDays =
          Number(r.configuration.workflowExecutionRetentionPeriodInDays) || 30;
        this.loading = false;

        const minStartDate = this.getMinStartDate();

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

      if (this.filterMode === 'advanced' && !this.criteria.queryString) {
        this.clearState();

        return;
      }

      let workflows = [];

      if (this.state !== 'all' || this.filterMode === 'advanced') {
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

        this.npt = nptOpen;

        const {
          workflows: wfsClosed,
          nextPageToken: nptClosed,
        } = await this.fetch(
          `/api/domains/${domain}/workflows/closed`,
          queryClosed
        );

        this.nptAlt = nptClosed;

        workflows = [...wfsOpen, ...wfsClosed];
      }

      this.results = [...this.results, ...workflows];
    },
    getMinStartDate() {
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
    refreshWorkflows: debounce(
      function refreshWorkflows() {
        this.clearState();
        this.fetchWorkflows();
      },
      typeof Mocha === 'undefined' ? 200 : 60,
      { maxWait: 1000 }
    ),
    onFilterChange(e) {
      const target = e.target || e.testTarget; // test hook since Event.target is readOnly and unsettable

      this.$router.replaceQueryParam(target.getAttribute('name'), target.value);
    },
    onStatusChange(status) {
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
    onFilterModeClick() {
      const { query } = this.$route;

      this.clearState();
      const filterMode = this.filterMode === 'advanced' ? 'basic' : 'advanced';

      this.$router.replace({ query: { ...query, filterMode } });
    },
    onWorkflowGridScroll(startIndex, endIndex) {
      if (!this.npt && !this.nptAlt) {
        return;
      }

      return this.fetchWorkflows();
    },
  },
  watch: {
    criteria(newCriteria, oldCriteria) {
      if (
        newCriteria &&
        oldCriteria &&
        (newCriteria.startTime !== oldCriteria.startTime ||
          newCriteria.endTime !== oldCriteria.endTime ||
          newCriteria.queryString !== oldCriteria.queryString ||
          newCriteria.status !== oldCriteria.status ||
          newCriteria.workflowId !== oldCriteria.workflowId ||
          newCriteria.workflowName !== oldCriteria.workflowName)
      ) {
        this.refreshWorkflows();
      }
    },
  },
};
</script>

<template>
  <section class="workflow-list" :class="{ loading, ready: !loading }">
    <header class="filters">
      <template v-if="filterMode === 'advanced'">
        <text-input
          label="Query"
          type="search"
          name="queryString"
          :value="queryString"
          @input="onFilterChange"
        />
      </template>
      <template v-else>
        <text-input
          label="Workflow ID"
          type="search"
          name="workflowId"
          :value="workflowId"
          @input="onFilterChange"
        />
        <text-input
          label="Workflow Name"
          type="search"
          name="workflowName"
          :value="workflowName"
          @input="onFilterChange"
        />
        <v-select
          class="status"
          :value="status"
          :options="statusList"
          :on-change="onStatusChange"
          :searchable="false"
          data-cy="status-filter"
        />
        <text-input
          label="Filter by"
          max-width="105px"
          name="filterBy"
          readonly
          :value="filterBy"
        />
        <date-range-picker
          :date-range="range"
          :max-days="maxRetentionDays"
          :min-start-date="minStartDate"
          @change="setRange"
        />
      </template>
      <button-fill
        @click="onFilterModeClick"
        :label="filterMode === 'advanced' ? 'basic' : 'advanced'"
        uppercase
      />
    </header>
    <error-message :error="error" />
    <workflow-grid
      :workflows="formattedResults"
      :loading="loading"
      @onScroll="onWorkflowGridScroll"
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

  &.loading section.results table
    opacity 0.7
</style>
