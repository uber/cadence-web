<template>
  <div class="data-viewer">
    <a
      href="#"
      class="view-full-screen"
      @click.stop.prevent="viewFullScreen"
    ></a>
    <prism v-if="highlight !== false" language="json" ref="codebox">{{
      item.jsonStringDisplay
    }}</prism>
    <pre v-if="highlight === false" ref="codebox">{{
      item.jsonStringDisplay
    }}</pre>
  </div>
</template>

<script>
import 'prismjs';
import 'prismjs/components/prism-json';
import Prism from 'vue-prism-component';

export default {
  name: 'data-viewer',
  props: ['compact', 'highlight', 'item', 'title'],
  data() {
    return {};
  },
  created() {
    this.checkOverflow = () => {
      const el = this.$refs.codebox;

      if (!el) {
        return;
      }

      const action =
        el.scrollWidth > el.offsetWidth + 2 ||
        el.scrollHeight > el.offsetHeight + 2
          ? 'add'
          : 'remove';

      this.$el.classList[action]('overflow');
    };
    window.addEventListener('resize', this.checkOverflow);
    ['item', 'highlight', 'compact'].forEach(e =>
      this.$watch(e, this.checkOverflow)
    );
    this.$watch(() => this.$route, this.checkOverflow);
  },
  mounted() {
    this.checkOverflow();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkOverflow);
  },
  methods: {
    viewFullScreen() {
      this.$modal.show(
        {
          components: { prism: Prism },
          props: ['code', 'title'],
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
        },
        {
          code: this.item.jsonStringFull,
          title: this.title,
        },
        {
          name: 'data-viewer-fullscreen',
        }
      );
    },
  },
  components: {
    prism: Prism,
  },
};
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
