<template>
  <section class="workflow-archival" :class="{ loading }">
    <archival-disabled-messaging
      v-if="!loading && !isArchivalEnabled"
      :domain-settings="domainSettings"
    />
    <router-view
      name="workflow-archival-advanced"
      v-if="!loading && isArchivalEnabled"
      :date-format="dateFormat"
      :domain="domain"
      :timeFormat="timeFormat"
      :timezone="timezone"
    />
    <router-view
      name="workflow-archival-basic"
      v-if="!loading && isArchivalEnabled"
      :date-format="dateFormat"
      :domain="domain"
      :timeFormat="timeFormat"
      :timezone="timezone"
    />
  </section>
</template>

<script>
import DomainService from '../domain-service';
import { isArchivalEnabled } from './helpers';
import { ArchivalDisabledMessaging } from './components';

export default {
  name: 'workflow-archival',
  props: ['dateFormat', 'domain', 'timeFormat', 'timezone'],
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
    'archival-disabled-messaging': ArchivalDisabledMessaging,
  },
};
</script>

<style lang="stylus">
section.workflow-archival {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  overflow-y: auto;
}
</style>
