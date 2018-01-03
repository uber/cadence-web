import Router from 'vue-router'
import Vue from 'vue'
import fetchMock from 'fetch-mock'

import main from '../main'
import http from '../http'
import fixtures from './fixtures'


export default function Scenario(test) {
  test.scenario = this
  this.api = fetchMock.sandbox().catch(function(url, req, opts) {
    var msg = `Unexpected request: ${url}${opts && opts.query ? '?' + opts.query : ''}`
    if (req.body) {
      msg += '\n' + req.body
    }
    mocha.throwError(new Error(msg))
  })
}

Scenario.prototype.render = function() {
  Scenario.http = http.bind(null, this.api)
  Scenario.http.post = http.post.bind(null, this.api)

  this.router = new Router({
    mode: 'abstract',
    routes: main.routes
  })
  this.router.push(this.initialUrl || '/')

  this.vm = new Vue({
    // vue just throws this away, not sure why
    el: document.createElement('div'),
    router: this.router,
    template: '<App/>',
    components: { App: main.App },
    mixins: [{
      created: function() {
        this.$dummy = 'dummy'
      }
    }]
  })

  /*this.el.addEventListener('click', e => {
    if (e.target && e.target.tagName === 'A') {
      var href = e.target.getAttribute('href')
      if (href && href.startsWith('/')) {
        e.preventDefault()
        this.el.history.push(href)
      }
    }
  })*/

  this.el = this.vm.$el
  return this.el
}

Scenario.prototype.go = function() {
  return [this.render(), this]
}

Scenario.prototype.tearDown = function() {
  if (this.el && this.el.parentElement) {
    this.el.parentElement.removeChild(this.el)
  }

  var { unmatched } = this.api.calls()
  return unmatched.length ?
    Promise.reject(new Error(`${unmatched.length} outstanding expected API calls:
      ${unmatched.slice(0,5).map(([url]) => url).join('\n')}`)) :
    Promise.resolve()
}

Object.defineProperty(Scenario.prototype, 'location', {
  get: function() {
    return this.router.history.getCurrentLocation()
  }
})

window.Scenario = Scenario