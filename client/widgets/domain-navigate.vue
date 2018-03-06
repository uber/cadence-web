<template>
  <div class="domain-navigation" :class="'validation-' + validation">
    <div class="input-wrapper">
      <input type="text" name="domain" spellcheck="false" autocorrect="off"
        ref="input"
        v-bind:value="d"
        :placeholder="$props.placeholder"
        @input="onInput"
        @keydown.enter="changeDomain"
        @keydown.esc="onEsc"
      />
    </div>
    <p :class="'validation validation-' + validation">{{validationMessage}}</p>
    <ul class="recent-domains" v-if="recentDomains.length">
      <h3>Recent Domains</h3>
      <li v-for="domain in recentDomains">
        <a :href="domainLink(domain)" :data-domain="domain" @click="goToRecentDomain">{{domain}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import debounce from 'lodash-es/debounce'
import { stringify } from 'friendly-querystring'

const validationMessages = {
  valid: d => `${d} exists`,
  invalid: d => `${d} does not exist`,
  error: d => `An error occoured while querying for ${d}`,
}

export default {
  props: ['domain', 'placeholder'],
  data() {
    return {
      d: this.$props.domain,
      validation: 'unknown',
      validationRequest: undefined,
      validationMessage: undefined,
      recentDomains: JSON.tryParse(localStorage.getItem('recent-domains')) || []
    }
  },
  created() {
    if (this.$route && this.$route.params && this.$route.params.domain) {
      this.recordDomain(this.$route.params.domain)
    }
  },
  methods: {
    recordDomain(domain) {
      if (domain) {
        this.recentDomains = this.recentDomains.filter(d => d && d !== domain).slice(0, 9)
        this.recentDomains.unshift(domain)
        localStorage.setItem('recent-domains', JSON.stringify(this.recentDomains))
      }
    },
    changeDomain() {
      if (this.validation === 'valid') {
        this.$router.push({
          path: `/domain/${this.d}/workflows`,
          query: this.$router.currentRoute.query
        })
        this.recordDomain(this.d)
        this.$emit('navigate', this.d)
      }
    },
    domainLink(d) {
      return `/domain/${d}/workflows?${stringify(this.$router.currentRoute.query)}`
    },
    goToRecentDomain(e) {
      var domain = e.target.getAttribute('data-domain')
      this.recordDomain(domain)
      this.$emit('navigate', domain)
    },
    checkValidity: debounce(function (x) {
      const check = newDomain => {
        this.validation = 'pending'
        this.validationRequest = this.$http(`/api/domain/${newDomain}`).then(
          () => 'valid',
          res => res.status === 404 ? 'invalid' : 'error'
        ).then(v => {
          this.$emit('validate', this.d, v)
          if (v in validationMessages) {
            this.validationMessage = validationMessages[v](this.d)
          }
          if (this.d === newDomain || !this.d) {
            this.validation = this.d ? v : 'unknown'
            this.validationRequest = null
          } else {
            check.call(this, this.d)
          }
        })
      }

      if (!this.validationRequest && this.d) {
        check(this.d)
      }
    }, 300),
    onInput() {
      this.d = this.$refs.input.value
      this.checkValidity()
    },
    onEsc(e) {
      this.$emit('cancel', e)
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/definitions.styl"

validation(color, symbol)
  input
    border-color color
    &:focus
      outline color auto 2px
  &::after
    background-color color
    content symbol

.domain-navigation
  display flex
  flex-direction column
  div.input-wrapper
    display flex
    position relative
    flex 1 1 auto
    input
      flex 1 1 auto
    &::after
      position absolute
      right 18px
      font-size 11px
      size = 16px
      width size
      height size
      border-radius size
      top "calc(50% - %s)" % (size/2)
      color white
      display flex
      justify-content center
      align-items center
  &.validation-invalid .input-wrapper
    validation(uber-orange, '✕')
  &.validation-valid .input-wrapper
    validation(uber-green, '✔')
  &.validation-pending .input-wrapper::after
    background none
    border 2px solid uber-black-40
    border-bottom-color transparent
    animation spin 600ms linear infinite
    content ' '
  .validation-message
    line-height 1.5em
  ul
    display block
</style>