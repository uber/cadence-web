<script>
import DataViewer from './data-viewer';
import HighlightToggle from './highlight-toggle';
import { preKeys } from '~constants';

export default {
  name: 'detail-list',
  props: ['compact', 'highlight', 'item', 'title'],
  components: {
    'data-viewer': DataViewer,
    'highlight-toggle': HighlightToggle
  },
  data() {
    return {};
  },
  methods: {
    format(val) {
      return val === null ? '' : String(val) || '""';
    },
  },
  render(h) {
    const { highlight, compact, title } = this;

    function dd(kvp) {
      if (kvp.routeLink) {
        return [h('router-link', { props: { to: kvp.routeLink } }, kvp.value)];
      }

      return preKeys.includes(kvp.key)
        ? [
            h('data-viewer', {
              props: {
                item: kvp.value,
                compact,
                highlight,
                title: `${title} - ${kvp.key}`,
              },
            }),
          ]
        : kvp.value;
    }

    return h(
      'dl',
      { class: 'details' },
      this.item.kvps.map(kvp =>
        h('div', { attrs: { 'data-prop': kvp.key } }, [
          h('highlight-toggle', {
            props: {
              label: kvp.key,
              tag: 'dt',
            },
          }),
          h('dd', null, dd(kvp)),
        ])
      )
    );
  },
};
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
    one-liner-ellipsis()
</style>
