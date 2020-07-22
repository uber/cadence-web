<template>
  <div class="settings-date-format">
    <settings-header
      title="Workflow History Settings"
      @close="onClose"
    />
    <div class="content">
    </div>
    <settings-footer
      :apply-enabled="isSettingsChanged"
      @close="onClose"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import ButtonFill from '../../button-fill';
import ButtonIcon from '../../button-icon';
import FlexGrid from '../../flex-grid';
import FlexGridItem from '../../flex-grid-item';
import SettingsFooter from './settings-footer';
import SettingsHeader from './settings-header';
import TextInput from '../../text-input';

export default {
  name: 'settings-workflow-history',
  props: {
  },
  data() {
    return {
    };
  },
  methods: {
  },
  components: {
    'button-fill': ButtonFill,
    'button-icon': ButtonIcon,
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
    'settings-footer': SettingsFooter,
    'settings-header': SettingsHeader,
    'text-input': TextInput,
  },
};
</script>

<style lang="stylus">
.settings-workflow-history {

}
</style>
