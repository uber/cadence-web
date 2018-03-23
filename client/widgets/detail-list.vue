<template>
  <dl class="details">
    <div v-for="kvp in kvps">
      <dt>{{kvp.key}}</dt>
      <dd>{{format(kvp.value)}}</dd>
    </div>
  </dl>
</template>

<script>
function decodeIfNeeded(s) {
  try {
    return atob(s)
  } catch(e) {
    return s
  }
}

export default {
  name: 'details-list',
  props: ['item'],
  data() {
    return {}
  },
  computed: {
    kvps() {
      var kvps = []

      function flatten(prefix, obj) {
        Object.entries(obj).forEach(([k, value]) => {
          var key = prefix ? `${prefix}.${k}` : k
          if (value && typeof value === 'object') {
            flatten(key, value)
          } else if (typeof value === 'string') {
            kvps.push({ key, value: decodeIfNeeded(value) })
          } else {
            kvps.push({ key, value })
          }
        })
      }

      flatten('', this.item || {})
      return kvps
    }
  },
  methods: {
    format(val) {
      return val == null ? '' : (String(val) || '""')
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/definitions.styl"

dl.details
  > div
    display flex
    padding 4px 0
    justify-content space-between
    min-width 0
    &:nth-child(2n)
      background-color rgba(0,0,0,0.03)
  dt
    flex 0 1 300px
    font-family monospace-font-family
    font-weight 200
    margin-right 1em
  dd
    flex 1 1 auto
    max-width calc(100vw - 700px)
    @media (max-width: 1000px)
      max-width 500px
    //text-align right
    one-liner-ellipsis()
</style>