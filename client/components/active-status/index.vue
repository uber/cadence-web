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
  getClusterFromClusterList,
  getDomainUrlsFromClusters,
  getHrefFromDomainUrls,
  getHrefFromLocation,
} from './helpers';
import { getClusterListFromDomainConfig } from '~helpers';
import { featureFlagService, httpService } from '~services';

export default {
  name: 'active-status',
  props: {
    clusterName: {
      type: String,
    },
    domain: {
      type: String,
    },
  },
  data() {
    return {
      cluster: undefined,
      clusterList: [],
      path: this.$route.path,
    };
  },
  computed: {
    computedActiveStatus() {
      const { cluster } = this;

      return cluster.active ? 'active' : 'passive';
    },
    computedCluster() {
      const { clusterName, computedClusterList: clusterList } = this;
      const { location } = window;

      return getClusterFromClusterList({
        clusterName,
        clusterList,
        location,
      });
    },
    computedClusterList() {
      const { clusterName, clusterList, path } = this;

      // TODO - Finish off mapping href path to clusterList here...

      return clusterList.map(() => {});
    },
    computedClusterName() {
      const { cluster } = this;

      return cluster.clusterName;
    },
    computedDisplayText() {
      const { computedActiveStatus, computedClusterName } = this;

      return [computedActiveStatus, computedClusterName]
        .filter(item => !!item)
        .join(' - ');
    },
    computedHref() {
      const { cluster, clusterList } = this;

      if (clusterList !== 2 || !cluster) {
        return;
      }

      const { clusterName } = cluster;

      const altCluster = clusterList.find(
        ({ clusterName: matchClusterName }) => clusterName !== matchClusterName
      );

      return altCluster.origin;
    },
    computedTag() {
      const { clusterList, computedHref } = this;

      switch (clusterList.length) {
        case 0:
        case 1:
          return 'span';
        case 2:
          return (computedHref && 'a') || 'span';
        // case >= 3
        default:
          return 'select-input';
      }
    },
  },
  async mounted() {
    const { clusterName, domain } = this;
    const { location } = window;

    const config = await httpService.get(`/api/domains/${domain}`);

    const clusterOriginList =
      (await featureFlagService.getConfiguration({
        cache: true,
        name: 'crossRegion.clusterOriginList',
      })) || [];

    this.clusterList = await getClusterListFromDomainConfig({
      clusterOriginList,
      config,
    });

    if (clusterName) {
      const activeClusterOption = this.clusterList
        .filter(({ active }) => active)
        .map(cluster => ({
          ...cluster,
          displayName: 'active',
        }))[0];

      if (activeClusterOption) {
        this.clusterList.unshift(activeClusterOption);
      }
    }
  },
  watch: {
    $route({ path }) {
      this.path = path;
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
    :href="computedHref"
    :is="computedTag"
    v-if="cluster"
  >
    {{ computedDisplayText }}
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
