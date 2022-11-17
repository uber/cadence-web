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

import DomainService from '../domain-service';
import { isArchivalEnabled } from './helpers';
import { ArchivalDisabledMessaging } from './components';

export default {
  name: 'workflow-archival',
  props: ['clusterName', 'dateFormat', 'domain', 'timeFormat', 'timezone'],
  data() {
    return {
      domainSettings: {},
      loading: true,
    };
  },
  async created() {
    const domainService = DomainService();

    this.domainSettings = await domainService.getDomainSettings(this.domain);
    this.loading = false;
  },
  computed: {
    isArchivalEnabled() {
      return isArchivalEnabled(this.domainSettings);
    },
  },
  components: {
    'archival-disabled-messaging': ArchivalDisabledMessaging,
  },
};
</script>

<template>
  <section class="workflow-archival" :class="{ loading }">
    <archival-disabled-messaging
      v-if="!loading && !isArchivalEnabled"
      :domain-settings="domainSettings"
    />
    <router-view
      name="workflow-archival-advanced"
      v-if="!loading && isArchivalEnabled"
      :cluster-name="clusterName"
      :date-format="dateFormat"
      :domain="domain"
      :timeFormat="timeFormat"
      :timezone="timezone"
    />
    <router-view
      name="workflow-archival-basic"
      v-if="!loading && isArchivalEnabled"
      :cluster-name="clusterName"
      :date-format="dateFormat"
      :domain="domain"
      :timeFormat="timeFormat"
      :timezone="timezone"
    />
  </section>
</template>

<style lang="stylus">
section.workflow-archival {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  overflow-y: auto;
}
</style>
