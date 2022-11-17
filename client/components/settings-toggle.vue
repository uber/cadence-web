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

import { ToggleButton } from 'vue-js-toggle-button';
import FlexGrid from './flex-grid';
import FlexGridItem from './flex-grid-item';

export default {
  name: 'settings-toggle',
  props: {
    label: {
      type: String,
    },
    name: {
      type: String,
    },
    value: {
      type: Boolean,
    },
  },
  methods: {
    onChange(event) {
      const { name } = this;

      this.$emit('change', { ...event, name });
    },
  },
  components: {
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
    'toggle-button': ToggleButton,
  },
};
</script>

<template>
  <flex-grid class="settings-toggle" align-items="center">
    <flex-grid-item grow="1">
      <label :for="name">
        {{ label }}
      </label>
    </flex-grid-item>
    <flex-grid-item>
      <toggle-button
        :labels="true"
        :name="name"
        :value="value"
        @change="onChange"
      />
    </flex-grid-item>
  </flex-grid>
</template>

<style lang="stylus">
.settings-toggle {
  height: 22px;
}
</style>
