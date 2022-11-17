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
  name: 'no-results',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: 'No Results',
    },
    results: {
      type: Array,
    },
  },
};
</script>

<template>
  <div
    class="no-results-container"
    v-if="!isLoading && results && !results.length"
  >
    <div class="no-results">{{ message }}</div>
  </div>
</template>

<style lang="stylus">
.no-results-container {
  padding: 70px 0;
}
</style>
