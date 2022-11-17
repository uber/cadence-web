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

import ButtonIcon from './button-icon';

export default {
  name: 'highlight-toggle',
  props: {
    isHighlighted: {
      type: Boolean,
      default: false,
    },
    isEnabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
  components: {
    'button-icon': ButtonIcon,
  },
  methods: {
    onClick(...args) {
      if (this.isEnabled) {
        this.$emit('click', ...args);
      }
    },
  },
};
</script>

<template>
  <component class="highlight-toggle" :is="tag">
    <span class="label" :class="{ highlight: isHighlighted }">
      {{ label }}
    </span>
    <button-icon
      :class="{
        active: isHighlighted,
        disabled: !isEnabled,
      }"
      icon="icon_search"
      @click="onClick"
    />
  </component>
</template>

<style lang="stylus">
.highlight-toggle {
  line-height: 18px;

  &:hover {
    .button-icon {
      display: inline-block;
    }
  }

  .button-icon {
    display: none;
    min-width: 24px;
    padding: 0;

    &.active {
      display: inline-block;
    }

    &.disabled {
      display: none !important;
    }
  }

  .label.highlight {
    font-weight: bold;
  }
}
</style>
