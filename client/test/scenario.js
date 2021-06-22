// Copyright (c) 2017-2021 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import Router from 'vue-router';
import Vue from 'vue';
import moment from 'moment';
import fetchMock from 'fetch-mock';
import qs from 'friendly-querystring';
import vueModal from 'vue-js-modal';
import deepmerge from 'deepmerge';

import main from '../main';
import initStore from '../store';
import { httpService } from '../services';
import fixtures from './fixtures';

export default function Scenario(test) {
  // eslint-disable-next-line no-param-reassign
  test.scenario = this;
  this.storeState = {};
  this.mochaTest = test;
  this.api = fetchMock.sandbox().catch((url, req, opts) => {
    let msg = `Unexpected request: ${url}${
      opts && opts.query ? `?${opts.query}` : ''
    }`;

    if (req.body) {
      msg += `\n${req.body}`;
    }

    mocha.throwError(new Error(msg));
  });
}

Scenario.prototype.isDebuggingJustThisTest = function isDebuggingJustThisTest() {
  return window.location.search.includes(
    encodeURIComponent(this.mochaTest.fullTitle())
  );
};

Scenario.prototype.render = function render(attachToBody) {
  httpService.setFetch(this.api);

  this.router = new Router({ ...main.routeOpts, mode: 'abstract' });
  this.router.push(this.initialUrl || '/');

  const el = document.createElement('div');

  const store = initStore({
    router: this.router,
    state: this.storeState,
  });

  if (attachToBody || this.isDebuggingJustThisTest()) {
    document.body.appendChild(el);
  }

  this.vm = new Vue({
    // vue just throws this away, not sure why
    el,
    router: this.router,
    store,
    template: '<App/>',
    components: { App: main.App },
  });

  vueModal.rootInstance = this.vm;

  return this.vm.$el;
};

Scenario.prototype.go = function go(...args) {
  return [this.render(...args), this];
};

Scenario.prototype.startingAt = function startingAt(url) {
  this.initialUrl = url;

  return this;
};

Scenario.prototype.tearDown = function tearDown() {
  if (
    this.vm &&
    this.vm.$el &&
    this.vm.$el.parentElement &&
    // as a convience, if debugging just this test, don't remove the test app
    !this.isDebuggingJustThisTest()
  ) {
    this.vm.$el.parentElement.removeChild(this.vm.$el);
  }

  delete window.Mocha.copiedText;

  const unmatched = this.api.calls(false);

  return unmatched.length
    ? Promise.reject(
        new Error(`${unmatched.length} outstanding expected API calls:
      ${unmatched
        .slice(0, 5)
        .map(([url]) => url)
        .join('\n')}`)
      )
    : Promise.resolve();
};

Object.defineProperty(Scenario.prototype, 'location', {
  get() {
    return this.router.history.getCurrentLocation();
  },
});

Scenario.prototype.withDomain = function withDomain(domain) {
  this.domain = domain;

  return this;
};

Scenario.prototype.withDomainSearch = function withDomainSearch() {
  this.api.getOnce(`/api/domains?querystring=ci-tests`, [
    {
      domainInfo: {
        name: 'ci-tests',
        status: 'REGISTERED',
        description: '',
        ownerEmail: '',
        data: {},
        uuid: '1',
      },
      configuration: {
        workflowExecutionRetentionPeriodInDays: 7,
        emitMetric: true,
        badBinaries: { binaries: {} },
        historyArchivalStatus: 'DISABLED',
        historyArchivalURI: '',
        visibilityArchivalStatus: 'DISABLED',
        visibilityArchivalURI: '',
      },
      replicationConfiguration: {
        activeClusterName: 'primary',
        clusters: [{ clusterName: 'primary' }],
      },
      failoverVersion: -24,
      isGlobalDomain: false,
    },
  ]);

  return this;
};

Scenario.prototype.withDomainAuthorization = function withDomainAuthorization(
  domain,
  authorization
) {
  this.api.getOnce(`/api/domains/${domain}/authorization`, {
    authorization,
  });

  return this;
};

Scenario.prototype.withDomainDescription = function withDomainDescription(
  domain,
  domainDesc
) {
  this.api.getOnce(
    `/api/domains/${domain}`,
    deepmerge(
      {
        domainInfo: {
          name: domain,
          status: 'REGISTERED',
          description: 'A cool domain',
          ownerEmail: 'ci-test@uber.com',
        },
        configuration: {
          workflowExecutionRetentionPeriodInDays: 21,
          emitMetric: true,
          historyArchivalStatus: 'ENABLED',
          visibilityArchivalStatus: 'DISABLED',
        },
        replicationConfiguration: {
          activeClusterName: 'ci-test-cluster',
          clusters: [
            {
              clusterName: 'ci-test-cluster',
            },
          ],
        },
        failoverVersion: 0,
        isGlobalDomain: false,
      },
      domainDesc || {}
    ),
    { overwriteRoutes: false }
  );

  return this;
};

Scenario.prototype.withFeatureFlags = function withFeatureFlags(
  featureFlags = JSON.parse(JSON.stringify(fixtures.featureFlags))
) {
  featureFlags.forEach(({ key, value }) => {
    this.api.getOnce(`/api/feature-flags/${key}`, {
      key,
      value,
    });
  });

  return this;
};

Scenario.prototype.withNewsFeed = function withNewsFeed() {
  this.api.getOnce('/feed.json', {
    version: 'https://jsonfeed.org/version/1',
    title: '',
    home_page_url: '/',
    feed_url: '/feed.json',
    items: [
      {
        id: '/_news/2019/05/05/writing-a-vuepress-theme-2/',
        url: '/_news/2019/05/05/writing-a-vuepress-theme-2/',
        title: 'Writing a VuePress theme',
        summary: 'To write a theme, create a .vuepress/theme directory ...',
        date_modified: '2019-05-06T00:00:00.000Z',
      },
      {
        id: '/_news/2019/02/25/markdown-slot-3/',
        url: '/_news/2019/02/25/markdown-slot-3/',
        title: 'Markdown Slot',
        summary:
          'VuePress implements a content distribution API for Markdown...',
        date_modified: '2019-02-26T00:00:00.000Z',
      },
    ],
  });

  return this;
};

Scenario.prototype.withEmptyNewsFeed = function withEmptyNewsFeed() {
  this.api.getOnce('/feed.json', {
    version: 'https://jsonfeed.org/version/1',
    title: '',
    home_page_url: '/',
    feed_url: '/feed.json',
    items: [],
  });

  return this;
};

Scenario.prototype.withStoreState = function withStoreState(state = {}) {
  this.storeState = state;

  return this;
};

Scenario.prototype.withWorkflows = function withWorkflows({
  status,
  query,
  workflows,
  startTimeOffset,
} = {}) {
  if (!workflows) {
    // eslint-disable-next-line no-param-reassign
    workflows = JSON.parse(JSON.stringify(fixtures.workflows[status]));
  }

  const startTimeDays = startTimeOffset || status === 'open' ? 30 : 21;
  const baseUrl = `/api/domains/${this.domain}/workflows/${status}`;
  const queryString = qs.stringify(
    status === 'list'
      ? query
      : {
          startTime: moment()
            .subtract(startTimeDays, 'day')
            .startOf('day')
            .toISOString(),
          endTime: moment()
            .endOf('day')
            .toISOString(),
          ...query,
        }
  );
  const url = `${baseUrl}?${queryString}`;
  const response = Array.isArray(workflows)
    ? { executions: workflows, nextPageToken: '' }
    : workflows;

  this.api.getOnce(url, response);

  return this;
};

Scenario.prototype.execApiBase = function execApiBase(workflowId, runId) {
  return `/api/domains/${this.domain}/workflows/${encodeURIComponent(
    workflowId || this.workflowId
  )}/${encodeURIComponent(runId || this.runId)}`;
};

Scenario.prototype.withWorkflow = function withWorkflow(
  workflowId,
  runId,
  description
) {
  this.workflowId = workflowId;
  this.runId = runId;

  this.api.get(this.execApiBase(), {
    executionConfiguration: {
      taskList: { name: 'ci_task_list' },
      executionStartToCloseTimeoutSeconds: 3600,
      taskStartToCloseTimeoutSeconds: 10,
      childPolicy: 'TERMINATE',
    },
    workflowExecutionInfo: {
      execution: { workflowId, runId },
      type: { name: 'CIDemoWorkflow' },
      startTime: moment()
        .startOf('hour')
        .subtract(2, 'minutes'),
      historyLength: 14,
    },
    ...(description || {}),
  });

  return this;
};

Scenario.prototype.withHistory = function withHistory(
  events,
  hasMorePages,
  options = {}
) {
  if (!this.historyNpt) {
    this.historyNpt = {};
  }

  const makeToken = () =>
    btoa(
      JSON.stringify({
        NextEventId: this.historyNpt[this.runId],
        IsWorkflowRunning: true,
      })
    );

  let url = `${this.execApiBase()}/history?waitForNewEvent=true`;
  const response = Array.isArray(events) ? { history: { events } } : events;

  if (this.historyNpt[this.runId]) {
    url += `&nextPageToken=${encodeURIComponent(makeToken())}`;
  }

  if (hasMorePages) {
    this.historyNpt[this.runId] =
      (this.historyNpt[this.runId] || 0) + response.history.events.length + 1;
    response.nextPageToken = makeToken();
  }

  this.api.getOnce(url, response, { delay: 100, ...options });

  return this;
};

Scenario.prototype.withFullHistory = function withFullHistory(events, options) {
  const parsedEvents = JSON.parse(
    JSON.stringify(events || fixtures.history.emailRun1)
  );
  const third = Math.floor(parsedEvents.length / 3);

  return this.withHistory(parsedEvents.slice(0, third), true, options)
    .withHistory(parsedEvents.slice(third, third + third), true, options)
    .withHistory(parsedEvents.slice(third + third), false, options);
};

Scenario.prototype.withQuery = function withQuery(query) {
  this.api.getOnce(
    `${this.execApiBase()}/query`,
    query || ['__stack_trace', 'status']
  );

  return this;
};

Scenario.prototype.withQueryResult = function withQueryResult(query, result) {
  this.api.postOnce(
    `${this.execApiBase()}/query/${query}`,
    result && result.status ? result : { queryResult: result }
  );

  return this;
};

Scenario.prototype.withWorkflowTermination = function withWorkflowTermination(
  workflowId,
  runId,
  reason
) {
  this.api.postOnce(`${this.execApiBase()}/terminate`, { reason });

  return this;
};

Scenario.prototype.withTaskListPollers = function withTaskListPollers(
  taskList,
  pollers
) {
  this.api.getOnce(
    `/api/domains/${this.domain}/task-lists/${taskList}/pollers`,
    pollers || {
      node1: {
        lastAccessTime: moment()
          .startOf('hour')
          .add(5, 'minutes'),
        taskListTypes: ['decision', 'activity'],
      },
      node2: {
        lastAccessTime: moment()
          .startOf('hour')
          .add(3, 'minutes'),
        taskListTypes: ['decision'],
      },
      node3: {
        lastAccessTime: moment()
          .startOf('hour')
          .add(4, 'minutes'),
        taskListTypes: ['activity'],
      },
    }
  );

  return this;
};

Scenario.prototype.withTaskList = function withTaskList(taskList, pollers) {
  this.api.get(`/api/domains/${this.domain}/task-lists/${taskList}`, {
    pollers: pollers || [
      {
        identity: 'identity1',
        lastAccessTime: moment()
          .startOf('hour')
          .add(5, 'minutes'),
        ratePerSecond: 100000,
      },
      {
        identity: 'identity2',
        lastAccessTime: moment()
          .startOf('hour')
          .add(3, 'minutes'),
        ratePerSecond: 100000,
      },
    ],
  });

  return this;
};

window.Scenario = Scenario;
