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
  name: 'archival-table-row',
  props: [
    'clusterName',
    'closeStatus',
    'closeTime',
    'domainName',
    'runId',
    'startTime',
    'workflowId',
    'workflowName',
  ],
};
</script>

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
            clusterName,
            domain: domainName,
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
