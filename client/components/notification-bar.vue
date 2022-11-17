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
  name: 'notification-bar',
  props: [
    'message',
    'onClose',
    'show',
    'type', // 'error', 'success', 'warning'
  ],
};
</script>

<template>
  <transition name="fade">
    <div class="notification-bar" :class="type" v-if="show">
      <div class="message">
        {{ message }}
      </div>
      <span class="close icon icon_delete" @click="onClose" />
    </div>
  </transition>
</template>

<style scoped lang="stylus">
UberGreen = #3AA76D;
UberRed = #D44333;
UberOrange = #ED6E33;
DefaultColor = UberGreen;

.close {
  cursor: pointer;
  line-height: 60px;
  padding: 0 13px;
  position: absolute;
  right: 6px;
  top: 0;
}

.notification-bar {
  background-color: DefaultColor;
  color: #fff;
  font-size: 18px;
  height: 60px;
  left: 0;
  line-height: 60px;
  overflow: hidden;
  padding: 0 50px 0 24px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}

.error {
  background-color: UberRed;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.message {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.success {
  background-color: UberGreen;
}

.warning {
  background-color: UberOrange;
}
</style>
