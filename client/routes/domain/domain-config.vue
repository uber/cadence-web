<template>
  <section :class="{ 'domain-config domain-description': true, loading }">
    <header>
      <h3>{{ domain }}</h3>
    </header>
    <detail-list
      v-if="domainConfig"
      :item="domainConfig"
      :title="`Domain ${domain} Configuration`"
    />
    <span class="error" v-if="error">{{ error }}</span>
  </section>
</template>

<script>
import { getKeyValuePairs, mapDomainDescription } from '~helpers';
import { DetailList } from '~components';

export default {
  data() {
    return {
      error: undefined,
      loading: true,
      domainConfig: undefined,
    };
  },
  props: ['domain'],
  components: {
    'detail-list': DetailList,
  },
  created() {
    this.$http(`/api/domains/${this.domain}`)
      .then(
        r => {
          const domainConfig = mapDomainDescription(r);
          const kvps = getKeyValuePairs(domainConfig);

          this.domainConfig = { ...domainConfig, kvps };
        },
        res => {
          this.error = `${res.statusText || res.message} ${res.status}`;
        }
      )
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {},
};
</script>

<style lang="stylus">
@require "../../styles/definitions.styl"

section.domain-config
  .foobar
    display none
</style>
