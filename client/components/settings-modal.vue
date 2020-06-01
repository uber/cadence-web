<template>
  <modal name="settings-modal" @before-close="onBeforeClose" :show="show">
    <div class="settings-modal">
      <div class="header">
        <flex-grid align-items="center">
          <flex-grid-item>
            <h2>Settings</h2>
          </flex-grid-item>
          <flex-grid-item width="40px">
            <button-icon
              icon="icon_delete-thin"
              size="30px"
              @click="onDismissClick"
            />
          </flex-grid-item>
        </flex-grid>
      </div>
      <div class="content">
        <h2>Time options</h2>
      </div>
      <div class="footer">
        <flex-grid align-items="center">
          <flex-grid-item>
            <button-fill
              :disabled="applyDisabled"
              label="APPLY"
              @click="onSubmitClick"
            />
          </flex-grid-item>
          <flex-grid-item width="102px">
            <button-fill label="CANCEL" @click="onDismissClick" />
          </flex-grid-item>
        </flex-grid>
      </div>
    </div>
  </modal>
</template>

<script>
import { ButtonFill, ButtonIcon, FlexGrid, FlexGridItem } from '~components';

export default {
  props: ['show', 'timeFormat', 'timezone'],
  computed: {
    applyDisabled() {
      // TODO - figure out if data has changed, then enable apply button
      return false;
    },
  },
  methods: {
    onDismissClick() {
      this.$modal.hide('settings-modal');
    },
    onBeforeClose() {
      this.$emit('before-close');
    },
    onShow() {
      // copy over data
      // TODO
    },
    onSubmitClick() {
      // TODO
    },
  },
  components: {
    'button-fill': ButtonFill,
    'button-icon': ButtonIcon,
    'flex-grid': FlexGrid,
    'flex-grid-item': FlexGridItem,
  },
  watch: {
    show(show) {
      if (show) {
        this.onShow();
      }
    },
  },
};
</script>

<style lang="stylus">
.settings-modal {
  .content {
    max-height: 400px
    overflow-y: auto;
  }

  .footer {
    padding-top: 15px;
  }

  .header {
    padding-bottom: 15px;
  }
}
</style>
