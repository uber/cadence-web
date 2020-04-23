<template>
  <section>
    <navigation-bar>
      <navigation-link
        :exact="true"
        icon="icon_search"
        label="Domains"
        :to="{ name: 'domain-list' }"
      />
      <navigation-link label="News" icon="icon_messages" :to="{ name: 'news' }" />
      <navigation-link label="Help" icon="icon_help" :to="{ name: 'help' }" />
    </navigation-bar>
    <router-view name="domain-list" />
    <router-view name="help" />
    <router-view name="news" />
  </section>
</template>

<script>
import { NavigationBar, NavigationLink } from '~components';

export default {
  components: {
    'navigation-bar': NavigationBar,
    'navigation-link': NavigationLink,
  },
};
</script>

<style lang="stylus"></style>
