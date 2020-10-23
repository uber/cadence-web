<template>
  <loader class="bar"
    ><div></div>
    <div></div>
    <div></div
  ></loader>
</template>

<script>
export default {
  name: 'bar-loader',
};
</script>

<style lang="stylus">
@require "../styles/definitions.styl"

loader.bar
  display inline-block
  flex 0 0 auto
  > div
    display inline-block
    vertical-align middle
    border 1px solid uber-black-40
    background-color uber-white-40
    height 1em
    width 0.3em
    margin 0 1px
    animation wave 2s infinite ease-in-out
    &:nth-child(2)
      animation-delay 200ms
    &:nth-child(3)
      animation-delay 400ms

@keyframes wave
  0%, 35%
    opacity 0.5
  50%
    opacity 1
    transform scale(1.2)
  65%, 100%
    opacity 0.5
</style>
