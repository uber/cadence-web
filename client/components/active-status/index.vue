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
import { getFormattedClusterList } from './helpers';
import {
  getClusterFromClusterList,
  getClusterListFromDomainConfig,
} from '~helpers';
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
      allowedCrossOrigin: undefined,
      clusterList: undefined,
      path: this.$route.fullPath,
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
      const {
        allowedCrossOrigin,
        clusterName,
        computedClusterList: clusterList,
      } = this;
      const { origin } = window.location;

      return getClusterFromClusterList({
        allowedCrossOrigin,
        clusterList,
        clusterName,
        origin,
      });
    },
    computedClusterList() {
      const {
        allowedCrossOrigin,
        clusterName,
        clusterList,
        domain,
        path,
      } = this;
      const { origin } = window.location;

      return getFormattedClusterList({
        allowedCrossOrigin,
        clusterName,
        clusterList,
        domain,
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
    computedTag() {
      // TODO - perhaps move to helper?
      const { computedClusterList } = this;

      switch (computedClusterList.length) {
        case 0:
        case 1:
          return 'span';
        // case >= 2
        default:
          return 'select-input';
      }
    },
  },
  methods: {
    async init(context) {
      const { clusterName, domain } = context;
      const config = await httpService.get(`/api/domains/${domain}`);
      const allowedCrossOrigin = await featureFlagService.isFeatureFlagEnabled({
        cache: true,
        name: 'crossRegion,crossRegion.allowedCrossOrigin',
      });

      const clusterOriginList =
        (allowedCrossOrigin &&
          (await featureFlagService.getConfiguration({
            cache: true,
            name: 'crossRegion.clusterOriginList',
          }))) ||
        [];

      const clusterList = await getClusterListFromDomainConfig({
        allowedCrossOrigin,
        clusterName,
        clusterOriginList,
        config,
      });

      this.allowedCrossOrigin = allowedCrossOrigin;
      this.clusterList = clusterList;
    },
    onClusterChange(cluster) {
      window.location = cluster.href;
    },
  },
  watch: {
    $route({ fullPath }) {
      this.path = fullPath;
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
