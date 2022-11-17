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

import { ButtonFill } from '~components';

export default {
  name: 'footer-toolbar',
  props: {
    clusterName: {
      type: String,
    },
    pendingTaskCount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    pendingTasksButtonDisabled() {
      const { pendingTaskCount } = this;

      return pendingTaskCount === 0;
    },
    pendingTasksButtonLabel() {
      const { pendingTaskCount } = this;

      return `${pendingTaskCount} PENDING TASK${
        pendingTaskCount === 1 ? '' : 'S'
      }`;
    },
  },
  components: {
    'button-fill': ButtonFill,
  },
};
</script>

<template>
  <div class="footer-toolbar">
    <button-fill
      :disabled="pendingTasksButtonDisabled"
      disabled-label="No pending tasks"
      :label="pendingTasksButtonLabel"
      size="small"
      tag="router-link"
      :to="{
        name: 'workflow/pending',
        params: { clusterName },
      }"
    />
  </div>
</template>

<style lang="stylus">
.footer-toolbar {
  background-color: #f8f8f9;
  box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.2);
  padding: 6px 12px 6px 55px;
  position: relative;
}
</style>
