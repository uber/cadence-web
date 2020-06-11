<template>
  <section class="tasklist">
    <navigation-bar>
      <navigation-link
        icon="icon_eta"
        label="Pollers"
        :to="{ name: 'task-list/pollers' }"
      />
      <navigation-link
        icon="icon_fare-split"
        label="Partition"
        :to="{ name: 'task-list/partition' }"
      />
    </navigation-bar>
    <router-view
      name="pollers"
      :date-format="dateFormat"
      :domain="domain"
      :time-format="timeFormat"
      :timezone="timezone"
    />
    <router-view
      name="partition"
      :domain="domain"
    />
  </section>
</template>

<script>
import { NavigationBar, NavigationLink } from '~components';

export default {
  props: ['dateFormat', 'domain', 'timeFormat', 'timezone'],
  components: {
    'navigation-bar': NavigationBar,
    'navigation-link': NavigationLink,
  },
};
</script>

<style lang="stylus">
section.tasklist {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-y: auto;
}
</style>
