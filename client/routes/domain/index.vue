<template>
  <section class="domain">
    <navigation-bar>
      <navigation-link
        icon="icon_search"
        label="Workflows"
        :to="{ name: 'workflow-list' }"
      />
      <navigation-link
        label="Settings"
        icon="icon_settings"
        :to="{ name: 'domain-settings' }"
      />
      <feature-flag display="inline" name="domainMetrics">
        <navigation-link
          label="Metrics"
          icon="icon_chart"
          :to="{ name: 'domain-metrics' }"
        />
      </feature-flag>
      <navigation-link
        label="Archival"
        icon="icon_trip-history"
        :to="{ name: 'workflow-archival' }"
      />
    </navigation-bar>
    <router-view
      name="workflow-list"
      :date-format="dateFormat"
      :domain="domain"
      :time-format="timeFormat"
      :timezone="timezone"
    />
    <router-view name="domain-settings" :domain="domain" />
    <router-view name="domain-metrics" :domain="domain" />
    <router-view
      name="workflow-archival"
      :date-format="dateFormat"
      :domain="domain"
      :time-format="timeFormat"
      :timezone="timezone"
    />
  </section>
</template>

<script>
import { FeatureFlag, NavigationBar, NavigationLink } from '~components';

export default {
  props: ['dateFormat', 'domain', 'timeFormat', 'timezone'],
  components: {
    'feature-flag': FeatureFlag,
    'navigation-bar': NavigationBar,
    'navigation-link': NavigationLink,
  },
};
</script>

<style lang="stylus">
section.domain {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-y: auto;
}
</style>
