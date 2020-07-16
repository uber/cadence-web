<template>
  <section class="task-list">
    <navigation-bar>
      <navigation-link
        icon="icon_eta"
        label="Pollers"
        :to="{ name: 'task-list/pollers' }"
      />
      <feature-flag display="inline" name="taskListPartition">
        <navigation-link
          icon="icon_fare-split"
          label="Partition"
          :to="{ name: 'task-list/partition' }"
        />
      </feature-flag>
      <feature-flag display="inline" name="taskListMetrics">
        <navigation-link
          icon="icon_chart"
          label="Metrics"
          :to="{ name: 'task-list/metrics' }"
        />
      </feature-flag>
    </navigation-bar>
    <router-view
      name="pollers"
      :date-format="dateFormat"
      :domain="domain"
      :task-list="taskList"
      :time-format="timeFormat"
      :timezone="timezone"
    />
    <router-view name="partition" :domain="domain" :task-list="taskList" />
    <router-view name="metrics" :domain="domain" :task-list="taskList" />
  </section>
</template>

<script>
import { FeatureFlag, NavigationBar, NavigationLink } from '~components';

export default {
  props: ['dateFormat', 'domain', 'taskList', 'timeFormat', 'timezone'],
  components: {
    'feature-flag': FeatureFlag,
    'navigation-bar': NavigationBar,
    'navigation-link': NavigationLink,
  },
};
</script>

<style lang="stylus">
section.task-list {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-y: auto;
}
</style>
