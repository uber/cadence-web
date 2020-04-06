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
            workflowId: workflowId,
          },
        }"
      >
        {{ runId }}
      </router-link>
    </td>
    <td>
      {{ workflowName }}
    </td>
    <td>
      {{ closeStatus }}
    </td>
    <td>
      {{ startTime }}
    </td>
    <td>
      {{ closeTime }}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'archival-table-row',
  props: [
    'closeStatus',
    'closeTime',
    'runId',
    'startTime',
    'workflowId',
    'workflowName',
  ],
};
</script>
