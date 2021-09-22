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
import { getFilteredClusterList, getHrefFromCluster } from './helpers';
import {
  getClusterFromClusterList,
  getClusterListFromDomainConfigList,
} from '~helpers';
import { featureFlagService, httpService } from '~services';

// TODO - move to container instead of global component.
export default {
  name: 'active-status',
  props: {
    clusterName: {
      type: String,
    },
    domain: {
      type: String,
    },
    workflowId: {
      type: String,
    },
  },
  components: {
    'select-input': SelectInput,
  },
  data() {
    return {
      allowedCrossOrigin: undefined,
      cluster: undefined,
      clusterList: undefined,
      clusterOriginList: undefined,
      isGlobalDomain: undefined,
    };
  },
  mounted() {
    this.init(this);
  },
  computed: {
    computedClass() {
      const { cluster } = this;

      return cluster && cluster.isActive ? 'active' : 'passive';
    },
    computedLabel() {
      const { cluster } = this;

      return cluster && cluster.label;
    },
    computedTag() {
      const { clusterList, isGlobalDomain, workflowId } = this;

      return (clusterList && clusterList.length === 0) ||
        (!isGlobalDomain && workflowId)
        ? 'span'
        : 'select-input';
    },
    watchProps() {
      const { clusterName, domain } = this;

      return { clusterName, domain };
    },
  },
  methods: {
    clearState() {
      this.clusterList = undefined;
      this.cluster = undefined;
      this.isGlobalDomain = undefined;
    },
    async init(context) {
      const { origin } = window.location;

      this.allowedCrossOrigin = await featureFlagService.isFeatureFlagEnabled({
        cache: true,
        name: 'crossRegion.allowedCrossOrigin',
        params: { origin },
      });

      this.clusterOriginList =
        (await featureFlagService.getConfiguration({
          cache: true,
          name: 'crossRegion.clusterOriginList',
        })) || [];

      this.initDomainClusterConfig(context);
    },
    // TODO - code is kind of duplicated in httpService
    async getDomainConfigList({ clusterOriginList, domain }) {
      const fetchList = clusterOriginList.map(({ origin }) => async () => {
        try {
          const domainConfig = await httpService.get(
            `${origin}/api/domains/${domain}`
          );

          return domainConfig;
        } catch (error) {
          console.warn(
            `Unable to resolve domain configuration for domain = "${domain}" and origin = "${origin}".`
          );
        }
      });

      return (await Promise.all(fetchList.map(callback => callback()))).filter(
        response => !!response
      );
    },
    async initDomainClusterConfig(context) {
      const { allowedCrossOrigin, clusterName, clusterOriginList } = context;
      const { origin } = window.location;

      const domainConfigList = await context.getDomainConfigList(context);

      const clusterList = getClusterListFromDomainConfigList({
        clusterOriginList,
        domainConfigList,
      });

      const cluster = getClusterFromClusterList({
        allowedCrossOrigin,
        clusterList,
        clusterName,
        origin,
      });

      const filteredClusterList = getFilteredClusterList({
        allowedCrossOrigin,
        clusterName,
        clusterList,
        origin,
      });

      this.isGlobalDomain = domainConfigList[0].isGlobalDomain;
      this.clusterList = filteredClusterList;
      this.cluster = cluster;
    },
    onClusterChange(cluster) {
      const {
        allowedCrossOrigin,
        clusterName,
        domain,
        isGlobalDomain,
        $route: { fullPath: path },
      } = this;

      // TODO - If origin doesn't change, then we should use vue router instead for navigation.
      window.location = getHrefFromCluster({
        allowedCrossOrigin,
        cluster,
        clusterName,
        domain,
        isGlobalDomain,
        origin,
        path,
      });
    },
  },
  watch: {
    watchProps(props) {
      this.clearState();
      this.initDomainClusterConfig(this);
    },
  },
};
</script>

<template>
  <component
    class="active-status"
    :class="{
      [computedClass]: computedClass,
    }"
    :is="computedTag"
    name="activeStatus"
    :options="clusterList"
    :value="cluster"
    v-if="cluster"
    @change="onClusterChange"
  >
    {{ computedLabel }}
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
    padding: 0;

    .v-select {
      .vs__dropdown-toggle {
        border: none;
        padding: 0;
      }

      span.vs__selected {
        color: white;
        margin: 0;
        padding: 0;
      }
    }

    .vs__actions {
      height: 24px;
      padding-top: 3px;
    }

    .vs__dropdown-option {
      padding: 0 10px;
    }

    .vs__open-indicator {
      fill: white;
      height: 10px;
    }

    .vs__selected-options {
      padding: 0 4px 0 8px;
    }
  }
}
</style>
