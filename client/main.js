// Copyright (c) 2017-2022 Uber Technologies Inc.
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

import Vue from 'vue';
import Router from 'vue-router';
import infiniteScroll from 'vue-infinite-scroll';
import vueModal from 'vue-js-modal';
import vueSplit from 'vue-split-panel';
import qs from 'friendly-querystring';
import promiseFinally from 'promise.prototype.finally';

import copyButton from './components/copy';

import snapscroll from './directives/snapscroll';

import App from './App';
import Domain from './routes/domain';
import DomainSearch from './routes/domain-search';
import DomainMetrics from './routes/domain/domain-metrics';
import DomainSettings from './routes/domain/domain-settings';
import Help from './routes/help';
import News from './routes/news';
import Query from './routes/workflow/query';
import Root from './routes';
import StackTrace from './routes/workflow/stack-trace';
import TaskList from './routes/task-list';
import TaskListMetrics from './routes/task-list/metrics';
import TaskListPartition from './routes/task-list/partition';
import TaskListPollers from './routes/task-list/pollers';
import WorkflowArchival from './routes/domain/workflow-archival';
import WorkflowArchivalAdvanced from './routes/domain/workflow-archival/advanced';
import WorkflowArchivalBasic from './routes/domain/workflow-archival/basic';
import WorkflowSummary from './routes/workflow/summary';
import initStore from './store';
import {
  Workflow,
  WorkflowHistory,
  WorkflowList,
  WorkflowPending,
} from '~containers';

import { injectMomentDurationFormat, jsonTryParse } from '~helpers';

const routeOpts = {
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/domains',
      component: Root,
      children: [
        {
          name: 'domain-search',
          path: '/domains',
          components: {
            'domain-search': DomainSearch,
          },
        },
        {
          name: 'help',
          path: '/help',
          components: {
            help: Help,
          },
        },
        {
          name: 'news',
          path: '/news/:year?/:month?/:date?/:article?',
          components: {
            news: News,
          },
          props: {
            news: ({ params: { article, date, month, year } }) => ({
              article,
              date,
              month,
              year,
            }),
          },
        },
      ],
    },
    {
      name: 'domain',
      path: '/domains/:domainList/:clusterList?',
      redirect: '/domains/:domainList/:clusterList?/workflows',
      component: Domain,
      props: ({ params }) => ({
        clusterList: params.clusterList,
        domainList: params.domainList,
      }),
      children: [
        {
          name: 'workflow-list',
          path: '/domains/:domainList/:clusterList?/workflows',
          components: {
            'workflow-list': WorkflowList,
          },
        },
        {
          name: 'domain-metrics',
          path: '/domains/:domainList/:clusterList?/metrics',
          components: {
            'domain-metrics': DomainMetrics,
          },
        },
        {
          name: 'domain-settings',
          path: '/domains/:domainList/:clusterList?/settings',
          components: {
            'domain-settings': DomainSettings,
          },
        },
        {
          name: 'workflow-archival',
          path: '/domains/:domainList/:clusterList?/archival',
          redirect: '/domains/:domainList/:clusterList?/archival/basic',
          components: {
            'workflow-archival': WorkflowArchival,
          },
          children: [
            {
              name: 'workflow-archival-advanced',
              path: '/domains/:domainList/:clusterList?/archival/advanced',
              components: {
                'workflow-archival-advanced': WorkflowArchivalAdvanced,
              },
            },
            {
              name: 'workflow-archival-basic',
              path: '/domains/:domainList/:clusterList?/archival/basic',
              components: {
                'workflow-archival-basic': WorkflowArchivalBasic,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'workflow',
      path:
        '/domains/:domainList/:clusterList?/workflows/domain/:domain/:clusterName?/workflow/:workflowId/:runId',
      component: Workflow,
      props: ({ params }) => ({
        clusterList: params.clusterList,
        clusterName: params.clusterName,
        domainList: params.domainList,
        displayWorkflowId: params.workflowId,
        domain: params.domain,
        runId: params.runId,
        workflowId: encodeURIComponent(params.workflowId),
      }),
      children: [
        {
          name: 'workflow/summary',
          path:
            '/domains/:domainList/:clusterList?/workflows/domain/:domain/:clusterName?/workflow/:workflowId/:runId/summary',
          components: {
            summary: WorkflowSummary,
          },
          props: {
            summary: ({ params }) => ({
              clusterName: params.clusterName,
              runId: params.runId,
              workflowId: encodeURIComponent(params.workflowId),
            }),
          },
        },
        {
          name: 'workflow/history',
          path:
            '/domains/:domainList/:clusterList?/workflows/domain/:domain/:clusterName?/workflow/:workflowId/:runId/history',
          components: {
            history: WorkflowHistory,
          },
          props: {
            history: ({ params, query }) => ({
              clusterName: params.clusterName,
              domain: params.domain,
              eventId: Number(query.eventId) || undefined,
              format: query.format || 'grid',
              runId: params.runId,
              showGraph: Boolean(query.showGraph) === true,
              graphView: query.graphView,
              workflowId: encodeURIComponent(params.workflowId),
            }),
          },
        },
        {
          name: 'workflow/pending',
          path:
            '/domains/:domainList/:clusterList?/workflows/domain/:domain/:clusterName?/workflow/:workflowId/:runId/pending',
          components: {
            pending: WorkflowPending,
          },
          props: {
            pending: ({ params }) => ({
              clusterName: params.clusterName,
            }),
          },
        },
        {
          name: 'workflow/stack-trace',
          path:
            '/domains/:domainList/:clusterList?/workflows/domain/:domain/:clusterName?/workflow/:workflowId/:runId/stack-trace',
          components: {
            stacktrace: StackTrace,
          },
          props: {
            stacktrace: ({ params }) => ({
              clusterName: params.clusterName,
            }),
          },
        },
        {
          name: 'workflow/query',
          path:
            '/domains/:domainList/:clusterList?/workflows/domain/:domain/:clusterName?/workflow/:workflowId/:runId/query',
          components: {
            query: Query,
          },
          props: {
            query: ({ params }) => ({
              clusterName: params.clusterName,
            }),
          },
        },
      ],
    },
    {
      name: 'task-list',
      path:
        '/domains/:domainList/:clusterList?/task-lists/domain/:domain/:clusterName?/task-list/:taskList',
      redirect:
        '/domains/:domainList/:clusterList?/task-lists/domain/:domain/:clusterName?/task-list/:taskList/pollers',
      component: TaskList,
      props: ({ params }) => ({
        clusterName: params.clusterName,
        domain: params.domain,
        taskList: params.taskList,
      }),
      children: [
        {
          name: 'task-list/pollers',
          path:
            '/domains/:domainList/:clusterList?/task-lists/domain/:domain/:clusterName?/task-list/:taskList/pollers',
          components: {
            pollers: TaskListPollers,
          },
        },
        {
          name: 'task-list/partition',
          path:
            '/domains/:domainList/:clusterList?/task-lists/domain/:domain/:clusterName?/task-list/:taskList/partition',
          components: {
            partition: TaskListPartition,
          },
        },
        {
          name: 'task-list/metrics',
          path:
            '/domains/:domainList/:clusterList?/task-lists/domain/:domain/:clusterName?/task-list/:taskList/metrics',
          components: {
            partition: TaskListMetrics,
          },
        },
      ],
    },

    // redirects

    {
      name: 'domains-redirect',
      path: '/domain/*',
      redirect: '/domains/*',
    },
    {
      name: 'domain-config-redirect',
      path: '/domains/:domainList/:clusterList?/config',
      redirect: '/domains/:domainList/:clusterList?/settings',
    },
  ],
  parseQuery: qs.parse.bind(qs),
  stringifyQuery: query => {
    const q = qs.stringify(query);

    return q ? `?${q}` : '';
  },
};

const router = new Router(routeOpts);

Object.getPrototypeOf(router).replaceQueryParam = function replaceQueryParam(
  prop,
  val
) {
  const newQuery = {
    ...this.currentRoute.query,
    [prop]: val,
  };

  if (!newQuery[prop]) {
    delete newQuery[prop];
  }

  this.replace({ query: newQuery });
};

injectMomentDurationFormat();

JSON.tryParse = jsonTryParse;

promiseFinally.shim();

Vue.use(Router);
Vue.use(infiniteScroll);
Vue.use(vueModal, {
  dialog: true,
  dynamic: true,
});
Vue.use(vueSplit);
Vue.component('copy', copyButton);
Vue.directive('snapscroll', snapscroll);
Vue.config.ignoredElements = ['loader'];

if (typeof mocha === 'undefined') {
  if (!document.querySelector('main')) {
    document.body.appendChild(document.createElement('main'));
  }

  const store = initStore({ router });

  // eslint-disable-next-line no-new
  new Vue({
    el: 'main',
    router,
    store,
    template: '<App/>',
    components: { App },
  });

  if (module.hot) {
    module.hot.addStatusHandler(status => {
      if (status === 'apply') {
        document
          .querySelectorAll('link[href][rel=stylesheet]')
          .forEach(link => {
            const nextStyleHref = link.href.replace(
              /(\?\d+)?$/,
              `?${Date.now()}`
            );

            // eslint-disable-next-line no-param-reassign
            link.href = nextStyleHref;
          });
      }
    });
  }
}

export default {
  App,
  routeOpts,
};
