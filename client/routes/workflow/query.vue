<script>
// Copyright (c) 2017-2020 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

export default {
  data() {
    return {
      error: undefined,
      loading: false,
      queryName: undefined,
      queryInput: undefined,
      queries: undefined,
      queryResult: undefined,
      running: false,
    };
  },
  props: ['baseAPIURL'],
  created() {
    this.loading = true;
    this.$http(`${this.baseAPIURL}/query`)
      .then(
        queries => {
          this.queries = queries.filter(query => query !== '__stack_trace');

          if (!this.queryName) {
            [this.queryName] = this.queries;
          }
        },
        e => {
          this.error = (e.json && e.json.message) || e.status || e.message;
        }
      )
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    setQuery(queryName) {
      this.queryResult = undefined;
      this.error = undefined;
      this.queryName = queryName;
    },
    run() {
      this.running = true;
      this.$http
        .post(`${this.baseAPIURL}/query/${this.queryName}`)
        .then(
          r => {
            this.queryResult = r.queryResult;
          },
          e => {
            this.error = (e.json && e.json.message) || e.status || e.message;
          }
        )
        .finally(() => {
          this.running = false;
        });
    },
  },
};
</script>

<template>
  <section class="query" :class="{ loading }">
    <header v-if="queries && queries.length">
      <div class="query-name">
        <v-select
          placeholder="Choose a Query"
          :value="queryName"
          :options="queries"
          :on-change="setQuery"
          :searchable="false"
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
    <pre v-if="queryResult">{{ queryResult }}</pre>
    <span class="error" v-if="error">{{ error }}</span>
    <span class="no-queries" v-if="queries && queries.length === 0">
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

      &::before {
        top: -16px;
        content: 'query';
      }
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
    font-size: 16px;
    color: uber-black-60;
  }
}
</style>
