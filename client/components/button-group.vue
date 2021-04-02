<script>
import ButtonFill from './button-fill';

export default {
  name: 'button-group',
  props: {
    items: {
      type: Array,
      default: [],
    },
    value: {
      type: String,
      default: '',
    },
  },
  components: {
    'button-fill': ButtonFill,
  },
};
</script>

<template>
  <div class="button-group">
    <button-fill
      :active="item === value"
      :label="item"
      v-for="item in items"
    />
  </div>
</template>