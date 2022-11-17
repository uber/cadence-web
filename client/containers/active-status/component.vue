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

import { FeatureFlag, SelectInput } from '~components';

export default {
  name: 'active-status',
  props: {
    classname: {
      type: String,
    },
    crossRegion: {
      type: Boolean,
    },
    cluster: {
      type: Object,
    },
    isReady: {
      type: Boolean,
    },
    label: {
      type: String,
    },
    selectList: {
      type: Array,
    },
    tag: {
      type: String,
    },
  },
  components: {
    'feature-flag': FeatureFlag,
    'select-input': SelectInput,
  },
  methods: {
    onClusterChange(cluster) {
      this.$emit('change', cluster);
    },
  },
};
</script>

<template>
  <feature-flag name="crossRegion.activeStatusTag" v-if="crossRegion">
    <component
      class="active-status"
      :class="{
        [classname]: classname,
      }"
      :is="tag"
      name="activeStatus"
      :options="selectList"
      :value="cluster"
      v-if="isReady && cluster"
      @change="onClusterChange"
    >
      {{ label }}
    </component>
  </feature-flag>
</template>

<style lang="stylus">
@require "../../styles/definitions"

span.active-status {
  color: white;
}

.active-status {
  color: #000;
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
