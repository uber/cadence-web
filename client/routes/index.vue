<script>
import { NavigationBar, NavigationLink } from '~components';

export default {
  components: {
    'navigation-bar': NavigationBar,
    'navigation-link': NavigationLink,
  },
  methods: {
    onNotification(event) {
      this.$emit('onNotification', event);
    },
    onWorkflowHistoryEventParamToggle(event) {
      this.$emit('onWorkflowHistoryEventParamToggle', event);
    },
  },
};
</script>

<template>
  <section>
    <navigation-bar>
      <navigation-link
        :exact="true"
        icon="icon_search"
        label="Domains"
        :to="{ name: 'domain-list' }"
      />
      <navigation-link
        label="News"
        icon="icon_messages"
        :to="{ name: 'news' }"
      />
      <navigation-link label="Help" icon="icon_help" :to="{ name: 'help' }" />
    </navigation-bar>
    <router-view
      name="domain-list"
      @onNotification="onNotification"
      @onWorkflowHistoryEventParamToggle="onWorkflowHistoryEventParamToggle"
    />
    <router-view name="help" @onNotification="onNotification" />
    <router-view name="news" @onNotification="onNotification" />
  </section>
</template>

<style lang="stylus"></style>
