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

export default {
  name: 'button-icon',
  props: {
    color: {
      type: String,
      validator: value => ['primary', 'secondary'].includes(value),
    },
    disabled: {
      type: Boolean,
    },
    href: {
      type: String,
    },
    icon: {
      type: String,
    },
    label: {
      type: String,
    },
    size: {
      type: String,
      default: '14px',
    },
    tag: {
      type: String,
      default: 'button',
    },
    to: {
      type: Object,
    },
    width: {
      type: String,
      default: '44px',
    },
  },
  methods: {
    onClick(...args) {
      if (!this.disabled) {
        this.$emit('click', ...args);
      }
    },
  },
};
</script>

<template>
  <component
    :aria-disabled="disabled"
    class="button-icon"
    :class="{ disabled: disabled }"
    :disabled="disabled"
    :href="href"
    :is="tag"
    :style="{ 'min-width': width }"
    :to="to"
    @click="onClick"
  >
    <span
      class="icon"
      :class="{ [icon]: icon, [color]: color }"
      :style="{ 'font-size': size }"
    />
    <span class="label" :class="{ [color]: color }" v-if="label">{{
      label
    }}</span>
  </component>
</template>

<style lang="stylus">
.button-icon {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: inline-block;
  font-weight: 500;
  padding: 10px;
  transition: all 400ms ease;
  white-space: nowrap;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon {
    vertical-align: middle;
  }

  .label {
    margin-left: 5px;
  }

  .primary {
    color: #11939a;
  }

  .secondary {
    color: #ca3b27;
  }
}
</style>
