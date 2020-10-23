<template>
  <section :class="{ 'task-list-pollers': true, loading }">
    <table v-if="pollers">
      <thead>
        <th>Identity</th>
        <th>Last Access Time</th>
        <th>Decision Handler</th>
        <th>Activity Handler</th>
      </thead>
      <tbody>
        <tr v-for="p in formattedPollers" :key="p.identity">
          <td>{{ p.identity }}</td>
          <td>{{ p.lastAccessTime }}</td>
          <td class="decision" :data-handled="p.handlesDecisions"></td>
          <td class="activity" :data-handled="p.handlesActivities"></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { getDatetimeFormattedString } from '~helpers';

export default {
  props: ['dateFormat', 'domain', 'taskList', 'timeFormat', 'timezone'],
  data() {
    return {
      pollers: undefined,
      error: undefined,
      loading: true,
    };
  },
  computed: {
    formattedPollers() {
      const { dateFormat, pollers, timeFormat, timezone } = this;

      return (
        pollers &&
        pollers.map(poller => ({
          ...poller,
          lastAccessTime: getDatetimeFormattedString({
            date: poller.lastAccessTime,
            dateFormat,
            timeFormat,
            timezone,
          }),
        }))
      );
    },
  },
  created() {
    this.$http(
      `/api/domains/${this.domain}/task-lists/${this.taskList}/pollers`
    )
      .then(
        p => {
          this.pollers = Object.keys(p).map(identity => ({
            identity,
            lastAccessTime: p[identity].lastAccessTime,
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
@require "../../styles/definitions.styl"

section.task-list-pollers
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
