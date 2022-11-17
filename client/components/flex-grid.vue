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

export default {
  props: {
    alignItems: {
      type: String,
    },
    flexDirection: {
      type: String,
      default: 'row',
    },
    justifyContent: {
      type: String,
    },
    width: {
      type: String,
    },
  },
};
</script>

<template>
  <div
    class="flex-grid"
    :style="{
      'align-items': alignItems,
      'flex-direction': flexDirection,
      'justify-content': justifyContent,
      width: width,
    }"
  >
    <slot></slot>
  </div>
</template>

<style lang="stylus">
.flex-grid {
  display: flex;
  flex-wrap: wrap;
}
</style>
