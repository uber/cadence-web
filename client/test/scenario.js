import Router from 'vue-router'
import Vue from 'vue'
import moment from 'moment'
import fetchMock from 'fetch-mock'
import qs from 'friendly-querystring'

import main from '../main'
import http from '../http'
import fixtures from './fixtures'


export default function Scenario(test) {
  test.scenario = this
  this.mochaTest = test
  this.api = fetchMock.sandbox().catch(function(url, req, opts) {
    var msg = `Unexpected request: ${url}${opts && opts.query ? '?' + opts.query : ''}`
    if (req.body) {
      msg += '\n' + req.body
    }
    mocha.throwError(new Error(msg))
  })
}

Scenario.prototype.isDebuggingJustThisTest = function() {
  return window.location.search.includes(encodeURIComponent(this.mochaTest.fullTitle()))
}

Scenario.prototype.render = function(attachToBody) {
  var $http = http.bind(null, this.api)
  $http.post = http.post.bind(null, this.api)

  this.router = new Router(Object.assign({}, main.routeOpts, { mode: 'abstract' }))
  this.router.push(this.initialUrl || '/')

  var el = document.createElement('div')
  if (attachToBody || this.isDebuggingJustThisTest()) {
    document.body.appendChild(el)
  }

  this.vm = new Vue({
    // vue just throws this away, not sure why
    el,
    router: this.router,
    template: '<App/>',
    components: { App: main.App },
    mixins: [{
      created: function() {
        this.$http = $http
      }
    }]
  })

  return this.vm.$el
}

Scenario.prototype.go = function() {
  return [this.render.apply(this, arguments), this]
}

Scenario.prototype.startingAt = function(url) {
  this.initialUrl = url
  return this
}

Scenario.prototype.tearDown = function() {
  if (this.vm && this.vm.$el && this.vm.$el.parentElement
    // as a convience, if debugging just this test, don't remove the test app
    && !this.isDebuggingJustThisTest()) {
    this.vm.$el.parentElement.removeChild(this.vm.$el)
  }
  delete Mocha.copiedText

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

Scenario.prototype.withDomain = function(domain) {
  this.domain = domain
  return this
}

Scenario.prototype.withWorkflows = function(status, query, workflows) {
  if (!workflows) {
    workflows = JSON.parse(JSON.stringify(fixtures.workflows[status]))
  }

  var url = `/api/domain/${this.domain}/workflows/${status}?${qs.stringify(Object.assign({
      startTime: moment().subtract(30, 'day').startOf('day').toISOString(),
      endTime: moment().endOf('day').toISOString(),
    }, query))}`

  var response = Array.isArray(workflows) ? { executions: workflows } : workflows

  this.api.getOnce(url, response)

  return this
}

Scenario.prototype.execApiBase = function(workflowId, runId) {
  return `/api/domain/${this.domain}/workflows/${encodeURIComponent(workflowId || this.workflowId)}/${encodeURIComponent(runId || this.runId)}`
}

Scenario.prototype.withExecution = function(workflowId, runId, description)  {
  this.workflowId = workflowId
  this.runId = runId

  this.api.getOnce(this.execApiBase(), Object.assign({
    executionConfiguration: {
      taskList: { name: 'ci_task_list' },
      executionStartToCloseTimeoutSeconds: 3600,
      taskStartToCloseTimeoutSeconds: 10,
      childPolicy: 'TERMINATE'
    },
    workflowExecutionInfo: {
      execution: { workflowId, runId },
      type: { name: 'CIDemoWorkflow' },
      startTime: moment().startOf('hour').subtract(2, 'minutes'),
      historyLength: 14
    }
  }, description || {}))

  return this
}

Scenario.prototype.withHistory = function(events, hasMorePages)  {
  if (!this.historyNpt) {
    this.historyNpt = {}
  }

  const makeToken = () => btoa(JSON.stringify({ NextEventId: this.historyNpt[this.runId], IsWorkflowRunning: true }))

  var url = `${this.execApiBase()}/history?waitForNewEvent=true`,
      response = Array.isArray(events) ? { history: { events } } : events

  if (this.historyNpt[this.runId]) {
    url += `&nextPageToken=${encodeURIComponent(makeToken())}`
  }

  if (hasMorePages) {
    this.historyNpt[this.runId] = (this.historyNpt[this.runId] || 0) + response.history.events.length + 1
    response.nextPageToken = makeToken()
  }

  this.api.getOnce(url, response)

  return this
}

Scenario.prototype.withFullHistory = function(events) {
  var events = JSON.parse(JSON.stringify(events || fixtures.history.emailRun1)),
      third = Math.floor(events.length / 3)

  return this.withHistory(events.slice(0, third), true)
    .withHistory(events.slice(third, third + third), true)
    .withHistory(events.slice(third + third))
}

Scenario.prototype.withQueries = function(queries) {
  this.api.getOnce(`${this.execApiBase()}/queries`, queries || ['__stack_trace', 'status'])
  return this
}

Scenario.prototype.withQueryResult = function(query, result) {
  this.api.postOnce(`${this.execApiBase()}/queries/${query}`, result && result.status ? result : { queryResult: result })
  return this
}

Scenario.prototype.withTaskListPollers = function(taskList, pollers) {
  this.api.getOnce(`/api/domain/${this.domain}/task-lists/${taskList}/pollers`, pollers || {
    node1: {
      lastAccessTime: moment().startOf('hour').add(5, 'minutes'),
      taskListTypes: ['decision', 'activity']
    },
    node2: {
      lastAccessTime: moment().startOf('hour').add(3, 'minutes'),
      taskListTypes: ['decision']
    },
    node3: {
      lastAccessTime: moment().startOf('hour').add(4, 'minutes'),
      taskListTypes: ['activity']
    }
  })
  return this
}

window.Scenario = Scenario