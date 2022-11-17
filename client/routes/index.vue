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

import { NavigationBar, NavigationLink } from '~components';

export default {
  components: {
    'navigation-bar': NavigationBar,
    'navigation-link': NavigationLink,
  },
  methods: {
    onNotification(event) {
      this.$emit('onNotification', event);
    },
    onWorkflowHistoryEventParamToggle(event) {
      this.$emit('onWorkflowHistoryEventParamToggle', event);
    },
  },
};
</script>

<template>
  <section class="window">
    <navigation-bar>
      <navigation-link
        :exact="true"
        icon="icon_search"
        label="Domains"
        :to="{ name: 'domain-search' }"
      />
      <navigation-link
        label="News"
        icon="icon_messages"
        :to="{ name: 'news' }"
      />
      <navigation-link label="Help" icon="icon_help" :to="{ name: 'help' }" />
    </navigation-bar>
    <router-view
      name="domain-search"
      @onNotification="onNotification"
      @onWorkflowHistoryEventParamToggle="onWorkflowHistoryEventParamToggle"
    />
    <router-view name="help" @onNotification="onNotification" />
    <router-view name="news" @onNotification="onNotification" />
  </section>
</template>

<style lang="stylus">
.window {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
