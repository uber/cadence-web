<template>
  <component
    class="button-icon"
    :href="href"
    :is="tag"
    :to="to"
    @click="onClick"
  >
    <span class="icon" :class="icon" :style="{ 'font-size': size }" />
    {{ label }}
  </component>
</template>

<script>
export default {
  name: 'button-icon',
  props: {
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
  font-weight: 600;
  line-height: 41px;
  min-width: 44px;
  transition: all 400ms ease;
  white-space: nowrap;

  .icon {
    vertical-align: middle;
  }
}
</style>
