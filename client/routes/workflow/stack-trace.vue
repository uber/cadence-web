<template>
  <section :class="{ 'stack-trace': true, loading }">
    <header v-if="stackTraceTimestamp">
      <span>Stack trace at {{ stackTraceTimestamp.format('h:mm:ss a') }}</span>
      <a href="#" class="refresh" @click="getStackTrace">Refresh</a>
    </header>

    <pre v-if="typeof stackTrace === 'string'">{{ stackTrace }}</pre>
    <span class="error" v-if="stackTrace && stackTrace.error">{{
      stackTrace.error
    }}</span>
  </section>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      loading: undefined,
      stackTrace: undefined,
      stackTraceTimestamp: undefined,
    };
  },
  props: ['baseAPIURL'],
  created() {
    this.getStackTrace();
  },
  methods: {
    getStackTrace() {
      this.loading = true;

      return this.$http
        .post(`${this.baseAPIURL}/query/__stack_trace`)
        .then(({ queryResult }) => {
          this.stackTrace = queryResult;
          this.stackTraceTimestamp = moment();
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.error(e);
          this.stackTrace = {
            error: (e.json && e.json.message) || e.status || e.message,
          };
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="stylus">
@require "../../styles/definitions.styl"

section.stack-trace
  padding layout-spacing-small
  header
    margin-bottom layout-spacing-medium
  a.refresh
    margin 0 1em
    action-button()
    icon-refresh()
</style>
