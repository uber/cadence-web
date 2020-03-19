<template>
  <router-link
    class="navigation-link"
    :class="icon"
    :exact="exact"
    :id="id"
    :to="to"
  >
    {{ label }}
  </router-link>
</template>

<script>
export default {
  name: 'navigation-link',
  props: ['exact', 'icon', 'id', 'label', 'to'],
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

  &:before {
    font-family: 'uber-icons';
    margin-right: 5px;
  }

  &.router-link-active {
    border-bottom-color: #11939a;
  }
}
</style>
