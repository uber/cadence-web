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
import { FeatureFlagService } from '~services';

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
    params: {
      type: Object,
    }
  },
  data() {
    return {
      isFeatureFlagEnabled: false,
    }
  },
  async mounted() {
    const { name, params } = this;
    const featureFlagService = new FeatureFlagService();
    this.isFeatureFlagEnabled = await featureFlagService.isFeatureFlagEnabled({ name, params });
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
