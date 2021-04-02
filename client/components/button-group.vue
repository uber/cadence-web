<script>
import ButtonFill from './button-fill';

export default {
  name: 'button-group',
  props: {
    items: {
      type: Array,
      default: [],
    },
    label: {
      type: String,
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
    <span class="label" v-if="label">
      {{ label }}
    </span>
    <button-fill
      :active="item === value"
      :label="item"
      v-for="item in items"
    />
  </div>
</template>

<style lang="stylus">
.button-group {
  display: inline-block;

  .label {
    margin-right: 10px;
  }
}
</style>