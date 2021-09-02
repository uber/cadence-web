<script>
// Copyright (c) 2021 Uber Technologies Inc.
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

import {
  getActiveStatusFromDomainUrls,
  getDomainUrlsFromClusters,
  getHrefFromDomainUrls,
  getHrefFromLocation,
} from './helpers';
import { getClustersFromDomainConfig } from '~helpers';
import { featureFlagService, httpService } from '~services';

export default {
  name: 'active-status',
  props: {
    activeStatus: {
      type: String,
      validator: value => ['active', 'passive'].includes(value),
    },
    domain: {
      type: String,
    },
  },
  data() {
    return {
      computedActiveStatus: undefined,
      href: undefined,
    };
  },
  computed: {
    tag() {
      return this.href ? 'a' : 'span';
    },
  },
  async mounted() {
    const { activeStatus, domain } = this;

    const config = await httpService.get(`/api/domains/${domain}`);

    const { activeCluster, passiveCluster } = getClustersFromDomainConfig(
      config
    );

    if (activeStatus) {
      this.initWithActiveStatus({ activeCluster, passiveCluster });
    } else {
      this.initWithoutActiveStatus({ activeCluster, passiveCluster });
    }
  },
  methods: {
    initWithActiveStatus({ activeCluster, passiveCluster }) {
      const { activeStatus } = this;
      const { location } = window;

      this.href = getHrefFromLocation({
        activeStatus,
        location,
        passiveCluster,
      });

      this.computedActiveStatus = activeStatus;
    },
    async initWithoutActiveStatus({ activeCluster, passiveCluster }) {
      const { activeUrl, passiveUrl } = await getDomainUrlsFromClusters({
        activeCluster,
        featureFlagService,
        passiveCluster,
      });

      const activeStatus = await getActiveStatusFromDomainUrls({
        activeUrl,
        location,
      });

      this.href = getHrefFromDomainUrls({
        activeStatus,
        activeUrl,
        location,
        passiveUrl,
      });

      this.computedActiveStatus = activeStatus;
    },
  },
};
</script>

<template>
  <component
    class="active-status"
    :class="{
      [computedActiveStatus]: computedActiveStatus,
    }"
    :href="href"
    :is="tag"
    v-if="computedActiveStatus"
  >
    {{ computedActiveStatus }}
  </component>
</template>

<style lang="stylus">
@require "../../styles/definitions"

.active-status {
  color: white !important;
  padding: 5px 10px;
  text-transform: uppercase;

  &.active {
    background-color: uber-green;
  }

  &.passive {
    background-color: uber-blue;
  }
}
</style>
