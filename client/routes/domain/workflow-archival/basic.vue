<template>
  <section class="workflow-archival-basic" :class="{ loading }">
    <search-bar>
      <search-bar-item max-width="400px">
        <text-input
          label="Workflow ID"
          name="workflowId"
          type="search"
          :value="workflowId"
          @input="setQueryParam"
        />
      </search-bar-item>
      <search-bar-item max-width="400px">
        <text-input
          label="Run ID"
          name="runId"
          type="search"
          :value="runId"
          @input="setQueryParam"
        />
      </search-bar-item>
    </search-bar>
    <archival-table>
      <archival-table-row
        v-for="result in results"
        :key="result.runId"
        :run-id="result.runId"
        :workflow-id="result.workflowId"
      />
    </archival-table>
    <no-results :results="results" />
  </section>
</template>

<script>
import debounce from 'lodash-es/debounce';
import { NoResults, TextInput } from '~components';
import { ArchivalTable, ArchivalTableRow, SearchBar, SearchBarItem } from './components';
import WorkflowArchivalService from './workflow-archival-service';

export default {
  name: 'workflow-archival-basic',
  props: [],
  data() {
    return {
      loading: false,
      results: undefined,
    };
  },
  computed: {
    runId() {
      return this.$route.query.runId || '';
    },
    workflowId() {
      return this.$route.query.workflowId || '';
    },
    queryParams() {
      const { runId, workflowId } = this;
      return {
        runId,
        workflowId,
      };
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
      if (!queryParams.workflowId || !queryParams.runId) {
        return;
      }

      this.loading = true;
      this.workflowArchivalService.fetchArchivalRecord(queryParams);
      setTimeout(() => {
        this.loading = false;
        this.results = [
          {
            workflowId: 'helloworld_5a992dab-b0f2-4306-aa5d-13fe8faffe35',
            runId: '76711cfb-4afb-48f4-97fd-b0679a2cdba6',
          }
        ];
      }, 2000);
    }, 200),
    onQueryChange(queryParams) {
      this.clearResults();
      this.fetchArchivalRecord(queryParams);
    },
    setQueryParam({ target: { name, value } }) {
      this.$router.replaceQueryParam(
        name,
        value.trim(),
      );
    },
  },
  watch: {
    queryParams(queryParams) {
      this.onQueryChange(queryParams);
    },
  },
  components: {
    'archival-table': ArchivalTable,
    'archival-table-row': ArchivalTableRow,
    'no-results': NoResults,
    'search-bar': SearchBar,
    'search-bar-item': SearchBarItem,
    'text-input': TextInput,
  },
};
</script>

<style lang="stylus">

</style>