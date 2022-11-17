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

const formatDurationToSeconds = require('./format-duration-to-seconds');
const formatEnum = require('./format-enum');
const formatHistoryEventDetails = require('./format-history-event-details');
const formatHistoryEventType = require('./format-history-event-type');
const formatResponseDefault = require('./format-response-default');
const formatResponseDescribeTaskList = require('./format-response-describe-task-list');
const formatResponseDescribeWorkflow = require('./format-response-describe-workflow');
const formatResponseDomain = require('./format-response-domain');
const formatResponseExportHistory = require('./format-response-export-history');
const formatResponseGetHistory = require('./format-response-get-history');
const formatResponseListDomains = require('./format-response-list-domains');
const formatResponseQueryWorkflow = require('./format-response-query-workflow');
const formatResponseSignalWorkflowExecution = require('./format-response-signal-workflow-execution');
const formatResponseTerminateWorkflowExecution = require('./format-response-terminate-workflow-execution');
const formatResponseWorkflowList = require('./format-response-workflow-list');
const formatTimestampToDatetime = require('./format-timestamp-to-datetime');
const formatTimestampToLong = require('./format-timestamp-to-long');

module.exports = {
  formatDurationToSeconds,
  formatEnum,
  formatHistoryEventDetails,
  formatHistoryEventType,
  formatResponseDefault,
  formatResponseDescribeTaskList,
  formatResponseDescribeWorkflow,
  formatResponseDomain,
  formatResponseExportHistory,
  formatResponseGetHistory,
  formatResponseListDomains,
  formatResponseQueryWorkflow,
  formatResponseSignalWorkflowExecution,
  formatResponseTerminateWorkflowExecution,
  formatResponseWorkflowList,
  formatTimestampToDatetime,
  formatTimestampToLong,
};
