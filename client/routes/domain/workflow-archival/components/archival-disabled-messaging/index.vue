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

import {
  isHistoryArchivalEnabled,
  isVisibilityArchivalEnabled,
  replaceDomain,
} from '../../helpers';
import {
  archivalDisabledMessage,
  historyArchivalDisabledMessage,
  historyArchivalEnableCommand,
  historyArchivalLinks,
  visibilityArchivalDisabledMessage,
  visibilityArchivalEnableCommand,
} from './constants';

export default {
  name: 'archival-disabled-messaging',
  props: ['domainSettings'],
  data() {
    return {
      archivalDisabledMessage,
      historyArchivalDisabledMessage,
      historyArchivalLinks,
      visibilityArchivalDisabledMessage,
    };
  },
  computed: {
    isHistoryArchivalEnabled() {
      return isHistoryArchivalEnabled(this.domainSettings);
    },
    isVisibilityArchivalEnabled() {
      return isVisibilityArchivalEnabled(this.domainSettings);
    },
    historyArchivalEnableCommand() {
      return replaceDomain(historyArchivalEnableCommand, this.domainSettings);
    },
    visibilityArchivalEnableCommand() {
      return replaceDomain(
        visibilityArchivalEnableCommand,
        this.domainSettings
      );
    },
  },
};
</script>

<template>
  <div class="archival-disabled-messaging">
    <div class="message-group">
      <p v-for="(message, index) in archivalDisabledMessage" :key="index">
        {{ message }}
      </p>
      <div v-if="historyArchivalLinks">
        <div v-for="(link, index) in historyArchivalLinks" :key="index">
          <a :href="link.href" rel="noopener noreferrer" target="_blank">
            {{ link.label }}
          </a>
        </div>
      </div>
    </div>
    <div v-if="!isHistoryArchivalEnabled" class="message-group">
      <p>
        {{ historyArchivalDisabledMessage }}
      </p>
      <div v-if="historyArchivalEnableCommand">
        <pre>{{ historyArchivalEnableCommand }}</pre>
      </div>
    </div>
    <div v-if="!isVisibilityArchivalEnabled" class="message-group">
      <p>
        {{ visibilityArchivalDisabledMessage }}
      </p>
      <div v-if="visibilityArchivalEnableCommand">
        <pre>{{ visibilityArchivalEnableCommand }}</pre>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
.archival-disabled-messaging {
  padding: 10px 50px;

  .message-group {
    margin: 20px 0;
  }

  a {
    font-size: 20px;
    line-height: 36px;
  }

  p {
    font-size: 20px;
    line-height: 36px;
  }

  pre {
    display: inline-block;
  }
}
</style>
