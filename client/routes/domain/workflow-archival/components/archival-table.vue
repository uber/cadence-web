<script>
// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export default {
  name: 'archival-table',
};
</script>

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
table.archival-table {
  position: relative;

  th {
    position: sticky;
    top: 0;
    background-color: white;
  }
}
</style>
