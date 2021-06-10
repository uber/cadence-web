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

import VueSelect from 'vue-select';
import { DATA } from './constants';
import { formatDomainList } from './helpers';
import { FlexGrid, FlexGridItem } from '~components';

export default {
  name: 'select-input',
  components: {
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
    'v-select': VueSelect,
  },
  computed: {
    domainUrl() {
      return `/domains${this.value && '/' + this.value}`;
    },
  },
  data() {
    return {
      options: formatDomainList(DATA),
      value: undefined,
    };
  },
  props: {
    maxWidth: {
      type: String,
    },
    // options: {
    //   type: Array,
    //   default: () => [],
    // },
    // value: {
    //   type: String,
    // },
  },
  methods: {
    onSelectChange(option) {
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
  },
};
</script>

<template>
  <div class="domain-select" :style="{ maxWidth }">
    <flex-grid align-items="center">
      <flex-grid-item grow="1">
        <v-select
          :on-change="onSelectChange"
          :options="options"
          :searchable="true"
          :style="{ maxWidth }"
          :value="value"
        />
      </flex-grid-item>
      <flex-grid-item width="32px">
        <span class="change-domain disabled" v-if="!value" />
        <a class="change-domain" :href="domainUrl" v-if="value" />
      </flex-grid-item>
    </flex-grid>
  </div>
</template>

<style lang="stylus">
@require "../../styles/definitions"
@require "../../styles/base.styl"

.domain-select {

  .change-domain {
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

  .v-select {
    color: text-color;
    font-family: inherit;

    .dropdown-toggle {
      border: input-border;
      border-radius: 0;

      &.open {
        border-color: uber-blue;
      }

      .clear {
        bottom: 6px;
        right: 12px;
      }
    }

    .open-indicator {
      display: none !important;
    }

    ul.dropdown-menu {
      max-height: initial !important;
      overflow: auto;
      border: input-border;
      box-shadow: none;
      padding: 0;

      li {
        a {
          line-height: 2.5em;
          transition: none;
        }

        &.highlight > a {
          background-color: uber-blue;
        }

        .active > a {
          color: #333;
          background: rgba(50, 50, 50, .1);
        }
      }
    }
  }
}
</style>
