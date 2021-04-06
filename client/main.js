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

import Vue from 'vue';
import Router from 'vue-router';
import infiniteScroll from 'vue-infinite-scroll';
import vueSelect from 'vue-select';
import vueModal from 'vue-js-modal';
import vueSplit from 'vue-split-panel';
import { sync } from 'vuex-router-sync';
import qs from 'friendly-querystring';
import moment from 'moment';
import promiseFinally from 'promise.prototype.finally';

import copyButton from './components/copy';

import snapscroll from './directives/snapscroll';

import App from './App';
import Domain from './routes/domain';
import DomainList from './routes/domain-list';
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
import WorkflowList from './routes/domain/workflow-list';
import WorkflowSummary from './routes/workflow/summary';
import initStore from './store';
import {
  Workflow,
  WorkflowHistory,
  WorkflowPending,
} from '~containers';

import { http, injectMomentDurationFormat, jsonTryParse } from '~helpers';

const routeOpts = {
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/domains',
      component: Root,
      children: [
        {
          name: 'domain-list',
          path: '/domains',
          components: {
            'domain-list': DomainList,
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
      path: '/domains/:domain',
      redirect: '/domains/:domain/workflows',
      component: Domain,
      props: ({ params }) => ({
        domain: params.domain,
      }),
      children: [
        {
          name: 'workflow-list',
          path: '/domains/:domain/workflows',
          components: {
            'workflow-list': WorkflowList,
          },
        },
        {
          name: 'domain-metrics',
          path: '/domains/:domain/metrics',
          components: {
            'domain-metrics': DomainMetrics,
          },
        },
        {
          name: 'domain-settings',
          path: '/domains/:domain/settings',
          components: {
            'domain-settings': DomainSettings,
          },
        },
        {
          name: 'workflow-archival',
          path: '/domains/:domain/archival',
          redirect: '/domains/:domain/archival/basic',
          components: {
            'workflow-archival': WorkflowArchival,
          },
          children: [
            {
              name: 'workflow-archival-advanced',
              path: '/domains/:domain/archival/advanced',
              components: {
                'workflow-archival-advanced': WorkflowArchivalAdvanced,
              },
            },
            {
              name: 'workflow-archival-basic',
              path: '/domains/:domain/archival/basic',
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
      path: '/domains/:domain/workflows/:workflowId/:runId',
      component: Workflow,
      props: ({ params }) => ({
        displayWorkflowId: params.workflowId,
        domain: params.domain,
        runId: params.runId,
        workflowId: encodeURIComponent(params.workflowId),
      }),
      children: [
        {
          name: 'workflow/summary',
          path: '/domains/:domain/workflows/:workflowId/:runId/summary',
          components: {
            summary: WorkflowSummary,
          },
          props: {
            summary: ({ params }) => ({
              runId: params.runId,
              workflowId: encodeURIComponent(params.workflowId),
            }),
          },
        },
        {
          name: 'workflow/history',
          path: '/domains/:domain/workflows/:workflowId/:runId/history',
          components: {
            history: WorkflowHistory,
          },
          props: {
            history: ({ params, query }) => ({
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
          path: '/domains/:domain/workflows/:workflowId/:runId/pending',
          components: {
            pending: WorkflowPending,
          },
        },
        {
          name: 'workflow/stack-trace',
          path: '/domains/:domain/workflows/:workflowId/:runId/stack-trace',
          components: {
            stacktrace: StackTrace,
          },
        },
        {
          name: 'workflow/query',
          path: '/domains/:domain/workflows/:workflowId/:runId/query',
          components: {
            query: Query,
          },
        },
      ],
    },
    {
      name: 'task-list',
      path: '/domains/:domain/task-lists/:taskList',
      redirect: '/domains/:domain/task-lists/:taskList/pollers',
      component: TaskList,
      props: ({ params }) => ({
        domain: params.domain,
        taskList: params.taskList,
      }),
      children: [
        {
          name: 'task-list/pollers',
          path: '/domains/:domain/task-lists/:taskList/pollers',
          components: {
            pollers: TaskListPollers,
          },
        },
        {
          name: 'task-list/partition',
          path: '/domains/:domain/task-lists/:taskList/partition',
          components: {
            partition: TaskListPartition,
          },
        },
        {
          name: 'task-list/metrics',
          path: '/domains/:domain/task-lists/:taskList/metrics',
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
      path: '/domains/:domain/config',
      redirect: '/domains/:domain/settings',
    },
    {
      path: '/domains/:domain/history',
      redirect: ({ params, query }) => {
        if (!query.runId || !query.workflowId) {
          return {
            name: 'workflow-list',
            params,
          };
        }

        const { runId, workflowId, ...queryWhitelist } = query;

        const newParams = {
          runId,
          workflowId,
          domain: params.domain,
        };

        return {
          name: 'workflow/history',
          params: newParams,
          query: queryWhitelist,
        };
      },
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

Vue.mixin({
  created() {
    this.$moment = moment;

    if (typeof Scenario === 'undefined') {
      this.$http = http.global;
    } else if (this.$parent && this.$parent.$http) {
      this.$http = this.$parent.$http;
    }
  },
});

Vue.use(Router);
Vue.use(infiniteScroll);
Vue.use(vueModal, {
  dialog: true,
  dynamic: true,
});
Vue.use(vueSplit);
Vue.component('v-select', vueSelect);
Vue.component('copy', copyButton);
Vue.directive('snapscroll', snapscroll);
Vue.config.ignoredElements = ['loader'];

if (typeof mocha === 'undefined') {
  if (!document.querySelector('main')) {
    document.body.appendChild(document.createElement('main'));
  }

  const store = initStore({ router });

  sync(store, router);

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
