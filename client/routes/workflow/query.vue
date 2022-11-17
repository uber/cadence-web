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
import { SelectInput } from '~components';
import { httpService } from '~services';

export default {
  components: {
    'select-input': SelectInput,
  },
  data() {
    return {
      error: undefined,
      loading: false,
      queryName: undefined,
      queryInput: undefined,
      queries: [],
      queryResult: undefined,
      running: false,
    };
  },
  props: ['baseAPIURL', 'clusterName', 'taskListName', 'isWorkerRunning'],
  created() {
    if (!this.isWorkerRunning) {
      return;
    }

    this.fetchQueries();
  },
  methods: {
    setQuery(queryName) {
      this.queryResult = undefined;
      this.error = undefined;
      this.queryName = queryName;
    },
    run() {
      this.running = true;
      httpService
        .post(`${this.baseAPIURL}/query/${this.queryName}`)
        .then(
          ({ queryResult }) => {
            this.queryResult = getQueryResult(queryResult);
          },
          e => {
            this.error = (e.json && e.json.message) || e.status || e.message;
          }
        )
        .finally(() => {
          this.running = false;
        });
    },
    fetchQueries() {
      this.loading = true;

      return httpService
        .get(`${this.baseAPIURL}/query`)
        .then(
          queries => {
            this.queries = queries.filter(query => query !== '__stack_trace');

            if (!this.queryName) {
              [this.queryName] = this.queries;
            }
          },
          error => {
            this.error =
              (error.json && error.json.message) ||
              error.status ||
              error.message;
          }
        )
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

      this.fetchQueries();
    },
  },
};
</script>

<template>
  <section class="query" :class="{ loading }" data-cy="query">
    <header v-if="queries && queries.length">
      <div class="query-name">
        <select-input
          label="Query"
          :options="queries"
          :value="queryName"
          @change="setQuery"
        />
      </div>
      <a
        :href="queryName && !running ? '#' : undefined"
        :class="{ run: true, running }"
        @click.prevent="run"
      >
        Run
      </a>
    </header>
    <pre v-if="queryResult && queryResult.payloads !== undefined">{{
      queryResult.payloads
    }}</pre>
    <span class="error" v-if="error">{{ error }}</span>
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
    <span class="no-queries" v-else-if="queries && queries.length === 0">
      No queries registered
    </span>
  </section>
</template>

<style lang="stylus">
@require "../../styles/definitions.styl"

section.query {
  padding: layout-spacing-small;

  header {
    display: flex;
    padding-top: layout-spacing-small;
    margin-bottom: layout-spacing-medium;
    align-items: center;

    .query-name {
      flex: 0 0 auto;
      min-width: 350px;
      superlabel();
    }

    a.run {
      flex: 0 0 auto;
      margin: 0 1em;
      action-button();
      icon-play();

      &:not([href="#"]) {
        opacity: 0.7;
      }

      &.running {
        icon-refresh();
      }
    }
  }

  span.no-queries {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 20px;
    color: uber-black-60;
  }
}
</style>
