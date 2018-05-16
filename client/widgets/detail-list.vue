<script>
const jsonKeys = ['result', 'input'],
      preKeys = jsonKeys.concat(['stackTrace', 'details.stackTrace'])

export default {
  name: 'details-list',
  props: ['item'],
  data() {
    return {}
  },
  computed: {
    kvps() {
      var kvps = []

      function flatten(prefix, obj, root) {
        Object.entries(obj).forEach(([k, value]) => {
          var key = prefix ? `${prefix}.${k}` : k
          if (value && typeof value === 'object' && !jsonKeys.includes(key)) {
            flatten(key, value, root)
          } else if (key === 'newExecutionRunId') {
            kvps.push({ key, value, routeLink: {
              name: 'execution/history', params: { runId: value } }
            })
          } else if (key === 'parentWorkflowExecution.runId') {
            kvps.push({ key, value, routeLink: {
              name: 'execution/history',
              params: {
                domain: root.parentWorkflowDomain,
                workflowId: root.parentWorkflowExecution.workflowId,
                runId: value,
              }
            }})
          } else if (key === 'taskList.name') {
            kvps.push({ key, value, routeLink: {
              name: 'task-list', params: { taskList: value } }
            })
          } else if (value) {
            kvps.push({ key, value })
          }
        })
      }

      flatten('', this.item || {}, this.item)
      return kvps
    }
  },
  methods: {
    format(val) {
      return val == null ? '' : (String(val) || '""')
    }
  },
  render(h) {
    return h('dl', { class: 'details' }, this.kvps.map(kvp => h('div', { attrs: { 'data-prop': kvp.key } }, [
      h('dt', null, kvp.key),
      h('dd', null, kvp.routeLink ?
        [h('router-link', { props: { to: kvp.routeLink } }, kvp.value)]
        : (preKeys.includes(kvp.key) ?
          [h('pre', null, JSON.stringify(kvp.value, null, 2))] :
          kvp.value))
    ])))
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