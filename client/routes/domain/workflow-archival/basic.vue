<template>
  <section class="workflow-archival-basic">
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
          label="Run ID"
          name="runId"
          type="search"
          :value="runId"
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
    </grid>
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
        :workflow-type="result.workflowType"
      />
    </archival-table>
    <no-results :results="results" />
    <loading-spinner v-if="loading" />
  </section>
</template>

<script>
import debounce from 'lodash-es/debounce';
import moment from 'moment';
import pagedGrid from '~components/paged-grid';
import { DateRangePicker, Grid, GridColumn, LoadingSpinner, NoResults, TextInput } from '~components';
import { getEndTimeIsoString, getStartTimeIsoString } from '~helpers';
import { ArchivalTable, ArchivalTableRow, SearchBar, SearchBarItem } from './components';
import { ARCHIVAL_STATUS_LIST } from './constants';
import WorkflowArchivalService from './workflow-archival-service';

export default pagedGrid({
  name: 'workflow-archival-basic',
  props: [],
  data() {
    return {
      filterBy: 'CloseTime',
      loading: false,
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
      const { endTime, runId, status, startTime, workflowId } = this;

      if (!startTime || !endTime) {
        return null;
      }

      return {
        endTime,
        runId,
        status,
        startTime,
        workflowId,
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
    runId() {
      return this.$route.query && this.$route.query.runId || '';
    },
    status() {
      const statusValue = this.$route.query && this.$route.query.status;
      return !statusValue
        ? ARCHIVAL_STATUS_LIST[0]
        : this.statusList.find(({ value }) => value === statusValue);
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
    const { queryParams } = this;
    this.workflowArchivalService = WorkflowArchivalService();
    this.onQueryChange(queryParams);
  },
  methods: {
    clearResults() {
      this.results = undefined;
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

        console.log('results = ', results);
        console.log('this.results = ', this.results);
        this.npt = nextPageToken;
      } catch (error) {
        // TODO - Handle error here...
        this.npt = undefined;
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
      this.clearResults();
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
      this.nextPageToken = undefined;
      if (queryParams) {
        this.onQueryChange({ ...queryParams, nextPageToken: this.nextPageToken });
      }
    },
  },
  components: {
    'archival-table': ArchivalTable,
    'archival-table-row': ArchivalTableRow,
    'date-range-picker': DateRangePicker,
    'grid': Grid,
    'grid-column': GridColumn,
    'loading-spinner': LoadingSpinner,
    'no-results': NoResults,
    'search-bar': SearchBar,
    'search-bar-item': SearchBarItem,
    'text-input': TextInput,
  },
});
</script>

<style lang="stylus">
.workflow-archival-basic {
  padding: 16px;

  paged-grid();
}
</style>