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

const clearCacheHandler = require('./clear-cache-handler');
const clusterHandler = require('./cluster-handler');
const domainAuthorizationHandler = require('./domain-authorization-handler');
const domainHandler = require('./domain-handler');
const domainListHandler = require('./domain-list-handler');
const featureFlagHandler = require('./feature-flag-handler');
const healthHandler = require('./health-handler');
const tasklistHandler = require('./tasklist-handler');
const tasklistPartitionListHandler = require('./tasklist-partition-list-handler');
const tasklistPollerListHandler = require('./tasklist-poller-list-handler');
const workflowArchivedListHandler = require('./workflow-archived-list-handler');
const workflowExportHandler = require('./workflow-export-handler');
const workflowHandler = require('./workflow-handler');
const workflowHistoryHandler = require('./workflow-history-handler');
const workflowListHandler = require('./workflow-list-handler');
const workflowQueryHandler = require('./workflow-query-handler');
const workflowQueryTypeHandler = require('./workflow-query-type-handler');
const workflowSignalHandler = require('./workflow-signal-handler');
const workflowTerminateHandler = require('./workflow-terminate-handler');

module.exports = {
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
};
