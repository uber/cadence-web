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
  name: 'loading-spinner',
};
</script>

<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
  </div>
</template>

<style lang="stylus">
.loading-spinner {
  margin: 16px auto;
  height: 32px;
  width: 32px;

  .spinner {
    animation: spin 800ms linear infinite;
    border: 3px solid #11939a;
    border-bottom-color: transparent;
    border-radius: 100%;
    height: 100%;
    width: 100%;
  }
}
</style>
