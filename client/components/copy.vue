<template>
  <a href="#" class="copy" @click.prevent="copy"></a>
</template>

<script>
export default {
  name: 'copy',
  props: ['text'],
  methods: {
    copy() {
      const element = document.createElement('div');

      element.textContent = this.text;
      document.body.appendChild(element);

      const range = document.createRange();

      range.selectNode(element);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);

      if (window.Mocha) {
        window.Mocha.copiedText = this.text;
      } else {
        document.execCommand('copy');
      }

      element.remove();

      this.$el.classList.add('copied');
      setTimeout(() => this.$el.classList.remove('copied'), 1000);
    },
  },
};
</script>

<style lang="stylus">
@require "../styles/definitions.styl"

@keyframes copied
  40%
    transform scale(1.4)
  60%
    transform scale(0.8)
  75%
    transform scale(1.2)
  100%
    transform scale(1)

a.copy
  icon('\ea16')
  &.copied
    animation copied 500ms ease-in-out
</style>
