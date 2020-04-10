<template>
  <select onSelect>
    <option
      :key="href"
      :value="href"
      :selected="href === selected"
      v-for="{ href, label } in environmentList"
    >{{ label }}</option>
  </select>
</template>

<script>
import { ENVIRONMENT_LIST } from '~constants';

export default {
  name: 'environment-select',
  data() {
    return {
      environmentList: ENVIRONMENT_LIST,
    };
  },
  computed: {
    selected() {

    },
  },
  methods: {
    onSelect(href) {
      console.log('selected = ', href);
    },
  }
};
</script>