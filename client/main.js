import Vue from 'vue'
import Router from 'vue-router'
import infiniteScroll from 'vue-infinite-scroll'
import AsyncComputed from 'vue-async-computed'
import vSelect from 'vue-select'
import DateRangePicker from './widgets/date-range-picker.vue'
import http from './http'

import App from './App.vue'
import Intro from './routes/Intro.vue'
import Workflows from './routes/Workflows.vue'
import History from './routes/History.vue'

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: Intro
  }, {
    name: 'workflows',
    path: '/domain/:domain/workflows',
    component: Workflows
  }, {
    name: 'history',
    path: '/domain/:domain/history',
    component: History
  }]
})

Object.getPrototypeOf(router).replaceQueryParam = function(prop, val) {
  var newQuery = Object.assign({}, this.currentRoute.query, { [prop]: val })
  if (!newQuery[prop]) {
    delete newQuery[prop]
  }
  this.replace({ query: newQuery })
}

Vue.mixin({
  created: function () {
    this.$http = http.global
  }
})

Vue.use(Router)
Vue.use(infiniteScroll)
Vue.use(AsyncComputed)
Vue.component('v-select', vSelect)
Vue.component('date-range-picker', DateRangePicker)

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