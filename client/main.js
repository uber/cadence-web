import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import Vue from 'vue'
import Router from 'vue-router'
import infiniteScroll from 'vue-infinite-scroll'
import vueSelect from 'vue-select'
import vueModal from 'vue-js-modal'
import vueSplit from 'vue-split-panel'
import qs from 'friendly-querystring'
import http from './http'
import moment from 'moment'
import promiseFinally from 'promise.prototype.finally'

import DateRangePicker from './widgets/date-range-picker.vue'
import detailList from './widgets/detail-list.vue'
import barLoader from './widgets/bar-loader.vue'
import dataViewer from './widgets/data-viewer.vue'
import copyButton from './widgets/copy.vue'

import snapscroll from './directives/snapscroll'

import App from './App.vue'
import Intro from './routes/Intro.vue'
import Workflows from './routes/Workflows.vue'
import DomainConfig from './routes/domain-config.vue'
import ExecutionTabs from './routes/execution/index.vue'
import ExecutionSummary from './routes/execution/summary.vue'
import History from './routes/execution/history.vue'
import StackTrace from './routes/execution/stack-trace.vue'
import Queries from './routes/execution/queries.vue'
import TaskList from './routes/task-list.vue'

const routeOpts = {
  mode: 'history',
  routes: [{
    path: '/',
    component: Intro
  }, {
    name: 'workflows',
    path: '/domain/:domain/workflows',
    component: Workflows
  }, {
    name: 'domain-config',
    path: '/domain/:domain/config',
    component: DomainConfig
  }, {
    name: 'execution',
    path: '/domain/:domain/workflows/:workflowId/:runId',
    component: ExecutionTabs,
    children: [{
      name: 'execution/summary',
      path: '/domain/:domain/workflows/:workflowId/:runId/summary',
      component: ExecutionSummary
    }, {
      name: 'execution/history',
      path: '/domain/:domain/workflows/:workflowId/:runId/history',
      component: History,
      props: ({ query }) => ({
        format: query.format || 'grid',
        eventId: Number(query.eventId) || undefined
      })
    }, {
      name: 'execution/stack-trace',
      path: '/domain/:domain/workflows/:workflowId/:runId/stack-trace',
      component: StackTrace
    }, {
      name: 'execution/queries',
      path: '/domain/:domain/workflows/:workflowId/:runId/queries',
      component: Queries
    }]
  }, {
    name: 'task-list',
    path: '/domain/:domain/task-lists/:taskList',
    component: TaskList
  }, {
    path: '/domain/:domain/history',
    redirect: ({ params, query }) => {
      if (!query.runId || !query.workflowId) {
        return { name: 'workflows', params }
      }

      var newParams = {
        runId: query.runId,
        workflowId: query.workflowId,
        domain: params.domain
      }
      delete query.runId
      delete query.workflowId

      return {
        name: 'execution/history',
        params: newParams,
        query
      }
    }
  }],
  parseQuery: qs.parse.bind(qs),
  stringifyQuery: query => {
    let q = qs.stringify(query)
    return q ? ('?' + q) : ''
  }
}

const router = new Router(routeOpts)

Object.getPrototypeOf(router).replaceQueryParam = function(prop, val) {
  var newQuery = Object.assign({}, this.currentRoute.query, { [prop]: val })
  if (!newQuery[prop]) {
    delete newQuery[prop]
  }
  this.replace({ query: newQuery })
}

Object.getPrototypeOf(moment.duration(2, 'seconds')).format = function() {
  return this.toString().toLowerCase()
    .replace(/[pt]/g, '')
    .replace(/([hmd])/g, '$1 ')
    .replace(/\.\d{1,3}s/, 's')
    .replace('0d ', '')
    .trim()
}

JSON.tryParse = function() {
  try {
    return JSON.parse.apply(this, arguments)
  } catch (e) {}
}

promiseFinally.shim()

Vue.mixin({
  created: function () {
    this.$moment = moment
    if (typeof Scenario === 'undefined') {
      this.$http = http.global
    } else if (this.$parent && this.$parent.$http) {
      this.$http = this.$parent.$http
    }
  }
})

Vue.use(Router)
Vue.use(infiniteScroll)
Vue.use(vueModal, { dynamic: true, dialog: true })
Vue.use(vueSplit)
Vue.component('v-select', vueSelect)
Vue.component('date-range-picker', DateRangePicker)
Vue.component('copy', copyButton)
Vue.component('bar-loader', barLoader)
Vue.component('data-viewer', dataViewer)
Vue.component('details-list', detailList)
Vue.directive('snapscroll', snapscroll)
Vue.config.ignoredElements = ['loader']

if (typeof mocha === 'undefined') {
  if (!document.querySelector('main')) {
    document.body.appendChild(document.createElement('main'))
  }

  new Vue({
    el: 'main',
    router,
    template: '<App/>',
    components: { App }
  })

  if (module.hot) {
    module.hot.addStatusHandler(function(status) {
      if (status === 'apply') {
        document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
          const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`)
          link.href = nextStyleHref
        })
      }
    })
  }
}

export default { App, routeOpts }
