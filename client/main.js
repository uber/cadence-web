import Vue from 'vue';
import Router from 'vue-router';
import infiniteScroll from 'vue-infinite-scroll';
import vueSelect from 'vue-select';
import vueModal from 'vue-js-modal';
import vueSplit from 'vue-split-panel';
import qs from 'friendly-querystring';
import moment from 'moment';
import promiseFinally from 'promise.prototype.finally';

import { http, injectMomentDurationFormat, jsonTryParse } from './helpers';

import DateRangePicker from './widgets/date-range-picker.vue';
import detailList from './widgets/detail-list.vue';
import barLoader from './widgets/bar-loader.vue';
import dataViewer from './widgets/data-viewer.vue';
import copyButton from './widgets/copy.vue';

import snapscroll from './directives/snapscroll';

import App from './App.vue';
import Intro from './routes/Intro.vue';
import Workflows from './routes/Workflows.vue';
import DomainConfig from './routes/domain-config.vue';
import ExecutionTabs from './routes/execution/index.vue';
import ExecutionSummary from './routes/execution/summary.vue';
import History from './routes/execution/history.vue';
import StackTrace from './routes/execution/stack-trace.vue';
import Queries from './routes/execution/queries.vue';
import TaskList from './routes/task-list.vue';

const routeOpts = {
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Intro,
    },
    {
      name: 'workflows',
      path: '/domain/:domain/workflows',
      component: Workflows,
    },
    {
      name: 'domain-config',
      path: '/domain/:domain/config',
      component: DomainConfig,
      props: ({ params }) => ({
        domain: params.domain,
      }),
    },
    {
      name: 'execution',
      path: '/domain/:domain/workflows/:workflowId/:runId',
      component: ExecutionTabs,
      props: ({ params }) => ({
        domain: params.domain,
        runId: params.runId,
        workflowId: params.workflowId,
      }),
      children: [
        {
          name: 'execution/summary',
          path: '/domain/:domain/workflows/:workflowId/:runId/summary',
          components: {
            summary: ExecutionSummary,
          },
          props: {
            summary: ({ params }) => ({
              runId: params.runId,
              workflowId: params.workflowId,
            }),
          },
        },
        {
          name: 'execution/history',
          path: '/domain/:domain/workflows/:workflowId/:runId/history',
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
          name: 'execution/stack-trace',
          path: '/domain/:domain/workflows/:workflowId/:runId/stack-trace',
          components: {
            stacktrace: StackTrace,
          },
        },
        {
          name: 'execution/queries',
          path: '/domain/:domain/workflows/:workflowId/:runId/queries',
          components: {
            queries: Queries,
          },
        },
      ],
    },
    {
      name: 'task-list',
      path: '/domain/:domain/task-lists/:taskList',
      component: TaskList,
    },
    {
      path: '/domain/:domain/history',
      redirect: ({ params, query }) => {
        if (!query.runId || !query.workflowId) {
          return {
            name: 'workflows',
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
          name: 'execution/history',
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
Vue.component('date-range-picker', DateRangePicker);
Vue.component('copy', copyButton);
Vue.component('bar-loader', barLoader);
Vue.component('data-viewer', dataViewer);
Vue.component('details-list', detailList);
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
