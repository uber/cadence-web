<template>
  <section :class="{ 'task-list': true, loading }">
    <header><h3>Pollers</h3></header>
    <table v-if="pollers">
      <thead>
        <th>Identity</th>
        <th>Last Access Time</th>
        <th>Decision Handler</th>
        <th>Activity Handler</th>
      </thead>
      <tbody>
        <tr v-for="p in pollers" :key="p.identity">
          <td>{{ p.identity }}</td>
          <td>{{ p.lastAccessTime.format('ddd MMMM Do, h:mm:ss a') }}</td>
          <td class="decision" :data-handled="p.handlesDecisions"></td>
          <td class="activity" :data-handled="p.handlesActivities"></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      pollers: undefined,
      error: undefined,
      loading: true,
    };
  },
  created() {
    this.$http(
      `/api/domain/${this.$route.params.domain}/task-lists/${this.$route.params.taskList}/pollers`
    )
      .then(
        p => {
          this.pollers = Object.keys(p).map(identity => ({
            identity,
            lastAccessTime: moment(p[identity].lastAccessTime),
            handlesDecisions: p[identity].taskListTypes.includes('decision'),
            handlesActivities: p[identity].taskListTypes.includes('activity'),
          }));
        },
        e => {
          this.error = (e.json && e.json.message) || e.status || e.message;
        }
      )
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {},
};
</script>

<style lang="stylus">
@require "../styles/definitions.styl"

section.task-list
  > header
    padding inline-spacing-medium
  table
    max-width 1600px
  td:nth-child(3), td:nth-child(4)
    width 230px
  td[data-handled="true"]
    padding-left 75px
    icon-check()
</style>
