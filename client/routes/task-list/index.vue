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

import { FeatureFlag, NavigationBar, NavigationLink } from '~components';

export default {
  props: [
    'clusterName',
    'dateFormat',
    'domain',
    'taskList',
    'timeFormat',
    'timezone',
  ],
  components: {
    'feature-flag': FeatureFlag,
    'navigation-bar': NavigationBar,
    'navigation-link': NavigationLink,
  },
};
</script>

<template>
  <section class="task-list">
    <navigation-bar>
      <navigation-link
        icon="icon_eta"
        label="Pollers"
        :to="{
          name: 'task-list/pollers',
          params: { clusterName },
        }"
      />
      <feature-flag display="inline" name="taskListPartition">
        <navigation-link
          icon="icon_fare-split"
          label="Partition"
          :to="{
            name: 'task-list/partition',
            params: { clusterName },
          }"
        />
      </feature-flag>
      <feature-flag display="inline" name="taskListMetrics">
        <navigation-link
          icon="icon_chart"
          label="Metrics"
          :to="{
            name: 'task-list/metrics',
            params: { clusterName },
          }"
        />
      </feature-flag>
    </navigation-bar>
    <router-view
      name="pollers"
      :date-format="dateFormat"
      :domain="domain"
      :task-list="taskList"
      :time-format="timeFormat"
      :timezone="timezone"
    />
    <router-view name="partition" :domain="domain" :task-list="taskList" />
    <router-view name="metrics" :domain="domain" :task-list="taskList" />
  </section>
</template>

<style lang="stylus">
section.task-list {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-y: auto;
}
</style>
