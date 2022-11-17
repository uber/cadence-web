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

import { getKeyValuePairs, mapDomainDescription } from '~helpers';
import { DetailList } from '~components';
import { httpService } from '~services';

export default {
  data() {
    return {
      error: undefined,
      loading: true,
      domainConfig: undefined,
    };
  },
  props: ['clusterName', 'domain'],
  components: {
    'detail-list': DetailList,
  },
  created() {
    const { clusterName } = this;

    httpService
      .get(`/api/domains/${this.domain}`)
      .then(
        r => {
          const domainConfig = mapDomainDescription(r);
          const kvps = getKeyValuePairs({ clusterName, item: domainConfig });

          this.domainConfig = { ...domainConfig, kvps };
        },
        res => {
          this.error = `${res.statusText || res.message} ${res.status}`;
        }
      )
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {},
};
</script>

<template>
  <section class="domain-settings domain-description" :class="{ loading }">
    <header>
      <h3>{{ domain }}</h3>
    </header>
    <detail-list
      v-if="domainConfig"
      :item="domainConfig"
      :title="`Domain ${domain} Configuration`"
    />
    <span class="error" v-if="error">{{ error }}</span>
  </section>
</template>

<style lang="stylus">
@require "../../styles/definitions.styl"

section.domain-settings.domain-description {
  flex: 1 1 60%;
  padding: layout-spacing-small;

  &.pending dl.details {
    opacity: 0.2;
  }

  span.domain-name {
    display: inline-block;
    font-size: 18px;
    padding: inline-spacing-small;
    font-family: monospace-font-family;
  }

  dl.details {
    & > div {
      display: block;
      padding: inline-spacing-small;
    }

    dt, dd {
      line-height: 1.5em;
    }

    dt {
      text-transform: uppercase;
      font-family: primary-font-family;
      font-weight: 200;
    }
  }
}
</style>
