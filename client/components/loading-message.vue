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
  name: 'loading-message',
  props: ['loading', 'delay'],
  data() {
    return {
      showMessage: false,
      timer: undefined,
    };
  },
  methods: {
    clearState() {
      this.stopTimer();
      this.showMessage = false;
    },
    startTimer() {
      this.clearState();
      this.timer = setTimeout(() => {
        this.showMessage = true;
      }, this.delay);
    },
    stopTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
  },
  watch: {
    loading(loading) {
      if (!loading) {
        this.clearState();
      } else {
        this.startTimer();
      }
    },
  },
};
</script>

<template>
  <div class="loading-message" v-if="showMessage">
    <slot></slot>
  </div>
</template>

<style lang="stylus">
@keyframes loadingMessageFadeIn {
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}

.loading-message {
  animation: loadingMessageFadeIn ease 1s;

  text-align: center;
  line-height: 24px;
}
</style>
