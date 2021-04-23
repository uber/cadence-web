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
