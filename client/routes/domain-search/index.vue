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

import { DomainNavigation } from './components';

export default {
  name: 'domain-search',
  data() {
    return {};
  },
  components: {
    'domain-navigation': DomainNavigation,
  },
};
</script>

<template>
  <section class="domain-search">
    <domain-navigation />
  </section>
</template>

<style lang="stylus">
@require "../../styles/definitions"

section.domain-search
  margin layout-spacing-large
  @media (min-width 1600px)
    width 1580px
    margin 0 auto
    .domain-navigation
      padding-left layout-spacing-medium
      padding-right layout-spacing-medium
  .links
    margin layout-spacing-large auto
    a
      display block
  h1
    margin-bottom base-font-size*2
  p, h3, .domain-navigation
    margin 1em 0
  a
    line-height 2.5em
    &:nth-child(2n)
      background none
  .domain-navigation
    div.input-and-validation
      align-items center
      .input-wrapper, p
        max-width 850px
        margin-left auto
        margin-right auto
    input
      margin 0
  .recent-domains
    li
      padding 0 inline-spacing-medium
</style>
