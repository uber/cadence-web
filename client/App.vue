<script>
export default {
  data () {
    return {
      domain: '',
      editing: false,
      recentDomains: JSON.tryParse(localStorage.getItem('recent-domains')) || []
    }
  },
  created() {
    this.recordDomain(this.$route.params.domain)
  },
  watch: {
    '$route'() {
      this.recordDomain(this.$route.params.domain)
    }
  },
  methods: {
    changeDomain() {
      this.$router.push({
        path: `/domain/${this.domain}/workflows`,
        query: this.$router.currentRoute.query
      })
      this.editing = false
      this.recordDomain(this.domain)
    },
    recordDomain(domain) {
      console.log(`recordDomain: ${domain}`)
      if (domain) {
        this.recentDomains = this.recentDomains.filter(d => d && d !== domain)
        this.recentDomains.unshift(domain)
        console.dir(this.recentDomains)
        localStorage.setItem('recent-domains', JSON.stringify(this.recentDomains))
      }
    },
    clearEdit() {
      this.editing = false
    },
    edit() {
      this.editing = true
      setTimeout(() => this.$refs.domain.focus(), 10)
    },
    globalClick(e) {
      if (this.editing && !this.$refs.domaincontainer.contains(e.target)) {
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
      <nav v-if="$route.params.domain">
        <router-link :to="{ name: 'workflows' }">Workflows</router-link>
        <router-link :to="{ name: 'history' }">History</router-link>
      </nav>
      <div class="domain" v-if="$route.params.domain" ref="domaincontainer">
        <span v-if="!editing" @click="edit">{{!editing && $route.params.domain}}</span>
        <input type="text" name="domain" spellcheck="false" autocorrect="off"
           v-if="editing"
           v-model="domain"
           ref="domain"
           @keydown.enter="changeDomain"
           @keydown.esc="clearEdit"
        />
      </div>
    </header>
    <router-view></router-view>
  </main>
</template>

<style lang="stylus">
@import "https://d1a3f4spazzrp4.cloudfront.net/uber-fonts/4.0.0/superfine.css"
@import "https://d1a3f4spazzrp4.cloudfront.net/uber-icons/3.13.0/uber-icons.css"
@require "./styles/definitions"
@require "./styles/reset"

global-reset()

@import "./styles/base"
@import "./styles/select"

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
    text-transform uppercase
    h2
      color uber-white-80
  nav
    display inline-flex
    align-items stretch
    height top-nav-height
    a
      color white
      font-weight 500
      padding page-margin-y inline-spacing-large
      border-top 4px solid transparent
      &.router-link-active
        border-top 4px solid uber-blue
      &:hover, &.router-link-active
        color uber-blue
  div.domain
    position absolute
    right page-margin-x
    span, input
      font-size 16px
      font-weight 200
    input
      background-color alpha(white, 10%)
      color inverted-text-color
    span
      cursor pointer
      transition smooth-transition
      &:hover
        color uber-blue
      &::before
        content 'DOMAIN'
        font-size 9px
        font-weight normal
        vertical-align middle
        color uber-white-40
        margin-right 1.3em

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
