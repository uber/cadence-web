<template>
  <table v-if="partitionList">
    <caption>
      {{
        title
      }}
    </caption>
    <thead>
      <th>Host name</th>
      <th>Partition</th>
    </thead>
    <tbody>
      <tr v-for="partition in partitionList" :key="partition.key">
        <td>{{ partition.ownerHostName }}</td>
        <td>{{ partition.key }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'partition-table',
  props: ['title', 'partitionList'],
};
</script>
