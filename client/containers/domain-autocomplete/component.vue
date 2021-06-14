<script>
// Copyright (c) 2017-2021 Uber Technologies Inc.
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

import { Autocomplete, FlexGrid, FlexGridItem } from '~components';

export default {
  name: 'domain-autocomplete',
  components: {
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
    autocomplete: Autocomplete,
  },
  computed: {
    // TODO - convert to getter...
    domainUrl() {
      return `/domains${this.value && '/' + this.value}`;
    },
  },
  data() {
    return {
      value: undefined,
    };
  },
  props: {
    isLoading: {
      type: Boolean,
    },
    // maxWidth: {
    //   type: String,
    // },
    results: {
      type: Array,
      default: () => [],
    },
    search: {
      type: String,
    },
    // value: {
    //   type: String,
    // },
  },
  methods: {
    // TODO - convert to action...
    onAutocompleteChange(option) {
      console.log('option selected = ', option);

      if (!option) {
        return (this.value = undefined);
      }

      if (typeof option === 'string') {
        return (this.value = option);
      }

      this.value = option.value;

      // this.$emit('change', ...args);
    },
    // TODO - convert to action...
    onAutocompleteSearch(search, loading) {
      // TODO
      console.log('search = ', search);
      // this.search = search;

      // if (!search) {
      //   this.options = [];

      //   return;
      // }

      // // need to consider debounce logic here...
      // this.isLoading = true;

      // setTimeout(() => {
      //   this.options = formatDomainList(DATA);
      //   this.isLoading = false;
      // }, 2000);
    },
  },
};
</script>

<template>
  <div class="domain-select" :style="{ maxWidth }">
    <flex-grid align-items="center">
      <flex-grid-item grow="1" margin="10px">
        <autocomplete
          empty-hint="Start typing to search for a domain."
          :is-loading="isLoading"
          :options="results"
          placeholder="cadence-canary"
          :search="search"
          :value="value"
          @change="onAutocompleteChange"
          @search="onAutocompleteSearch"
        />
      </flex-grid-item>
      <flex-grid-item width="32px">
        <span class="navigate-to-domain disabled" v-if="!value" />
        <a class="navigate-to-domain" :href="domainUrl" v-if="value" />
      </flex-grid-item>
    </flex-grid>
  </div>
</template>

<style lang="stylus">
@require "../../styles/definitions"
@require "../../styles/base.styl"

.domain-select {
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
