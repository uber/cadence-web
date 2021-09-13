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

import SelectInput from '../select-input';
import { getClusterFromClusterList, getFormattedClusterList } from './helpers';
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
  components: {
    'select-input': SelectInput,
  },
  data() {
    return {
      clusterList: undefined,
      path: this.$route.path,
    };
  },
  mounted() {
    this.init(this);
  },
  computed: {
    computedActiveStatus() {
      const { computedCluster } = this;

      return computedCluster.active ? 'active' : 'passive';
    },
    computedCluster() {
      const { clusterName, computedClusterList: clusterList } = this;
      const { origin } = window.location;

      return getClusterFromClusterList({
        clusterList,
        clusterName,
        origin,
      });
    },
    computedClusterList() {
      const { clusterName, clusterList, path } = this;
      const { origin } = window.location;

      return getFormattedClusterList({
        clusterName,
        clusterList,
        origin,
        path,
      });
    },
    computedClusterName() {
      const { computedCluster } = this;

      return computedCluster.clusterName;
    },
    computedDisplayText() {
      const { computedActiveStatus, computedClusterName } = this;

      return [computedActiveStatus, computedClusterName]
        .filter(item => !!item)
        .join(' - ');
    },
    computedHref() {
      // TODO - perhaps move to helper?
      const { computedClusterList, computedClusterName } = this;

      if (computedClusterList.length !== 2 || !computedClusterName) {
        return;
      }

      const altCluster = computedClusterList.find(
        ({ clusterName: matchClusterName }) =>
          computedClusterName !== matchClusterName
      );

      return altCluster.href;
    },
    computedTag() {
      // TODO - perhaps move to helper?
      const { computedClusterList, computedHref } = this;

      switch (computedClusterList.length) {
        case 0:
        case 1:
          return 'span';
        case 2:
          return computedHref ? 'a' : 'span';
        // case >= 3
        default:
          return 'select-input';
      }
    },
  },
  methods: {
    async init(context) {
      const { clusterName, domain } = context;

      const config = await httpService.get(`/api/domains/${domain}`);

      const clusterOriginList =
        (await featureFlagService.getConfiguration({
          cache: true,
          name: 'crossRegion.clusterOriginList',
        })) || [];

      const clusterList = await getClusterListFromDomainConfig({
        clusterName,
        clusterOriginList,
        config,
      });

      this.clusterList = clusterList;
    },
    onClusterChange(cluster) {
      window.location = cluster.href;
    },
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
    :label="computedDisplayText"
    name="activeStatus"
    :options="computedClusterList"
    :value="computedCluster"
    v-if="computedCluster"
    @change="onClusterChange"
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

  &.select-input {
    label {
      background-color: transparent !important;
      color: white !important;
      cursor: pointer;
      left: auto !important;
      padding: 0;
      pointer-events: initial;
      position: relative !important;
      top: auto !important;
      transform: none;
    }

    .v-select {
      left: -10px;
      top: 7px;
      width: 0 !important;

      .vs__dropdown-toggle {
        border: none;
        padding: 0;
      }
    }

    .vs__selected {
      display: none;
    }

    .vs__actions {
      display: none;
    }
  }
}
</style>
