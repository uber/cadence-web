<template>
  <table class="archival-table">
    <thead>
      <th>Workflow ID</th>
      <th>Run ID</th>
      <th>Name</th>
      <th>Status</th>
      <th>Start time</th>
      <th>End time</th>
    </thead>
    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>

<style lang="stylus">
  .archival-table {
    margin-top: 16px;
  }
</style>