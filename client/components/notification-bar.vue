<template>
  <transition name="fade">
    <div class="notification-bar" :class="type" v-if="show">
      <div class="message">
        {{ message }}
      </div>
      <span class="close icon icon_delete" @click="onClose" />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'notification-bar',
  props: [
    'message',
    'onClose',
    'show',
    'type', // 'error', 'success', 'warning'
  ],
};
</script>

<style scoped lang="stylus">
UberGreen = #3AA76D;
UberRed = #D44333;
UberOrange = #ED6E33;
DefaultColor = UberGreen;

.close {
  cursor: pointer;
  line-height: 60px;
  padding: 0 13px;
  position: absolute;
  right: 6px;
  top: 0;
}

.notification-bar {
  background-color: DefaultColor;
  color: #fff;
  font-size: 18px;
  height: 60px;
  left: 0;
  line-height: 60px;
  overflow: hidden;
  padding: 0 50px 0 24px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}

.error {
  background-color: UberRed;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.message {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.success {
  background-color: UberGreen;
}

.warning {
  background-color: UberOrange;
}
</style>
