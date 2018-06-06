<template>
  <a href="#" class="copy" @click.prevent="copy"></a>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    copy() {
      var element = document.createElement('div')
      element.textContent = this.text
      document.body.appendChild(element)

      var range = document.createRange()
      range.selectNode(element)
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)

      document.execCommand('copy')
      element.remove()

      this.$el.classList.add('copied')
      setTimeout(() => this.$el.classList.remove('copied'), 1000)
    }
  }
}
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