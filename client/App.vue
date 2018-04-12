<script>
export default {
  data () {
    return {}
  },
  methods: {
    globalClick(e) {
      if (this.editing && !this.$refs.domain.contains(e.target)) {
        this.clearEdit()
      }

      if (e.target.tagName === 'A') {
        var href = e.target.getAttribute('href')
        if (href && href.startsWith('/')) {
          e.preventDefault()
          e.stopPropagation()
          this.$router.push(href)
        }
      }
    }
  }
}
</script>

<template>
  <main @click="globalClick">
    <header class="top-bar">
      <a href="/" class="uber-icon"><h2>Cadence</h2></a>
      <div class="domain" v-if="$route.params.domain">
        <a :href="`/domain/${$route.params.domain}/workflows`" :class="{'router-link-active': $route.path === `/domain/${$route.params.domain}/workflows`}">{{$route.params.domain}}</a>
      </div>
      <div class="workflow-id" v-if="$route.query.workflowId && !editing">
        <span>{{$route.query.workflowId}}</span>
      </div>
    </header>
    <router-view></router-view>
  </main>
</template>

<style lang="stylus">
@import "https://d1a3f4spazzrp4.cloudfront.net/uber-fonts/4.0.0/superfine.css"
@import "https://d1a3f4spazzrp4.cloudfront.net/uber-icons/3.14.0/uber-icons.css"
@require "./styles/definitions"
@require "./styles/reset"

global-reset()

@import "./styles/base"
@import "./styles/select"
@import "./styles/modal"

header.top-bar
  display flex
  flex 0 0 auto
  align-items center
  background-color uber-black
  padding 0 page-margin-x
  color base-ui-color
  height top-nav-height
  h2
    font-size 18px
    margin-right inline-spacing-large
    padding page-margin-y inline-spacing-large page-margin-y 0
  a
    display inline-block
    h2
      color uber-white-80
  spacing = 1.3em
  & > div
    margin-right spacing
  div.domain
    &::before
      content 'DOMAIN'
      font-size 9px
      font-weight normal
      vertical-align middle
      color uber-white-40
      margin-right spacing
    a:hover
      color lighten(uber-blue, 15%)
    .router-link-active
      pointer-events none
    // display flex
    // align-items center
    // span, input
    //   font-size 16px
    //   font-weight 200
    // input
    //   background-color alpha(white, 10%)
    //   color inverted-text-color
    span
      cursor pointer
      transition smooth-transition
      color uber-blue
  div.workflow-id
    icon('\ea5b')
    &::before
      display inline-block
      transform scale(1.5)
      margin-right spacing
    span::before
      content 'WORKFLOW ID'

body, main
  height 100%
main
  position absolute
  width 100%
  display flex
  flex-direction column

main
  > section
    display flex
    flex-direction column
    flex 1 1 auto
    > header:last-of-type
      margin-bottom layout-spacing-small
    > header
      display flex
      align-items center
      flex 0 0 auto
      > *
        margin inline-spacing-small

area-loader, section.loading
  size = 32px
  &::after
    content ''
    display block
    position absolute
    width size
    height size
    border-radius size
    left "calc(50% - %s)" % (size/2)
    top "calc(25% - %s)" % (size/2)
    border 3px solid uber-blue
    border-bottom-color transparent
    animation spin 800ms linear infinite
</style>
