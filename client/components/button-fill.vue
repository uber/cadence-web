<template>
  <component
    class="button-fill"
    :href="href"
    :is="tag"
    :to="to"
    @click="onClick"
  >
    {{ label }}
  </component>
</template>

<script>
export default {
  name: 'button-fill',
  props: {
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
  methods: {
    onClick(...args) {
      this.$emit('click', ...args);
    },
  },
};
</script>

<style lang="stylus">
.button-fill {
  cursor: pointer;
  display: inline-block;
  padding: 13px 21px;
  transition: all 400ms ease;
  font-weight: 600;
  color: #fff !important;
  background-color: #11939a;
  white-space: nowrap;
}
</style>
