<template>
  <section class="workflow-archives" :class="{ loading }">
    <div v-if="!loading">
      <archives-disabled-messaging
        v-if="!isArchivalEnabled"
        :domain-settings="domainSettings"
      />
      <div v-if="isArchivalEnabled">
        <!-- TODO: will work on enabled state in future PR -->
      </div>
    </div>
  </section>
</template>

<script>
import DomainService from '../domain-service';
import { isArchivalEnabled } from './helpers';
import ArchivesDisabledMessaging from './components/archives-disabled-messaging';

export default {
  props: ['domain'],
  data() {
    return {
      domainSettings: {},
      loading: true,
    };
  },
  async created() {
    const domainService = DomainService();

    this.domainSettings = await domainService.getDomainSettings(this.domain);
    this.loading = false;
  },
  computed: {
    isArchivalEnabled() {
      return isArchivalEnabled(this.domainSettings);
    },
  },
  components: {
    'archives-disabled-messaging': ArchivesDisabledMessaging,
  },
};
</script>

<style lang="stylus">
section.workflow-archives {

}
</style>
