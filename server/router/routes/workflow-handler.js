const { mapHistoryResponse } = require('../helpers');

const workflowHandler = async (ctx) => {
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
