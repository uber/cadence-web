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

export default {
  components: {
    'v-select': VueSelect,
  },
  data() {
    return {
      options: formatDomainList(DATA),
      value: undefined,
    };
  },
  name: 'select-input',
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
    <v-select
      :on-change="onSelectChange"
      :options="options"
      :searchable="true"
      :style="{ maxWidth }"
      :value="value"
    />
  </div>
</template>

<style lang="stylus">
@require "../../styles/definitions"
@require "../../styles/base.styl"

.domain-select {
  .v-select {
    color: text-color;
    font-family: inherit;

    .dropdown-toggle .clear {
      bottom: 6px;
      right: 12px;
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

        // &:nth-child(2n) {
          // background: none;
        // }

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

  // .dropdown {
  //   width: 100%;
  // }

  // .v-select {

  //   input {
  //     left: 0;
  //     position: absolute !important;
  //   }

  //   .dropdown-toggle {
  //     border-radius: 0;
  //     border: input-border;
  //     padding: 4px;
  //     position: relative;
  //     white-space: nowrap;
  //   }

  //   .open-indicator {
  //     height 24px
  //   }

  //   span.selected-tag {
  //     height: 28px;
  //     margin-right: 25px;
  //     position: relative !important;
  //     one-liner-ellipsis();
  //   }

  //   .dropdown-toggle button.clear {
  //     display: none;
  //   }

}
</style>
