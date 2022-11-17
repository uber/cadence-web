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

import { ButtonFill, FlexGrid, FlexGridItem } from '~components';

export default {
  name: 'settings-list',
  props: {
    activeViewName: {
      type: String,
    },
    viewList: {
      type: Array,
    },
  },
  methods: {
    onClick(view) {
      if (view.name !== this.activeViewName) {
        this.$emit('change', { view });
      }
    },
  },
  components: {
    'button-fill': ButtonFill,
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
  },
};
</script>

<template>
  <flex-grid class="settings-list" flex-direction="column">
    <flex-grid-item v-for="view in viewList" :key="view.name" margin="0">
      <button-fill
        class="settings-list-item"
        :color="view.name === activeViewName ? 'primary' : 'tertiary'"
        :label="view.displayName"
        @click="() => onClick(view)"
      />
    </flex-grid-item>
  </flex-grid>
</template>

<style lang="stylus">
.settings-list {
  background-color: #fafafa;
  height: 100%;

  .settings-list-item {
    padding: 10px 40px 10px 15px;;
    text-align: left;
    width: 100%;
  }
}
</style>
