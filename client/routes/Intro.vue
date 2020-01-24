<template>
  <section class="intro">
    <div class="links">
      <h1>Welcome to Cadence!</h1>
      <p>
        If you are new to Cadence, here's some resources to get you started!
      </p>
      <a
        href="https://www.youtube.com/watch?v=-BuIkhlc-RM&amp;t=3s"
        target="_blank"
        rel="noopener noreferrer"
        >Introductory to Cadence Video</a
      >
      <a
        href="https://github.com/samarabbas/cadence-samples"
        target="_blank"
        rel="noopener noreferrer"
        >Code Samples</a
      >
      <a
        href="https://github.com/uber/cadence"
        target="_blank"
        rel="noopener noreferrer"
        >Source code on GitHub</a
      >
      <p>Otherwise, provide your team's domain to get started</p>
    </div>
    <domain-navigation type="text" placeholder="cadence-canary" />
  </section>
</template>

<script>
import domainNav from '../widgets/domain-navigate.vue';

export default {
  data() {
    return {};
  },
  components: {
    'domain-navigation': domainNav,
  },
};
</script>

<style lang="stylus">
@require "../styles/definitions"

section.intro
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
