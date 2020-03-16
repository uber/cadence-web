<template>
  <router-link
    class="navigation-link"
    :exact="exact"
    :to="to"
  >
    {{ label }}
  </router-link>
</template>

<script>
export default {
  props: ['exact', 'icon', 'label', 'to'],

};
</script>

<style lang="stylus">
  a.navigation-link {
    display: inline-block;
    padding: 11px 18px;
    transition: all 400ms ease;
    font-weight: 500;
    text-transform: uppercase;
    border-bottom: 4px solid transparent;

    &.router-link-active {
      border-bottom-color: #11939a;
    }
  }
</style>