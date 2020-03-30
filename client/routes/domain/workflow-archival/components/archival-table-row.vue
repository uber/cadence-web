<template>
  <tr>
    <td>
      {{ workflowId }}
    </td>
    <td>
      <router-link
        :to="{
          name: 'workflow/summary',
          params: {
            runId: runId,
            workflowId: workflowId
          },
        }"
      >
        {{ runId}}
      </router-link>
    </td>
    <td>
      { TODO - Visibility record }
    </td>
  </tr>
</template>

<script>
export default {
  name: 'archival-table-row',
  props: ['runId', 'workflowId'],
};
</script>