<template>
  <section class="intro">
    <h1>Welcome to Cadence!</h1>
    <p>If you are new to Cadence, here's some resources to get you started!</p>
    <ul>
      <li><a href="https://www.youtube.com/watch?v=-BuIkhlc-RM&amp;t=3s"
        target="_blank" rel="noopener noreferrer">Introductory to Cadence Video</a></li>
      <li><a href="https://github.com/samarabbas/cadence-samples"
        target="_blank" rel="noopener noreferrer">Code Samples</a></li>
      <li><a href="https://github.com/uber/cadence"
        target="_blank" rel="noopener noreferrer">Source code on GitHub</a></li>
    </ul>
    <p>Otherwise, provide your team's domain to get started</p>
    <input type="text"
      placeholder="cadence-canary"
      v-model="domain"
      @keydown.enter="goToDomain"
    />
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
  li
    line-height 2em
    &:nth-child(2n)
      background none
</style>