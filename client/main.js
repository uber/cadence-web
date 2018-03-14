import Vue from 'vue'
import Router from 'vue-router'
import infiniteScroll from 'vue-infinite-scroll'
import vSelect from 'vue-select'
import qs from 'friendly-querystring'
import http from './http'

import DateRangePicker from './widgets/date-range-picker.vue'
import detailList from './widgets/detail-list.vue'
import barLoader from './widgets/bar-loader.vue'

import snapscroll from './directives/snapscroll'

import App from './App.vue'
import Intro from './routes/Intro.vue'
import Workflows from './routes/Workflows.vue'
import History from './routes/History.vue'

const routes = [{
  path: '/',
  component: Intro
}, {
  name: 'workflows',
  path: '/domain/:domain/workflows',
  component: Workflows
}, {
  name: 'history',
  path: '/domain/:domain/history',
  component: History,
  props: ({ query }) => ({
    format: query.format || 'compact'
  })
}]

const router = new Router({
  mode: 'history',
  routes,
  parseQuery: qs.parse.bind(qs),
  stringifyQuery: q => `?${qs.stringify(q)}`,
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
    if (typeof Scenario === 'undefined') {
      this.$http = http.global
    } else if (this.$parent && this.$parent.$http) {
      this.$http = this.$parent.$http
    }
  }
})

Vue.use(Router)
Vue.use(infiniteScroll)
Vue.component('v-select', vSelect)
Vue.component('date-range-picker', DateRangePicker)
Vue.component('details-list', detailList)
Vue.component('bar-loader', barLoader)
Vue.directive('snapscroll', snapscroll)

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
