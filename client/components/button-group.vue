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
    uppercase: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
  },
  components: {
    'button-fill': ButtonFill,
  },
  methods: {
    onClick(item) {
      if (this.value !== item) {
        this.$emit('change', item);
      }
    },
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
      :uppercase="uppercase"
      v-for="item in items"
      @click="() => onClick(item)"
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