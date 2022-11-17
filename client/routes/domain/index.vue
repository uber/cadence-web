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
  props: ['clusterName', 'dateFormat', 'domain', 'timeFormat', 'timezone'],
  components: {
    'feature-flag': FeatureFlag,
    'navigation-bar': NavigationBar,
    'navigation-link': NavigationLink,
  },
};
</script>

<template>
  <section class="domain">
    <navigation-bar>
      <navigation-link
        icon="icon_search"
        label="Workflows"
        :to="{ name: 'workflow-list', params: { clusterName } }"
      />
      <navigation-link
        label="Settings"
        icon="icon_settings"
        :to="{ name: 'domain-settings', params: { clusterName } }"
      />
      <feature-flag display="inline" name="domainMetrics">
        <navigation-link
          label="Metrics"
          icon="icon_chart"
          :to="{ name: 'domain-metrics', params: { clusterName } }"
        />
      </feature-flag>
      <navigation-link
        label="Archival"
        icon="icon_trip-history"
        :to="{ name: 'workflow-archival', params: { clusterName } }"
      />
    </navigation-bar>
    <router-view
      name="workflow-list"
      :cluster-name="clusterName"
      :date-format="dateFormat"
      :domain="domain"
      :time-format="timeFormat"
      :timezone="timezone"
    />
    <router-view
      name="domain-settings"
      :cluster-name="clusterName"
      :domain="domain"
    />
    <router-view
      name="domain-metrics"
      :cluster-name="clusterName"
      :domain="domain"
    />
    <router-view
      name="workflow-archival"
      :cluster-name="clusterName"
      :date-format="dateFormat"
      :domain="domain"
      :time-format="timeFormat"
      :timezone="timezone"
    />
  </section>
</template>

<style lang="stylus">
section.domain {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-y: auto;
}
</style>
