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

import { getQueryResult } from './helpers';
import { getDatetimeFormattedString } from '~helpers';
import { httpService } from '~services';

export default {
  data() {
    return {
      loading: undefined,
      stackTrace: undefined,
      stackTraceTimestamp: undefined,
    };
  },
  props: [
    'baseAPIURL',
    'clusterName',
    'dateFormat',
    'isWorkerRunning',
    'taskListName',
    'timeFormat',
    'timezone',
  ],
  computed: {
    formattedStackTraceTimestamp() {
      const { dateFormat, stackTraceTimestamp, timeFormat, timezone } = this;

      return stackTraceTimestamp
        ? getDatetimeFormattedString({
            date: stackTraceTimestamp,
            dateFormat,
            timeFormat,
            timezone,
          })
        : '';
    },
  },
  created() {
    if (!this.isWorkerRunning) {
      return;
    }

    this.getStackTrace();
  },
  methods: {
    getStackTrace() {
      this.loading = true;

      return httpService
        .post(`${this.baseAPIURL}/query/__stack_trace`)
        .then(({ queryResult }) => {
          this.stackTrace = getQueryResult(queryResult);
          this.stackTraceTimestamp = new Date();
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.error(e);
          this.stackTrace = {
            error: (e.json && e.json.message) || e.status || e.message,
          };
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  watch: {
    isWorkerRunning: function(newVal, oldVal) {
      if (newVal == false) {
        this.queries = [];

        return;
      }

      this.getStackTrace();
    },
  },
};
</script>

<template>
  <section :class="{ 'stack-trace': true, loading }" data-cy="stack-trace">
    <header v-if="stackTraceTimestamp">
      <span>Stack trace at {{ formattedStackTraceTimestamp }}</span>
      <a href="#" class="refresh" @click="getStackTrace">Refresh</a>
    </header>

    <pre
      v-if="stackTrace && stackTrace.payloads !== undefined"
      class="stack-trace-view"
      >{{ stackTrace.payloads }}</pre
    >

    <span class="error" v-if="stackTrace && stackTrace.error">
      {{ stackTrace.error }}
    </span>
    <span v-if="!isWorkerRunning" class="no-queries">
      There are no Workers currently listening to the Task List:
      <router-link
        :to="{
          name: 'task-list',
          params: {
            clusterName,
            taskList: taskListName,
          },
        }"
        >{{ taskListName }}
      </router-link>
    </span>
  </section>
</template>

<style lang="stylus">
@require "../../styles/definitions.styl"

section.stack-trace
  padding layout-spacing-small
  header
    margin-bottom layout-spacing-medium
  a.refresh
    margin 0 1em
    action-button()
    icon-refresh()

section .stack-trace-view
  white-space pre-wrap

span.no-queries {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: uber-black-60;
}
</style>
