import Vue from 'vue';
import Router from 'vue-router';
import infiniteScroll from 'vue-infinite-scroll';
import vueSelect from 'vue-select';
import vueModal from 'vue-js-modal';
import vueSplit from 'vue-split-panel';
import qs from 'friendly-querystring';
import moment from 'moment';
import promiseFinally from 'promise.prototype.finally';

import copyButton from './components/copy.vue';

import snapscroll from './directives/snapscroll';

import App from './App.vue';
import Root from './routes/index.vue';
import Help from './routes/help/index.vue';
import DomainList from './routes/domain-list.vue';
import WorkflowList from './routes/domain/workflow-list.vue';
import DomainConfig from './routes/domain/domain-config.vue';
import WorkflowTabs from './routes/workflow/index.vue';
import WorkflowSummary from './routes/workflow/summary.vue';
import History from './routes/workflow/history.vue';
import StackTrace from './routes/workflow/stack-trace.vue';
import Query from './routes/workflow/query.vue';
import TaskList from './routes/domain/task-list.vue';
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
      ],
    },
    {
      name: 'domains-redirect',
      path: '/domain/*',
      redirect: '/domains/*',
    },
    {
      name: 'workflow-list',
      path: '/domains/:domain/workflows',
      component: WorkflowList,
    },
    {
      name: 'domain-config',
      path: '/domains/:domain/config',
      component: DomainConfig,
      props: ({ params }) => ({
        domain: params.domain,
      }),
    },
    {
      name: 'workflow',
      path: '/domains/:domain/workflows/:workflowId/:runId',
      component: WorkflowTabs,
      props: ({ params }) => ({
        domain: params.domain,
        runId: params.runId,
        workflowId: params.workflowId,
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
              workflowId: params.workflowId,
            }),
          },
        },
        {
          name: 'workflow/history',
          path: '/domains/:domain/workflows/:workflowId/:runId/history',
          components: {
            history: History,
          },
          props: {
            history: ({ params, query }) => ({
              domain: params.domain,
              eventId: Number(query.eventId) || undefined,
              format: query.format || 'grid',
              runId: params.runId,
              showGraph: query.showGraph === true,
              workflowId: params.workflowId,
            }),
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
      component: TaskList,
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

  // eslint-disable-next-line no-new
  new Vue({
    el: 'main',
    router,
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
