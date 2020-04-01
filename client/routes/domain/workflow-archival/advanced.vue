<template>
  <section class="workflow-archival-basic">
    <header>
      <grid>
        <grid-column>
          <text-input
            label="Query"
            name="queryString"
            type="search"
            :value="queryString"
            @input="onTextChange"
          />
        </grid-column>
        <grid-column width="85px">
          <button-fill
            label="BASIC"
            tag="router-link"
            :to="{
              name: 'workflow-archival-basic',
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
import pagedGrid from '~components/paged-grid';
import { ButtonFill, ErrorMessage, Grid, GridColumn, LoadingSpinner, NoResults, TextInput } from '~components';
import { ArchivalTable, ArchivalTableRow } from './components';
import WorkflowArchivalService from './workflow-archival-service';

export default pagedGrid({
  name: 'workflow-archival-advanced',
  props: ['domain'],
  data() {
    return {
      error: undefined,
      loading: false,
      nextPageToken: undefined,
      npt: undefined,
      results: undefined,
    };
  },
  computed: {
    queryString() {
      return this.$route.query && this.$route.query.queryString || '';
    },
  },
  created() {
    const { domain, queryString } = this;
    this.workflowArchivalService = WorkflowArchivalService({ domain });
    this.onQueryChange({ queryString });
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
      if (!queryParams || !queryParams.queryString) {
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
      this.setQueryParam(name, value);
    },
    setQueryParam(name, value) {
      this.$router.replaceQueryParam(name, value);
    },
  },
  watch: {
    queryString(queryString) {
      this.onQueryChange({ queryString });
    },
    nextPageToken(nextPageToken) {
      const { queryString } = this;
      if (nextPageToken && queryString) {
        this.onNextTokenChange({ queryString, nextPageToken });
      }
    },
  },
  components: {
    'archival-table': ArchivalTable,
    'archival-table-row': ArchivalTableRow,
    'button-fill': ButtonFill,
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