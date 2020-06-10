<template>
  <component
    class="button-icon"
    :href="href"
    :is="tag"
    :to="to"
    @click="onClick"
  >
    <span
      class="icon"
      :class="{ [icon]: icon, [color]: color }"
      :style="{ 'font-size': size }"
    />
    <span class="label" :class="{ [color]: color }">{{ label }}</span>
  </component>
</template>

<script>
export default {
  name: 'button-icon',
  props: {
    color: {
      type: String,
      validator: value => ['primary', 'secondary'].includes(value),
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
  },
  methods: {
    onClick(...args) {
      this.$emit('click', ...args);
    },
  },
};
</script>

<style lang="stylus">
.button-icon {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: inline-block;
  font-weight: 500;
  min-width: 44px;
  padding: 10px;
  transition: all 400ms ease;
  white-space: nowrap;

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
