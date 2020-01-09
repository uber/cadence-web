<template>
  <div class="data-viewer">
    <a href="#" class="view-full-screen" @click.stop.prevent="viewFullScreen"></a>
    <prism v-if="highlight !== false" language="json" ref="codebox">{{code}}</prism>
    <pre v-if="highlight === false" ref="codebox">{{code}}</pre>
  </div>
</template>

<script>
import 'prismjs'
import 'prismjs/components/prism-json'
import Prism from 'vue-prism-component'

const MAXIMUM_CHARACTER_LIMIT = 300;

export default {
  name: 'data-viewer',
  props: ['item', 'highlight', 'compact', 'title'],
  data() {
    return {}
  },
  created() {
    this.checkOverflow = () => {
      let el = this.$refs.codebox
      if (!el) return

      let action = el.scrollWidth > (el.offsetWidth + 2) || el.scrollHeight > (el.offsetHeight + 2) ? 'add' : 'remove'
      this.$el.classList[action]('overflow')
    }
    window.addEventListener('resize', this.checkOverflow)
    ;['item', 'highlight', 'compact'].forEach(e => this.$watch(e, this.checkOverflow))
    this.$watch(() => this.$route, this.checkOverflow)
  },
  mounted() {
    this.checkOverflow()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkOverflow)
  },
  computed: {
    code() {
      return this.compact ?
        JSON.stringify(this.item).substring(0, MAXIMUM_CHARACTER_LIMIT) :
        JSON.stringify(this.item, null, 2);
    }
  },
  methods: {
    viewFullScreen() {
      this.$modal.show({
        template: `
          <div class="data-viewer-fullscreen">
            <header>
              <h3>{{title}}</h3>
              <copy :text="code" />
              <a class="close" href="#" @click="$emit('close')"></a>
            </header>
            <prism language="json">{{code}}</prism>
          </div>
        `,
        props: ['code', 'title'],
        components: { prism: Prism }
      }, {
        title: this.title,
        code: JSON.stringify(this.item, null, 2)
      }, {
        name: 'data-viewer-fullscreen'
      })
    }
  },
  components: {
    prism: Prism
  }
}
</script>

<style lang="stylus">
@require "../styles/definitions.styl"

.data-viewer
  position relative
  &:not(.overflow) a.view-full-screen
    display none
  a.view-full-screen
    position absolute
    top 1px
    right 0
    margin-right 10px
    width 28px
    height calc(100% - 6px)
    max-height 28px
    // background-color white
    // border 1px solid uber-black-80
    // border-radius 4px
    background-color alpha(uber-white-20, 70%)
    display flex
    justify-content center
    align-items center
    icon('\ea90')
    &::before
      margin 0
      font-size 18px

[data-modal="data-viewer-fullscreen"]
  .v--modal-box.v--modal
    max-width calc(100vw - 20px)
    max-height calc(100vh - 20px)
  div.data-viewer-fullscreen
    flex-exactly-to-parent(column)
    pre
      flex 1
      overflow auto
    header
      padding-right 30px
      h3
        one-liner-ellipsis()
</style>