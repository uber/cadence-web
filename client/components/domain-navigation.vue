<template>
  <div class="domain-navigation" :class="'validation-' + validation">
    <div class="input-and-validation">
      <div class="input-wrapper">
        <input
          type="text"
          name="domain"
          spellcheck="false"
          autocorrect="off"
          ref="input"
          v-bind:value="d"
          :placeholder="$props.placeholder"
          @input="onInput"
          @keydown.enter="changeDomain"
          @keydown.esc="onEsc"
        />
        <a
          :href="validation === 'valid' ? '#' : ''"
          class="change-domain"
          @click="changeDomain"
        ></a>
      </div>
      <p :class="'validation validation-' + validation">
        {{ validationMessage }}
      </p>
    </div>
    <ul class="recent-domains" v-if="recentDomains.length">
      <h3>Recent Domains</h3>
      <li v-for="domain in recentDomains" :key="domain">
        <a
          :href="domainLink(domain)"
          :data-domain="domain"
          @click="recordDomainFromClick"
          @mouseover="showDomainDesc(domain)"
          >{{ domain }}</a
        >
      </li>
    </ul>
    <div
      :class="{ 'domain-description': true, pending: !!domainDescRequest }"
      v-if="domainDesc"
    >
      <span class="domain-name">{{ domainDescName }}</span>
      <detail-list :item="domainDesc" :title="domainDescName" />
    </div>
  </div>
</template>

<script>
import debounce from 'lodash-es/debounce';
import omit from 'lodash-es/omit';
import { stringify } from 'friendly-querystring';
import { getKeyValuePairs, mapDomainDescription } from '~helpers';
import { DetailList } from '~components';

const validationMessages = {
  valid: d => `${d} exists`,
  invalid: d => `${d} does not exist`,
  error: d => `An error occoured while querying for ${d}`,
};

export default {
  props: ['domain', 'placeholder'],
  data() {
    return {
      d: this.$props.domain,
      validation: 'unknown',
      validationMessage: undefined,
      recentDomains:
        JSON.tryParse(localStorage.getItem('recent-domains')) || [],
      domainDesc: undefined,
      domainDescName: undefined,
      domainDescRequest: undefined,
    };
  },
  components: {
    'detail-list': DetailList,
  },
  created() {
    this.domainDescCache = {};

    if (this.$route && this.$route.params && this.$route.params.domain) {
      this.recordDomain(this.$route.params.domain);
    }
  },
  methods: {
    recordDomain(domain) {
      if (domain) {
        this.recentDomains = this.recentDomains
          .filter(d => d && d !== domain)
          .slice(0, 15);
        this.recentDomains.unshift(domain);
        localStorage.setItem(
          'recent-domains',
          JSON.stringify(this.recentDomains)
        );
      }
    },
    changeDomain() {
      if (this.validation === 'valid') {
        this.$router.push({
          path: `/domains/${this.d}/workflows`,
          query: omit(
            this.$router.currentRoute.query,
            'workflowId',
            'runId',
            'workflowName'
          ),
        });
        this.recordDomain(this.d);
        this.$emit('navigate', this.d);
      }
    },
    domainLink(d) {
      return `/domains/${d}/workflows?${stringify(
        this.$router.currentRoute.query
      )}`;
    },
    recordDomainFromClick(e) {
      const domain = e.target.getAttribute('data-domain');

      this.recordDomain(domain);
      this.$emit('navigate', domain);
    },
    getDomainDesc(d) {
      if (this.domainDescCache[d]) {
        return Promise.resolve(this.domainDescCache[d]);
      }

      return this.$http(`/api/domains/${d}`).then(r => {
        this.domainDescCache[d] = mapDomainDescription(r);

        return this.domainDescCache[d];
      });
    },
    checkValidity: debounce(function checkValidity() {
      const check = newDomain => {
        this.validation = 'pending';
        this.domainDescRequest = this.getDomainDesc(newDomain)
          .then(
            desc => {
              this.domainDescName = newDomain;
              this.domainDesc = {
                kvps: getKeyValuePairs(desc),
              };

              return 'valid';
            },
            res => (res.status === 404 ? 'invalid' : 'error')
          )
          .then(v => {
            this.$emit('validate', this.d, v);

            if (v in validationMessages) {
              this.validationMessage = validationMessages[v](this.d);
            }

            if (this.d === newDomain || !this.d) {
              this.validation = this.d ? v : 'unknown';
              this.domainDescRequest = null;
            } else {
              check.call(this, this.d);
            }
          });
      };

      if (!this.domainDescRequest && this.d) {
        check(this.d);
      }
    }, 300),
    onInput() {
      this.d = this.$refs.input.value;
      this.checkValidity();
    },
    showDomainDesc(d) {
      this.domainDescName = d;
      this.domainDescRequest = this.getDomainDesc(d)
        .catch(res => ({
          error: `${res.statusText || res.message} ${res.status}`,
        }))
        .then(desc => {
          if (this.domainDescName === d) {
            this.domainDesc = {
              kvps: getKeyValuePairs(desc),
            };
            this.domainDescRequest = null;
          }
        });
    },
    onEsc(e) {
      this.$emit('cancel', e);
    },
  },
};
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
  flex-wrap wrap
  change-domain-size = 32px

  div.input-and-validation
    flex 0 0 100%
    div.input-wrapper
      display flex
      position relative
      align-items center
      &::after
        position absolute
        right 18px + change-domain-size + inline-spacing-small
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
    input
      flex 1 1 auto
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

  ul.recent-domains
    flex 1 1 auto

  a.change-domain
    icon('\ea87')
    margin-left inline-spacing-small
    &::before
      display inline-block
      width change-domain-size
      height change-domain-size
      line-height change-domain-size
      text-align center
      color white
      background-color uber-white-80
      border-radius change-domain-size
    &[href='#']::before
      background-color primary-color

.domain-description
  flex 1 1 60%
  padding layout-spacing-small
  span.domain-name
    display inline-block
    font-size 18px
    padding inline-spacing-small
    font-family monospace-font-family
  &.pending dl.details
    opacity 0.2
  dl.details
    & > div
      display block
      padding inline-spacing-small
    dt, dd
      line-height 1.5em
    dt
      text-transform uppercase
      font-family primary-font-family
      font-weight 200
</style>
