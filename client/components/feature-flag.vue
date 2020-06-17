<template>
  <div
    class="feature-flag"
    :class="{ [display]: display }"
    v-if="isFeatureFlagEnabled"
  >
    <slot></slot>
  </div>
</template>

<script>
import { isFeatureFlagEnabled } from '~helpers';

export default {
  name: 'feature-flag',
  props: {
    display: {
      type: String,
      validator: value => ['inline', 'inline-block'].includes(value),
    },
    name: {
      required: true,
      type: String,
    },
  },
  computed: {
    isFeatureFlagEnabled() {
      const { name } = this;

      return isFeatureFlagEnabled(name);
    },
  },
};
</script>
<style lang="stylus">
.feature-flag {
  &.inline {
    display: inline;
  }
  &.inline-block {
    display: inline-block;
  }
}
</style>
