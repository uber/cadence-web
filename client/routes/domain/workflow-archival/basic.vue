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

  </section>
</template>

<script>
import debounce from 'lodash-es/debounce';
import { TextInput } from '~components';
import { SearchBar, SearchBarItem } from './components';
import WorkflowArchivalService from './workflow-archival-service';

export default {
  name: 'workflow-archival-basic',
  props: [],
  data() {
    return {
      loading: false,
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
    this.workflowArchivalService = WorkflowArchivalService();
    console.log('this.workflowArchivalService = ', this.workflowArchivalService);
  },
  methods: {
    fetchArchivalRecord: debounce(function fetchArchivalRecord(queryParams) {
      this.loading = true;
      this.workflowArchivalService.fetchArchivalRecord(queryParams);
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }, 200),
    setQueryParam({ target: { name, value } }) {
      this.$router.replaceQueryParam(
        name,
        value.trim(),
      );
    },
  },
  watch: {
    queryParams(queryParams) {
      this.fetchArchivalRecord(queryParams);
    },
  },
  components: {
    'search-bar': SearchBar,
    'search-bar-item': SearchBarItem,
    'text-input': TextInput,
  },
};
</script>

<style lang="stylus">

</style>