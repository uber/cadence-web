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
      console.log('featureFlags = ', featureFlags);
      return mapFlagsToHash(featureFlags);
    },
    isEnabled() {
      const { name, flagHash } = this;
      console.log('flag name = ', name);
      console.log('flagHash = ', flagHash);
      console.log('isEnabled = ', isEnabled({ flagHash, name }));
      return isEnabled({ flagHash, name });
    },
  },
};
</script>