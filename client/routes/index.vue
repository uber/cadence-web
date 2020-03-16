<template>
  <section>
    <nav>
      <router-link :to="{ name: 'domain-search' }" class="search">
        Search
      </router-link>
      <router-link :to="{ name: 'help' }" class="help">
        Help
      </router-link>
      <router-view />
    </nav>
  </section>
</template>

<script>
export default {

};
</script>

<style lang="stylus">
  @require "../styles/definitions.styl"

</style>