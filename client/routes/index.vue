<template>
  <section>
    <navigation-bar>
      <navigation-link
        :exact="true"
        icon="icon_search"
        label="Search"
        :to="{ name: 'domain-search' }"
      />
      <navigation-link
        label="Help"
        icon="icon_help"
        :to="{ name: 'help' }"
      />
    </navigation-bar>
    <router-view />
  </section>
</template>

<script>
import NavigationBar from '../components/navigation-bar';
import NavigationLink from '../components/navigation-link';

export default {
  components: {
    'navigation-bar': NavigationBar,
    'navigation-link': NavigationLink,
  }
};
</script>

<style lang="stylus">

</style>