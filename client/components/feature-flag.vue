<script>
// Copyright (c) 2017-2020 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

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
    },
  },
  data() {
    return {
      isFeatureFlagEnabled: false,
    };
  },
  async mounted() {
    const { name, params } = this;
    const featureFlagService = new FeatureFlagService();

    this.isFeatureFlagEnabled = await featureFlagService.isFeatureFlagEnabled({
      name,
      params,
    });
  },
};
</script>

<template>
  <div
    class="feature-flag"
    :class="{ [display]: display }"
    v-if="isFeatureFlagEnabled"
  >
    <slot></slot>
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
