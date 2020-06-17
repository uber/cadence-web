<template>
  <component
    :aria-disabled="disabled"
    class="button-fill"
    :class="{
      disabled: disabled,
      [color]: color,
    }"
    :disabled="disabled"
    :href="href"
    :is="tag"
    :to="to"
    :title="disabledLabelText"
    @click="onClick"
  >
    {{ label }}
  </component>
</template>

<script>
export default {
  name: 'button-fill',
  props: {
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
    tag: {
      type: String,
      default: 'button',
    },
    to: {
      type: Object,
    },
  },
  computed: {
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

<style lang="stylus">
.button-fill {
  border: none;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  padding: 13px 21px;
  transition: all 400ms ease;
  color: #fff !important;
  white-space: nowrap;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.primary {
    background-color: #11939a;

    &:hover {
      background-color: #0e767b;
    }
  }

  &.secondary {
    background-color: #ca3b27;

    &:hover {
      background-color: #a22f1f;
    }
  }

  &.tertiary {
    background-color: transparent;
    color: #11939a !important;

    &:hover {
      color: #0e767b  !important;
    }
  }
}
</style>
