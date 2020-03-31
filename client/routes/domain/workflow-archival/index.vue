<template>
  <section class="workflow-archival" :class="{ loading }">
    <div v-if="!loading">
      <archival-disabled-messaging
        v-if="!isArchivalEnabled"
        :domain-settings="domainSettings"
      />
      <div v-if="isArchivalEnabled">
        <router-view
          name="workflow-archival-basic"
        />
      </div>
    </div>
  </section>
</template>

<script>
import DomainService from '../domain-service';
import { isArchivalEnabled } from './helpers';
import { ArchivalDisabledMessaging } from './components';

export default {
  name: 'workflow-archival',
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
    'archival-disabled-messaging': ArchivalDisabledMessaging,
  },
};
</script>

<style lang="stylus">
section.workflow-archival {

}
</style>
