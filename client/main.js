import Vue from 'vue'
import Router from 'vue-router'
import infiniteScroll from 'vue-infinite-scroll'
import vueSelect from 'vue-select'
import vueModal from 'vue-js-modal'
import qs from 'friendly-querystring'
import http from './http'
import moment from 'moment'

import DateRangePicker from './widgets/date-range-picker.vue'
import detailList from './widgets/detail-list.vue'
import barLoader from './widgets/bar-loader.vue'

import snapscroll from './directives/snapscroll'

import App from './App.vue'
import Intro from './routes/Intro.vue'
import Workflows from './routes/Workflows.vue'
import ExecutionTabs from './routes/execution/index.vue'
import ExecutionSummary from './routes/execution/summary.vue'
import History from './routes/execution/history.vue'
import StackTrace from './routes/execution/stack-trace.vue'

const routes = [{
  path: '/',
  component: Intro
}, {
  name: 'workflows',
  path: '/domain/:domain/workflows',
  component: Workflows
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
      format: query.format || 'grid'
    })
  }, {
    name: 'execution/stack-trace',
    path: '/domain/:domain/workflows/:workflowId/:runId/stack-trace',
    component: StackTrace
  }]
}]

const router = new Router({
  mode: 'history',
  routes,
  parseQuery: qs.parse.bind(qs),
  stringifyQuery: query => {
    let q = qs.stringify(query)
    return q ? '?' + q : ''
  },
})

Object.getPrototypeOf(router).replaceQueryParam = function(prop, val) {
  var newQuery = Object.assign({}, this.currentRoute.query, { [prop]: val })
  if (!newQuery[prop]) {
    delete newQuery[prop]
  }
  this.replace({ query: newQuery })
}

JSON.tryParse = function() {
  try {
    return JSON.parse.apply(this, arguments)
  } catch (e) {}
}

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
Vue.use(vueModal)
Vue.component('v-select', vueSelect)
Vue.component('date-range-picker', DateRangePicker)
Vue.component('details-list', detailList)
Vue.component('bar-loader', barLoader)
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

export default { App, routes }
