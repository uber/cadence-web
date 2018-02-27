<template>
  <section class="intro">
    <h1>Welcome to Cadence!</h1>
    <p>If you are new to Cadence, here's some resources to get you started!</p>
    <a href="https://www.youtube.com/watch?v=-BuIkhlc-RM&amp;t=3s"
        target="_blank" rel="noopener noreferrer">Introductory to Cadence Video</a>
    <a href="https://github.com/samarabbas/cadence-samples"
      target="_blank" rel="noopener noreferrer">Code Samples</a>
    <a href="https://github.com/uber/cadence"
      target="_blank" rel="noopener noreferrer">Source code on GitHub</a>
    <p>Otherwise, provide your team's domain to get started</p>
    <input type="text"
      placeholder="cadence-canary"
      v-model="domain"
      @keydown.enter="goToDomain"
    />
    <ul class="recent-domains" v-if="$parent.recentDomains.length">
      <h3>Recent Domains</h3>
      <li v-for="domain in $parent.recentDomains">
        <a :href="`/domain/${domain}/workflows`">{{domain}}</a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return { domain: '' }
  },
  methods: {
    goToDomain: function() {
      this.$router.push(`/domain/${this.domain}/workflows`)
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/definitions"

section.intro
  width 95vw
  max-width 800px
  margin layout-spacing-large auto 0
  h1
    margin-bottom base-font-size
  p, h3
    margin 1em 0
  a
    line-height 2.5em
    &:nth-child(2n)
      background none
  .recent-domains
    margin-top layout-spacing-large
    li
      padding 0 inline-spacing-medium
</style>