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

import { ErrorMessage } from '~components';

export default {
  name: 'domain',
  props: {
    clusterName: {
      type: String,
    },
    domainName: {
      type: String,
    },
    error: {
      type: String,
    },
    isLoading: {
      type: Boolean,
    },
    isReady: {
      type: Boolean,
    },
    origin: {
      type: String,
    },
  },
  components: {
    'error-message': ErrorMessage,
  },
  watch: {
    clusterName() {
      this.$emit('onClusterChange');
    },
    domainName() {
      this.$emit('onDomainChange');
    },
    origin() {
      this.$emit('onOriginChange');
    },
  },
};
</script>
<template>
  <section class="domain" :class="{ loading: isLoading }">
    <slot v-if="isReady"></slot>
    <error-message :error="error" />
  </section>
</template>
