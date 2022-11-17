<script>
// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { featureFlagService } from '~services';

export default {
  name: 'feature-flag',
  props: {
    allowDisabled: {
      type: Boolean,
      default: false,
    },
    display: {
      type: String,
      validator: value => ['inline', 'inline-block'].includes(value),
    },
    grow: {
      type: [String, Number],
    },
    margin: {
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    params: {
      type: Object,
    },
    width: {
      type: String,
    },
  },
  data() {
    return {
      isFeatureFlagEnabled: false,
      isLoading: true,
    };
  },
  async mounted() {
    const { name, params } = this;

    this.isFeatureFlagEnabled = await featureFlagService.isFeatureFlagEnabled({
      name,
      params,
    });
    this.isLoading = false;
  },
};
</script>

<template>
  <div
    class="feature-flag"
    :class="{
      [display]: display,
      enabled: isFeatureFlagEnabled,
      disabled: !isFeatureFlagEnabled,
    }"
    :style="{ flexGrow: grow, marginRight: margin, maxWidth: width }"
    v-if="!isLoading && (isFeatureFlagEnabled || allowDisabled)"
  >
    <slot v-if="isFeatureFlagEnabled"></slot>
    <slot name="enabled" v-if="isFeatureFlagEnabled"></slot>
    <slot name="disabled" v-if="!isFeatureFlagEnabled"></slot>
  </div>
</template>

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
