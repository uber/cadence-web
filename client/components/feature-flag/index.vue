<template>
  <div class="feature-flag" v-if="isEnabled">
    <slot></slot>
  </div>
</template>

<script>
import featureFlags from '../../feature-flags.json';
import { isEnabled, mapFlagsToHash } from './helpers';

export default {
  name: 'feature-flag',
  props: ['name'],
  computed: {
    flagHash() {
      return mapFlagsToHash(featureFlags);
    },
    isEnabled() {
      const { name, flagHash } = this;
      return isEnabled({ flagHash, name });
    },
  },
};
</script>
