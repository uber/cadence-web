<template>
  <component
    class="highlight-toggle"
    :is="tag"
  >
    <span
      class="label"
      :class="{ highlight: isHighlighted }"
    >
      {{label}}
    </span>
    <button-icon
      :class="{
        active: isHighlighted,
        disabled: !isToggleEnabled,
      }"
      icon="icon_search"
      @click="onClick"
    />
  </component>
</template>

<script>
import ButtonIcon from './button-icon';

export default {
  name: 'highlight-toggle',
  props: {
    isHighlighted: {
      type: Boolean,
      default: false,
    },
    isToggleEnabled: {
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
      console.log('highlight-toggle onClick method called??');
      if (this.isToggleEnabled) {
        this.$emit('click', ...args);
      }
    },
  }
};
</script>

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
