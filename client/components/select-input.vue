<script>
// Copyright (c) 2017-2021 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import VueSelect from 'vue-select';

export default {
  components: {
    'v-select': VueSelect,
  },
  name: 'select-input',
  props: [
    'disabled',
    'label',
    'maxWidth',
    'name',
    'options',
    'readonly',
    'value',
  ],
  methods: {
    onSelectChange(...args) {
      this.$emit('change', ...args);
    },
  },
};
</script>

<template>
  <div class="select-input field" :style="{ maxWidth }">
    <v-select
      :disabled="disabled"
      :inputId="name"
      :on-change="onSelectChange"
      :options="options"
      :searchable="false"
      :style="{ maxWidth }"
      :value="value"
    />
    <label :for="name">{{ label }}</label>
  </div>
</template>

<style lang="stylus">
@require "../styles/base.styl"

.select-input {
  label {
    top: -4px !important;
    left: 6px !important;
    color: black !important;
    background-color: white;
    transform: scale(0.8);
  }

  .dropdown {
    width: 100%;
  }
}
</style>
