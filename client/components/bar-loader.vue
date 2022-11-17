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
  name: 'bar-loader',
};
</script>

<template>
  <loader class="bar"
    ><div></div>
    <div></div>
    <div></div
  ></loader>
</template>

<style lang="stylus">
@require "../styles/definitions.styl"

loader.bar
  display inline-block
  flex 0 0 auto
  > div
    display inline-block
    vertical-align middle
    border 1px solid uber-black-40
    background-color uber-white-40
    height 1em
    width 0.3em
    margin 0 1px
    animation wave 2s infinite ease-in-out
    &:nth-child(2)
      animation-delay 200ms
    &:nth-child(3)
      animation-delay 400ms

@keyframes wave
  0%, 35%
    opacity 0.5
  50%
    opacity 1
    transform scale(1.2)
  65%, 100%
    opacity 0.5
</style>
