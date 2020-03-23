<template>
  <section class="domain-search">
    <domain-navigation type="text" placeholder="cadence-canary" />
  </section>
</template>

<script>
import { DomainNavigation } from '~components';

export default {
  data() {
    return {};
  },
  components: {
    'domain-navigation': DomainNavigation,
  },
};
</script>

<style lang="stylus">
@require "../styles/definitions"

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
