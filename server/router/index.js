// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const Router = require('koa-router');

const {
  clearCacheHandler,
  clusterHandler,
  domainAuthorizationHandler,
  domainHandler,
  domainListHandler,
  featureFlagHandler,
  healthHandler,
  tasklistHandler,
  tasklistPartitionListHandler,
  tasklistPollerListHandler,
  workflowArchivedListHandler,
  workflowExportHandler,
  workflowHandler,
  workflowHistoryHandler,
  workflowListHandler,
  workflowQueryHandler,
  workflowQueryTypeHandler,
  workflowSignalHandler,
  workflowTerminateHandler,
} = require('./routes');
const { ONE_HOUR_IN_MILLISECONDS } = require('./constants');
const { listWorkflows } = require('./helpers');
const { CacheManager } = require('./managers');
const { ClusterService, DomainService } = require('./services');

const router = new Router();

const clusterCacheManager = new CacheManager(ONE_HOUR_IN_MILLISECONDS);
const clusterService = new ClusterService(clusterCacheManager);

const domainCacheManager = new CacheManager(ONE_HOUR_IN_MILLISECONDS);
const domainService = new DomainService(domainCacheManager);

router.get('/api/cluster', clusterHandler(clusterService));

router.delete('/api/cluster/cache', clearCacheHandler(clusterCacheManager));

router.get('/api/domains', domainListHandler(domainService));

router.delete('/api/domains/cache', clearCacheHandler(domainCacheManager));

router.get('/api/domains/:domain', domainHandler);

/**
 * Override this route to perform authorization check
 * on current user & domain they are accessing.
 *
 * Example:
 *
 * router.get('/api/domains/:domain/authorization', () => {
 *  const { domain } = ctx.params;
 *
 *  ctx.body = {
 *    // use whatever system authorization checks needed here.
 *    authorization: db.isUserAuthorizedForDomain(domain),
 *  };
 * })
 */
router.get('/api/domains/:domain/authorization', domainAuthorizationHandler);

router.get(
  '/api/domains/:domain/workflows/all',
  listWorkflows.bind(null, { clusterService, state: 'all' })
);

router.get(
  '/api/domains/:domain/workflows/open',
  listWorkflows.bind(null, { clusterService, state: 'open' })
);

router.get(
  '/api/domains/:domain/workflows/closed',
  listWorkflows.bind(null, { clusterService, state: 'closed' })
);

router.get(
  '/api/domains/:domain/workflows/archived',
  workflowArchivedListHandler
);

router.get('/api/domains/:domain/workflows/list', workflowListHandler);

router.get(
  '/api/domains/:domain/workflows/:workflowId/:runId/history',
  workflowHistoryHandler
);

router.get(
  '/api/domains/:domain/workflows/:workflowId/:runId/export',
  workflowExportHandler
);

router.get(
  '/api/domains/:domain/workflows/:workflowId/:runId/query',
  workflowQueryHandler
);

router.post(
  '/api/domains/:domain/workflows/:workflowId/:runId/query/:queryType',
  workflowQueryTypeHandler
);

router.post(
  '/api/domains/:domain/workflows/:workflowId/:runId/terminate',
  workflowTerminateHandler
);

router.post(
  '/api/domains/:domain/workflows/:workflowId/:runId/signal/:signal',
  workflowSignalHandler
);

router.get(
  '/api/domains/:domain/workflows/:workflowId/:runId',
  workflowHandler
);

router.get(
  '/api/domains/:domain/task-lists/:taskList/pollers',
  tasklistPollerListHandler
);

router.get(
  '/api/domains/:domain/task-lists/:taskList/partitions',
  tasklistPartitionListHandler
);

router.get('/api/feature-flags/:key', featureFlagHandler);

router.get('/api/domains/:domain/task-lists/:taskListName', tasklistHandler);

router.get('/health', healthHandler);

module.exports = router;
