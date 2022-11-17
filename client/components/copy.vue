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
  name: 'copy',
  props: ['text'],
  methods: {
    copy() {
      const element = document.createElement('div');

      element.textContent = this.text;
      document.body.appendChild(element);

      const range = document.createRange();

      range.selectNode(element);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);

      if (window.Mocha) {
        window.Mocha.copiedText = this.text;
      } else {
        document.execCommand('copy');
      }

      element.remove();

      this.$el.classList.add('copied');
      setTimeout(() => this.$el.classList.remove('copied'), 1000);
    },
  },
};
</script>

<template>
  <a href="#" class="copy" @click.prevent="copy"></a>
</template>

<style lang="stylus">
@require "../styles/definitions.styl"

@keyframes copied
  40%
    transform scale(1.4)
  60%
    transform scale(0.8)
  75%
    transform scale(1.2)
  100%
    transform scale(1)

a.copy
  icon('\ea16')
  &.copied
    animation copied 500ms ease-in-out
</style>
