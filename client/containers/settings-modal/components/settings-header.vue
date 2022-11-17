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

import { ButtonIcon, FlexGrid, FlexGridItem } from '~components';

export default {
  name: 'settings-header',
  props: {
    title: {
      type: String,
    },
    titleSuffix: {
      type: String,
    },
  },
  computed: {
    displayTitle() {
      const { title, titleSuffix } = this;

      return [title, titleSuffix].join(' ');
    },
  },
  methods: {
    onCloseClick() {
      this.$emit('close');
    },
  },
  components: {
    'button-icon': ButtonIcon,
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
  },
};
</script>

<template>
  <flex-grid align-items="center" class="settings-header">
    <flex-grid-item grow="1">
      <h2>{{ displayTitle }}</h2>
    </flex-grid-item>
    <flex-grid-item width="40px">
      <button-icon icon="icon_delete-thin" size="30px" @click="onCloseClick" />
    </flex-grid-item>
  </flex-grid>
</template>

<style lang="stylus">
.settings-header {
  margin-bottom: 15px;
}
</style>
