<template>
  <flex-grid>
    <flex-grid-item
      align-items="center"
      grow="1"
    >
      <label :for="name">
        {{ label }}
      </label>
    </flex-grid-item>
    <flex-grid-item>
      <toggle-button
        :labels="true"
        :name="name"
        :value="value"
        @change="onChange"
      />
    </flex-grid-item>
  </flex-grid>
</template>

<script>
import FlexGrid from './flex-grid';
import FlexGridItem from './flex-grid-item';
import { ToggleButton } from 'vue-js-toggle-button';

export default {
  name: 'setting-toggle',
  props: {
    label: {
      type: String,
    },
    name: {
      type: String,
    },
    value: {
      type: Boolean,
    },
  },
  methods: {
    onChange(event) {
      this.$emit('change', event);
    },
  },
  components: {
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
    'toggle-button': ToggleButton,
  },
};
</script>