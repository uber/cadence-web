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
      :options="options"
      :searchable="false"
      :style="{ maxWidth }"
      :value="value"
      @input="onSelectChange"
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

  .v-select {
    color: text-color;
    font-family: inherit;
    width: 100%;

    &.disabled .vs__dropdown-toggle input {
      background-color: transparent;
    }

    input {
      left: 0;
      position: absolute !important;
    }

    .vs__dropdown-toggle {
      background-color: transparent;
      border-radius: 0;
      border: input-border;
      padding: 4px;
      position: relative;
      white-space: nowrap;
    }

    span.vs__selected {
      height: 28px;
      position: relative !important;
      one-liner-ellipsis();
    }

    .vs__dropdown-toggle button.vs__clear {
      display: none;
    }

    ul.vs__dropdown-menu {
      max-height: initial !important;
      overflow-x: hidden;
      overflow-y: auto;
      border: input-border;
      box-shadow: none;
      padding: 0;

      li {
        line-height: 2.5em;
        transition: none;

        &:nth-child(2n) {
          background: none;
        }

        &.vs__dropdown-option--highlight {
          background-color: uber-blue;
        }

        .vs__active {
          color: #333;
          background: rgba(50, 50, 50, .1);
        }
      }
    }
  }
}
</style>
