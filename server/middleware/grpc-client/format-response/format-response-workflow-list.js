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

const formatEnum = require('./format-enum');
const formatTimestampToDatetime = require('./format-timestamp-to-datetime');

const formatResponseWorkflowList = ({ executions, nextPageToken }) => ({
  executions: executions.map(
    ({
      closeStatus,
      closeTime,
      executionTime,
      historyLength,
      isCron,
      parentExecutionInfo,
      startTime,
      taskList,
      workflowExecution,
      ...execution
    }) => ({
      ...execution,
      closeStatus: formatEnum(closeStatus, 'WORKFLOW_EXECUTION_CLOSE_STATUS'),
      closeTime: formatTimestampToDatetime(closeTime),
      execution: workflowExecution,
      executionTime: formatTimestampToDatetime(executionTime),
      historyLength: historyLength === '' ? parseInt(historyLength) : null,
      isCron: isCron || null,
      parentDomainId: parentExecutionInfo?.domainId || null,
      parentExecution: parentExecutionInfo?.workflowExecution || null,
      startTime: formatTimestampToDatetime(startTime),
      taskList: taskList
        ? {
            kind: formatEnum(taskList?.kind, 'TASK_LIST_KIND'),
            name: taskList?.name || null,
          }
        : null,
    })
  ),
  nextPageToken,
});

module.exports = formatResponseWorkflowList;
