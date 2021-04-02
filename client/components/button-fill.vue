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
      default: 'primary',
      validator: value => ['primary', 'secondary', 'tertiary'].includes(value),
    },
    disabled: {
      type: Boolean,
    },
    disabledLabel: {
      type: String,
    },
    href: {
      type: String,
    },
    label: {
      type: String,
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value),
    },
    tag: {
      type: String,
      default: 'button',
    },
    to: {
      type: [String, Object],
    },
    uppercase: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    calculatedTag() {
      const { disabled, tag } = this;

      if (disabled && TAG_LINK_TYPES.includes(tag)) {
        return 'button';
      }

      return tag;
    },
    disabledLabelText() {
      return this.disabled ? this.disabledLabel : '';
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
    class="button-fill"
    :class="{
      active: active,
      [color]: color,
      disabled: disabled,
      [size]: size,
      uppercase: uppercase,
    }"
    :disabled="disabled"
    :href="href"
    :is="calculatedTag"
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
