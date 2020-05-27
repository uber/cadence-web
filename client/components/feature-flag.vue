<template>
  <div class="feature-flag" v-if="isFeatureFlagEnabled">
    <slot></slot>
  </div>
</template>

<script>
import { isFeatureFlagEnabled } from '~helpers';

export default {
  name: 'feature-flag',
  props: ['name'],
  computed: {
    isFeatureFlagEnabled() {
      const { name } = this;

      return isFeatureFlagEnabled(name);
    },
  },
};
</script>
