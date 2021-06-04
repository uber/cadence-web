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

export default {
  components: {
    'v-select': VueSelect,
  },
  name: 'select-input',
  props: {
    backgroundColor: {
      type: String,
      default: 'white',
    },
    disabled: {
      type: Boolean,
    },
    label: {
      type: String,
    },
    maxWidth: {
      type: String,
    },
    name: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [Boolean, Number, Object, String],
    },
  },
  methods: {
    onSelectChange(...args) {
      this.$emit('change', ...args);
    },
  },
};
</script>

<template>
  <div class="select-input field" :style="{ maxWidth }">
    <v-select
      :disabled="disabled"
      :inputId="name"
      :on-change="onSelectChange"
      :options="options"
      :searchable="false"
      :style="{ maxWidth }"
      :value="value"
    />
    <label :for="name" :style="{ backgroundColor }">{{ label }}</label>
  </div>
</template>

<style lang="stylus">
@require "../styles/definitions"
@require "../styles/base.styl"

.select-input {
  label {
    top: -4px !important;
    left: 6px !important;
    color: black !important;
    transform: scale(0.8);
  }

  .dropdown {
    width: 100%;
  }

  .v-select {
    color: text-color;
    font-family: inherit;

    &.disabled .dropdown-toggle input {
      background-color: transparent;
    }

    input {
      left: 0;
      position: absolute !important;
    }

    .dropdown-toggle {
      border-radius: 0;
      border: input-border;
      padding: 4px;
      position: relative;
      white-space: nowrap;
    }

    .open-indicator {
      height 24px
    }

    span.selected-tag {
      height: 28px;
      margin-right: 25px;
      position: relative !important;
      one-liner-ellipsis();
    }

    .dropdown-toggle button.clear {
      display: none;
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

        &:nth-child(2n) {
          background: none;
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
