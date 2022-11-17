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

const COLOR_TYPE_DEFAULT = 'primary';
const COLOR_TYPES = ['primary', 'secondary', 'tertiary'];
const SIZE_TYPE_DEFAULT = 'medium';
const SIZE_TYPES = ['small', 'medium', 'large'];
const TAG_TYPE_DEFAULT = 'button';
const TAG_LINK_TYPES = ['a', 'router-link'];

export default {
  name: 'button-fill',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: COLOR_TYPE_DEFAULT,
      validator: value => COLOR_TYPES.includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    disabledLabel: {
      type: String,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    href: {
      type: String,
    },
    label: {
      type: String,
    },
    size: {
      type: String,
      default: SIZE_TYPE_DEFAULT,
      validator: value => SIZE_TYPES.includes(value),
    },
    tag: {
      type: String,
      default: TAG_TYPE_DEFAULT,
    },
    to: {
      type: [String, Object],
    },
    uppercase: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedTag() {
      const { isDisabled, tag } = this;

      if (isDisabled && TAG_LINK_TYPES.includes(tag)) {
        return 'button';
      }

      return tag;
    },
    disabledLabelText() {
      const { isDisabled, disabledLabel } = this;

      return isDisabled ? disabledLabel : '';
    },
    isDisabled() {
      const { disabled, enabled } = this;

      return disabled || !enabled;
    },
  },
  methods: {
    onClick(...args) {
      const { isDisabled } = this;

      if (!isDisabled) {
        this.$emit('click', ...args);
      }
    },
  },
};
</script>

<template>
  <component
    :aria-disabled="isDisabled"
    class="button-fill"
    :class="{
      active,
      [color]: color,
      disabled: isDisabled,
      [size]: size,
      uppercase,
    }"
    :disabled="isDisabled"
    :href="href"
    :is="computedTag"
    :to="to"
    :title="disabledLabelText"
    @click="onClick"
  >
    {{ label }}
  </component>
</template>

<style lang="stylus">
.button-fill {
  border: none;
  color: #fff !important;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  transition: all 400ms ease;
  white-space: nowrap;

  &:focus {
    outline: none;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // color
  &.primary {
    background-color: #11939a;

    &.active {
      background-color: #0e767b;
    }

    &:focus, &:hover {
      background-color: #10858b;
    }

    &:active {
      background-color: #0e767b;
    }
  }

  &.secondary {
    background-color: #ca3b27;

    &.active {
      background-color: #a22f1f;
    }

    &:focus, &:hover {
      background-color: #b63523;
    }

    &:active {
      background-color: #a22f1f;
    }
  }

  &.tertiary {
    background-color: transparent;
    color: #11939a !important;

    &.active {
      color: #0e767b  !important;
    }

    &:focus, &:hover {
      color: #10858b !important;
    }

    &:active {
      color: #0e767b  !important;
    }
  }

  // size
  &.small {
    font-size: 12px;
    padding: 6px 10px;
  }

  &.medium {
    font-size: 14px;
    padding: 13px 21px;
  }

  &.large {
    font-size: 26px;
    padding: 26px 42px;
  }

  // uppercase
  &.uppercase {
    text-transform: uppercase;
  }
}
</style>
