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

import { Autocomplete, FlexGrid, FlexGridItem } from '~components';

export default {
  name: 'domain-autocomplete',
  components: {
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
    autocomplete: Autocomplete,
  },
  data() {
    return {
      value: undefined,
    };
  },
  props: {
    domain: {
      type: String,
    },
    domainList: {
      type: Array,
      default: () => [],
    },
    focus: {
      type: Boolean,
    },
    height: {
      type: String,
    },
    isLoading: {
      type: Boolean,
    },
    navigateToDomainUrl: {
      type: String,
    },
    search: {
      type: String,
    },
    width: {
      type: String,
    },
  },
  methods: {
    onAutocompleteChange(option) {
      this.$emit('onChange', option);
    },
    onAutocompleteSearch(search) {
      this.$emit('onSearch', search);
    },
  },
};
</script>

<template>
  <div class="domain-autocomplete" :style="{ width }">
    <flex-grid align-items="center">
      <flex-grid-item grow="1" margin="10px">
        <autocomplete
          empty-hint="Start typing to search for a domain."
          :focus="focus"
          :height="height"
          :is-loading="isLoading"
          :options="domainList"
          :placeholder="`${domain ? domain : 'cadence-canary'}`"
          :search="search"
          @change="onAutocompleteChange"
          @search="onAutocompleteSearch"
        />
      </flex-grid-item>
      <flex-grid-item width="32px">
        <span class="navigate-to-domain disabled" v-if="!navigateToDomainUrl" />
        <a
          class="navigate-to-domain"
          :href="navigateToDomainUrl"
          v-if="navigateToDomainUrl"
        />
      </flex-grid-item>
    </flex-grid>
  </div>
</template>

<style lang="stylus">
@require "../../styles/definitions"
@require "../../styles/base.styl"

.domain-autocomplete {
  color: #000;
  width: 100%;

  .navigate-to-domain {
    icon('\ea87');

    &.disabled::before {
      opacity: 0.25;
    }

    &::before {
      background-color: primary-color;
      border-radius: 32px;
      color: white;
      display: inline-block;
      height: 32px;
      line-height: 32px;
      text-align: center;
      width: 32px;
    }
  }
}
</style>
