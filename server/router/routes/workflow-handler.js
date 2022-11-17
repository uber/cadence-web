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

const { mapHistoryResponse } = require('../helpers');

const workflowHandler = async ctx => {
  try {
    const describeResponse = await ctx.cadence.describeWorkflow();

    if (describeResponse.workflowExecutionInfo) {
      describeResponse.workflowExecutionInfo.closeEvent = null;

      if (describeResponse.workflowExecutionInfo.closeStatus) {
        const closeEventResponse = await ctx.cadence.getHistory({
          HistoryEventFilterType: 'CLOSE_EVENT',
        });

        describeResponse.workflowExecutionInfo.closeEvent = mapHistoryResponse(
          closeEventResponse.history
        )[0];
      }
    }

    ctx.body = describeResponse;
  } catch (error) {
    if (error.name !== 'NotFoundError') {
      throw error;
    }

    const archivedHistoryResponse = await ctx.cadence.getHistory();
    const archivedHistoryEvents = mapHistoryResponse(
      archivedHistoryResponse.history
    );

    if (!archivedHistoryEvents.length) {
      throw error;
    }

    const { runId, workflowId } = ctx.params;

    const {
      timestamp: startTime,
      details: {
        taskList,
        executionStartToCloseTimeoutSeconds,
        taskStartToCloseTimeoutSeconds,
        workflowType: type,
      },
    } = archivedHistoryEvents[0];

    ctx.body = {
      executionConfiguration: {
        taskList,
        executionStartToCloseTimeoutSeconds,
        taskStartToCloseTimeoutSeconds,
      },
      workflowExecutionInfo: {
        execution: {
          runId,
          workflowId,
        },
        isArchived: true,
        startTime,
        type,
      },
      pendingActivities: null,
      pendingChildren: null,
    };
  }
};

module.exports = workflowHandler;
