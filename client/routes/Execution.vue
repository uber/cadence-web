<template>
  <section class="execution">
    <header>
      <nav>
        <a href="" class="history router-link-active">History</a>
        <a href="" class="pollers">Pollers</a>
        <a href="" class="stack-trace">Stack Trace</a>
      </nav>
    </header>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="stylus">
@require "../styles/definitions.styl"

section.execution
  > header
    flex-wrap wrap
</style>