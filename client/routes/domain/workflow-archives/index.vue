<template>
  <section :class="{ loading }">
    <div v-if="!loading">
      <div v-if="!isHistoryArchivalEnabled">
        {{ historyArchivalDisabledMessage }}
      </div>
      <div v-if="!isVisibilityArchivalEnabled">
        {{ visibilityArchivalDisabledMessage }}
      </div>
      <div v-if="isEnabled">
        Page Enabled!
      </div>
    </div>
  </section>
</template>

<script>
import {
  historyArchivalDisabledMessage,
  visibilityArchivalDisabledMessage,
} from './constants';
import DomainService from '../domain-service';

export default {
  props: ['domain'],
  data() {
    return {
      domainSettings: {},
      historyArchivalDisabledMessage,
      loading: true,
      visibilityArchivalDisabledMessage,
    };
  },
  async created() {
    const domainService = DomainService();
    this.domainSettings = await domainService.getDomainSettings(this.domain);
    this.loading = false;
  },
  computed: {
    isEnabled() {
      return this.isHistoryArchivalEnabled && this.isVisibilityArchivalEnabled;
    },
    isHistoryArchivalEnabled() {
      // TODO
      return true;
    },
    isVisibilityArchivalEnabled() {
      // TODO
      return true;
    },
  },
};
</script>

<style lang="stylus">

</style>