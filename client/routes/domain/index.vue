<template>
  <section>
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
      <navigation-link
        label="Archival"
        icon="icon_trip-history"
        :to="{ name: 'workflow-archival' }"
      />
    </navigation-bar>
    <router-view name="workflow-list" :domain="domain" />
    <router-view name="domain-settings" :domain="domain" />
    <router-view name="workflow-archival" :domain="domain" />
  </section>
</template>

<script>
import { NavigationBar, NavigationLink } from '~components';

export default {
  props: ['domain'],
  components: {
    'navigation-bar': NavigationBar,
    'navigation-link': NavigationLink,
  },
};
</script>

<style lang="stylus"></style>
