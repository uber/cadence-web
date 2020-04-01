<template>
  <section class="workflow-archival-basic">
    <header>
      <grid>
        <grid-column>
          <text-input
            label="Workflow ID"
            name="workflowId"
            type="search"
            :value="workflowId"
            @input="onTextChange"
          />
        </grid-column>
        <grid-column>
          <text-input
            label="Workflow Name"
            name="workflowName"
            type="search"
            :value="workflowName"
            @input="onTextChange"
          />
        </grid-column>
        <grid-column width="160px">
          <v-select
            :on-change="onSelectChange"
            :options="statusList"
            :searchable="false"
            :value="status"
          />
        </grid-column>
        <grid-column width="165px">
          <text-input
            label="Filter by"
            readonly
            :value="filterBy"
          />
        </grid-column>
        <grid-column width="325px">
          <date-range-picker
            :date-range="range"
            @change="onDateRangeChange"
          />
        </grid-column>
        <grid-column width="120px">
          <button-fill
            label="ADVANCED"
            tag="router-link"
            :to="{
              name: 'workflow-archival-advanced',
            }"
          />
        </grid-column>
      </grid>
    </header>
    <section class="results">
      <archival-table
        v-infinite-scroll="nextPage"
        infinite-scroll-disabled="disableInfiniteScroll"
        infinite-scroll-distance="20"
        infinite-scroll-immediate-check="false"
      >
        <archival-table-row
          v-for="result in results"
          :close-status="result.closeStatus"
          :close-time="result.closeTime"
          :key="result.runId"
          :run-id="result.runId"
          :start-time="result.startTime"
          :workflow-id="result.workflowId"
          :workflow-name="result.workflowName"
        />
      </archival-table>
      <error-message :error="error" />
      <no-results :results="results" />
      <loading-spinner v-if="loading" />
    </section>
  </section>
</template>

<script>
import debounce from 'lodash-es/debounce';
import moment from 'moment';
import pagedGrid from '~components/paged-grid';
import { ButtonFill, DateRangePicker, ErrorMessage, Grid, GridColumn, LoadingSpinner, NoResults, TextInput } from '~components';
import { getEndTimeIsoString, getStartTimeIsoString } from '~helpers';
import { ArchivalTable, ArchivalTableRow } from './components';
import { ARCHIVAL_STATUS_LIST } from './constants';
import WorkflowArchivalService from './workflow-archival-service';

export default pagedGrid({
  name: 'workflow-archival-basic',
  props: ['domain'],
  data() {
    return {
      error: undefined,
      filterBy: 'CloseTime',
      loading: false,
      nextPageToken: undefined,
      npt: undefined,
      results: undefined,
      statusList: ARCHIVAL_STATUS_LIST
    };
  },
  computed: {
    endTime() {
      const { range } = this;
      const { endTime } = this.$route.query || {};
      return getEndTimeIsoString(range, endTime);
    },
    queryParams() {
      const { endTime, workflowName, statusName: status, startTime, workflowId } = this;

      if (!startTime || !endTime) {
        return null;
      }

      const includeStatus = status !== 'CLOSED';

      return {
        endTime,
        startTime,
        ...(includeStatus && { status }),
        ...(workflowId && { workflowId }),
        ...(workflowName && { workflowName }),
      };
    },
    range() {
      const { endTime, range, startTime } = this.$route.query || {};
      if (startTime && endTime) {
        return {
          endTime: moment(endTime),
          startTime: moment(startTime),
        };
      }
      if (range) {
        return range;
      }
      return 'last-30-days';
    },
    workflowName() {
      return this.$route.query && this.$route.query.workflowName || '';
    },
    status() {
      const statusValue = this.$route.query && this.$route.query.status;
      return !statusValue
        ? ARCHIVAL_STATUS_LIST[0]
        : this.statusList.find(({ value }) => value === statusValue);
    },
    statusName() {
      return this.status.value;
    },
    startTime() {
      const { range } = this;
      const { startTime } = this.$route.query || {};
      return getStartTimeIsoString(range, startTime);
    },
    workflowId() {
      return this.$route.query && this.$route.query.workflowId || '';
    },
  },
  created() {
    const { domain, queryParams } = this;
    this.workflowArchivalService = WorkflowArchivalService({ domain });
    this.onQueryChange({ ...queryParams, nextPageToken: undefined });
  },
  methods: {
    resetState() {
      this.error = undefined;
      this.loading = false;
      this.results = undefined;
      this.npt = undefined;
      this.nextPageToken = undefined;
    },
    fetchArchivalRecord: debounce(async function fetchArchivalRecord(queryParams) {
      if (!queryParams || !queryParams.startTime || !queryParams.endTime) {
        return;
      }

      this.loading = true;

      try {
        const { results, nextPageToken } = await this.workflowArchivalService.fetchArchivalRecords(queryParams);
        this.results = this.results
          ? this.results.concat(results)
          : results;

        this.npt = nextPageToken;
      } catch (error) {
        this.npt = undefined;
        this.error = (error.json && error.json.message) || error.status || error.message;
      }

      this.loading = false;
    }, 200),
    onDateRangeChange(updatedRange) {
      const { endTime, startTime, range, ...query } = { ...this.$route.query };

      if (typeof updatedRange === 'string') {
        query.range = updatedRange;
      } else if (typeof updatedRange === 'object' && updatedRange.endTime && updatedRange.startTime) {
        query.endTime = updatedRange.endTime.toISOString();
        query.startTime = updatedRange.startTime.toISOString();
      }

      this.$router.replace({ query });
    },
    onQueryChange(queryParams) {
      this.resetState();
      if (queryParams) {
        this.fetchArchivalRecord({ ...queryParams, nextPageToken: undefined });
      }
    },
    onNextTokenChange(queryParams) {
      this.fetchArchivalRecord(queryParams);
    },
    onTextChange({ target: { name, value } }) {
      this.setQueryParam(name, value.trim());
    },
    onSelectChange({ value }) {
      this.setQueryParam('status', value);
    },
    setQueryParam(name, value) {
      this.$router.replaceQueryParam(name, value);
    },
  },
  watch: {
    queryParams(queryParams) {
      this.onQueryChange(queryParams);
    },
    nextPageToken(nextPageToken) {
      const { queryParams } = this;
      if (nextPageToken && queryParams) {
        this.onNextTokenChange({ ...queryParams, nextPageToken });
      }
    },
  },
  components: {
    'archival-table': ArchivalTable,
    'archival-table-row': ArchivalTableRow,
    'button-fill': ButtonFill,
    'date-range-picker': DateRangePicker,
    'error-message': ErrorMessage,
    'grid': Grid,
    'grid-column': GridColumn,
    'loading-spinner': LoadingSpinner,
    'no-results': NoResults,
    'text-input': TextInput,
  },
});
</script>

<style lang="stylus">
section.workflow-archival-basic {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  overflow-y: auto;

  header {
    padding: 16px;
  }

  section.results {
    margin-top: 16px;
    min-height: 100px;
    overflow: auto;
  }

  paged-grid();
}
</style>