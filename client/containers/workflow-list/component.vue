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
  FILTER_MODE_ADVANCED,
  STATE_ALL,
  STATE_CLOSED,
  STATE_OPEN,
  STATUS_ALL,
  STATUS_CLOSED,
  STATUS_LIST,
  STATUS_OPEN,
} from './constants';
import {
  getCriteria,
  getFormattedResults,
  getMinStartDate,
  isRangeValid,
  isRouteRangeValid,
} from './helpers';
import {
  ButtonFill,
  DateRangePicker,
  ErrorMessage,
  TextInput,
  WorkflowGrid,
} from '~components';
import { getEndTimeIsoString, getStartTimeIsoString } from '~helpers';

export default {
  props: [
    'dateFormat',
    'domain',
    'fetchWorkflowListUrl',
    'filterBy',
    'filterMode',
    'filterModeButtonLabel',
    'queryString',
    'state',
    'status',
    'statusName',
    'timeFormat',
    'timezone',
    'workflowId',
    'workflowName',
  ],
  data() {
    return {
      loading: false,
      results: [],
      error: undefined,
      npt: undefined,
      nptAlt: undefined,
      statusList: STATUS_LIST,
      maxRetentionDays: undefined,
      FILTER_MODE_ADVANCED: FILTER_MODE_ADVANCED,
    };
  },
  async created() {
    await this.fetchDomain();
    this.fetchWorkflowList();
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
    endTime() {
      const { endTime, range } = this.$route.query;

      return getEndTimeIsoString(range, endTime);
    },
    formattedResults() {
      const { dateFormat, results, timeFormat, timezone } = this;

      return getFormattedResults({ dateFormat, results, timeFormat, timezone });
    },
    startTime() {
      const { range, startTime } = this.$route.query;

      if (this.range && this.range.startTime) {
        return getStartTimeIsoString(null, this.range.startTime.toISOString());
      }

      return getStartTimeIsoString(range, startTime);
    },
    range() {
      const { maxRetentionDays, minStartDate, state } = this;
      const query = this.$route.query || {};

      if (state === STATE_CLOSED && maxRetentionDays === undefined) {
        return null;
      }

      if (!this.isRouteRangeValid(minStartDate)) {
        const defaultRange = [STATE_ALL, STATE_OPEN].includes(state)
          ? 30
          : maxRetentionDays;
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

      return getCriteria({
        endTime,
        filterMode,
        queryString,
        startTime,
        status,
        workflowId,
        workflowName,
      });
    },
    minStartDate() {
      return this.getMinStartDate();
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

      const includeStatus = ![STATUS_ALL, STATUS_OPEN, STATUS_CLOSED].includes(
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

          if (prevRange && isRangeValid(prevRange, minStartDate)) {
            this.setRange(prevRange);
          } else {
            this.setRange(`last-${Math.min(30, this.maxRetentionDays)}-days`);
          }
        }
      });
    },
    async fetchWorkflowList() {
      if (!this.criteria || this.loading) {
        return;
      }

      if (
        this.filterMode === FILTER_MODE_ADVANCED &&
        !this.criteria.queryString
      ) {
        this.clearState();

        return;
      }

      let workflows = [];

      if (
        this.state !== STATE_ALL ||
        this.filterMode === FILTER_MODE_ADVANCED
      ) {
        const query = { ...this.criteria, nextPageToken: this.npt };

        if (query.queryString) {
          query.queryString = decodeURI(query.queryString);
        }

        const { workflows: wfs, nextPageToken } = await this.fetch(
          this.fetchWorkflowListUrl,
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
      const { maxRetentionDays, now, statusName } = this;

      return getMinStartDate({
        maxRetentionDays,
        now,
        statusName,
      });
    },
    refreshWorkflows: debounce(
      function refreshWorkflows() {
        this.clearState();
        this.fetchWorkflowList();
      },
      typeof Mocha === 'undefined' ? 200 : 60,
      { maxWait: 1000 }
    ),
    onFilterChange(event) {
      const target = event.target || event.testTarget; // test hook since Event.target is readOnly and unsettable
      const name = target.getAttribute('name');
      const value = target.value;

      this.$emit('onFilterChange', { [name]: value });
    },
    onStatusChange(status) {
      if (status) {
        this.$emit('onFilterChange', { status: status.value });
      }
    },
    isRouteRangeValid(minStartDate) {
      const { endTime, range, startTime } = this.$route.query || {};

      return isRouteRangeValid({
        endTime,
        minStartDate,
        range,
        startTime,
      });
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
      this.clearState();
      this.$emit('onFilterModeClick');
    },
    onWorkflowGridScroll(startIndex, endIndex) {
      if (!this.npt && !this.nptAlt) {
        return;
      }

      return this.fetchWorkflowList();
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
      <template v-if="filterMode === FILTER_MODE_ADVANCED">
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
        :label="filterModeButtonLabel"
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
