<template>
  <div class="feature-flag" v-if="isFlagEnabled">
    <slot></slot>
  </div>
</template>

<script>
import featureFlags from '../../feature-flags.json';
import { isFlagEnabled, mapFlagsToHash } from './helpers';

export default {
  name: 'feature-flag',
  props: ['name'],
  computed: {
    flagHash() {
      return mapFlagsToHash(featureFlags);
    },
    isFlagEnabled() {
      const { flagHash, name } = this;

      return isFlagEnabled({ flagHash, name });
    },
  },
};
</script>
