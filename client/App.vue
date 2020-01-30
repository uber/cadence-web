<script>
import logo from './assets/logo.svg';

export default {
  data() {
    return { logo };
  },
  methods: {
    globalClick(e) {
      if (this.editing && !this.$refs.domain.contains(e.target)) {
        this.clearEdit();
      }

      if (e.target.tagName === 'A') {
        const href = e.target.getAttribute('href');

        if (
          href &&
          href.startsWith('/') &&
          !e.target.getAttribute('download') &&
          !e.target.getAttribute('target')
        ) {
          e.preventDefault();
          e.stopPropagation();
          this.$router.push(href);
        }
      }
    },
  },
};
</script>

<template>
  <main @click="globalClick">
    <header class="top-bar">
      <a href="/" class="logo" v-html="logo"></a>
      <div class="domain" v-if="$route.params.domain">
        <a
          :href="`/domain/${$route.params.domain}/workflows`"
          :class="{
            'router-link-active':
              $route.path === `/domain/${$route.params.domain}/workflows`,
            workflows: true,
          }"
          >{{ $route.params.domain }}</a
        >
        <a
          :href="`/domain/${$route.params.domain}/config`"
          :class="{
            'router-link-active':
              $route.path === `/domain/${$route.params.domain}/config`,
            config: true,
          }"
        ></a>
      </div>
      <div class="list-workflows" v-if="$route.name === 'workflows'">
        Workflows
      </div>
      <div class="detail-view workflow-id" v-if="$route.params.workflowId">
        <span>{{ $route.params.workflowId }}</span>
      </div>
      <div class="detail-view task-list" v-if="$route.params.taskList">
        <span>{{ $route.params.taskList }}</span>
      </div>
    </header>
    <router-view></router-view>
    <modals-container />
    <v-dialog />
  </main>
</template>

<style src="vue-virtual-scroller/dist/vue-virtual-scroller.css"></style>
<style lang="stylus">
@import "https://d1a3f4spazzrp4.cloudfront.net/uber-fonts/4.0.0/superfine.css"
@import "https://d1a3f4spazzrp4.cloudfront.net/uber-icons/3.14.0/uber-icons.css"
@require "./styles/definitions"
@require "./styles/reset"

global-reset()

@import "./styles/base"
@import "./styles/select"
@import "./styles/modal"
@import "./styles/code"

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
    &.config
      margin-left inline-spacing-medium
      icon('\ea5f')
    &.logo
      margin-right layout-spacing-medium
  svg
    display inline-block
    height top-nav-height - 20px

  spacing = 1.3em
  nav-label-color = uber-white-40
  nav-label-font-size = 11px
  & > div
    margin-right spacing
  div.domain
    flex 0 0 auto
    &::before
      content 'DOMAIN'
      font-size nav-label-font-size
      font-weight normal
      vertical-align middle
      color nav-label-color
      margin-right spacing
    a:hover
      color lighten(uber-blue, 15%)
    .router-link-active
      pointer-events none
    span
      cursor pointer
      transition smooth-transition
      color uber-blue
    & + div
      icon('\ea5b')
      one-liner-ellipsis()
      &::before
        display inline-block
        transform scale(1.5)
        margin-right spacing
  .detail-view span::before
    font-size nav-label-font-size
    color nav-label-color
    margin-right spacing
  div.workflow-id span::before
      content 'WORKFLOW ID'
  div.task-list span::before
      content 'TASK LIST'

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
