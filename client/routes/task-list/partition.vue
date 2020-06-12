<template>
  <div>
    Partition tab content
  </div>
</template>

<script>
export default {
  name: 'partition',
  async created() {
    const partitions = await this.$http(
      `/api/domains/${this.$route.params.domain}/task-lists/${this.$route.params.taskList}/partitions`
    );

    console.log('partitions = ', partitions);
  },
};
</script>