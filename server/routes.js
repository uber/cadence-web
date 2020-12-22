// Copyright (c) 2017-2020 Uber Technologies Inc.
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

const Router = require('koa-router'),
  router = new Router(),
  moment = require('moment'),
  Long = require('long'),
  losslessJSON = require('lossless-json'),
  featureFlags = require('./feature-flags.json'),
  momentToLong = m => Long.fromValue(m.unix()).mul(1000000000);

router.get('/api/domains', async function(ctx) {
  ctx.body = await ctx.cadence.listDomains({
    pageSize: 50,
    nextPageToken: ctx.query.nextPageToken
      ? Buffer.from(ctx.query.nextPageToken, 'base64')
      : undefined,
  });
});

router.get('/api/domains/:domain', async function(ctx) {
  ctx.body = await ctx.cadence.describeDomain({ name: ctx.params.domain });
});

async function listWorkflows(state, ctx) {
  const q = ctx.query || {},
    startTime = moment(q.startTime || NaN),
    endTime = moment(q.endTime || NaN);

  ctx.assert(startTime.isValid() && endTime.isValid(), 400);

  ctx.body = await ctx.cadence[state + 'Workflows']({
    StartTimeFilter: {
      earliestTime: momentToLong(startTime),
      latestTime: momentToLong(endTime),
    },
    typeFilter: q.workflowName ? { name: q.workflowName } : undefined,
    executionFilter: q.workflowId ? { workflowId: q.workflowId } : undefined,
    statusFilter: q.status || undefined,
    nextPageToken: q.nextPageToken
      ? Buffer.from(q.nextPageToken, 'base64')
      : undefined,
  });
}

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
router.get('/api/domains/:domain/authorization', async function(ctx, next) {
  ctx.body = {
    authorization: true,
  };

  next();
});

router.get(
  '/api/domains/:domain/workflows/open',
  listWorkflows.bind(null, 'open')
);
router.get(
  '/api/domains/:domain/workflows/closed',
  listWorkflows.bind(null, 'closed')
);

const buildQueryString = (
  startTime,
  endTime,
  { status, workflowId, workflowName }
) =>
  [
    `CloseTime >= "${startTime.toISOString()}"`,
    `CloseTime <= "${endTime.toISOString()}"`,
    status && `CloseStatus = "${status}"`,
    workflowId && `WorkflowID = "${workflowId}"`,
    workflowName && `WorkflowType = "${workflowName}"`,
  ]
    .filter(subQuery => !!subQuery)
    .join(' and ');

router.get('/api/domains/:domain/workflows/archived', async function(ctx) {
  const { nextPageToken, ...query } = ctx.query || {};
  let queryString;

  if (query.queryString) {
    queryString = query.queryString;
  } else {
    const startTime = moment(query.startTime || NaN);
    const endTime = moment(query.endTime || NaN);

    ctx.assert(startTime.isValid() && endTime.isValid(), 400);
    queryString = buildQueryString(startTime, endTime, query);
  }

  ctx.body = await ctx.cadence.archivedWorkflows({
    query: queryString,
    nextPageToken: nextPageToken
      ? Buffer.from(nextPageToken, 'base64')
      : undefined,
  });
});

router.get('/api/domains/:domain/workflows/list', async function(ctx) {
  const q = ctx.query || {};

  ctx.body = await ctx.cadence.listWorkflows({
    query: q.queryString || undefined,
    nextPageToken: q.nextPageToken
      ? Buffer.from(q.nextPageToken, 'base64')
      : undefined,
  });
});

function replacer(key, value) {
  if (value && value.type && value.type === 'Buffer') {
    return Buffer.from(value)
      .toString()
      .replace(/["]/g, '')
      .trim();
  }

  return value;
}

const mapHistoryResponse = history => {
  if (Array.isArray(history && history.events)) {
    return history.events.map(e => {
      const attr = e.eventType
        ? e.eventType.charAt(0).toLowerCase() +
          e.eventType.slice(1) +
          'EventAttributes'
        : '';

      const details = e[attr] && JSON.parse(JSON.stringify(e[attr]), replacer);

      return {
        timestamp: e.timestamp,
        eventType: e.eventType,
        eventId: e.eventId,
        details,
      };
    });
  }
};

router.get(
  '/api/domains/:domain/workflows/:workflowId/:runId/history',
  async function(ctx) {
    const q = ctx.query || {};

    ctx.body = await ctx.cadence.getHistory({
      nextPageToken: q.nextPageToken
        ? Buffer.from(q.nextPageToken, 'base64')
        : undefined,
      waitForNewEvent: 'waitForNewEvent' in q ? true : undefined,
    });

    ctx.body.history.events = mapHistoryResponse(ctx.body.history);
  }
);

router.get(
  '/api/domains/:domain/workflows/:workflowId/:runId/export',
  async function(ctx) {
    let nextPageToken;

    do {
      const page = await ctx.cadence.exportHistory({ nextPageToken });

      if (!nextPageToken) {
        ctx.status = 200;
      }

      ctx.res.write(
        (nextPageToken ? ',' : '[') +
          page.history.events.map(losslessJSON.stringify).join(',')
      );
      nextPageToken =
        page.nextPageToken && Buffer.from(page.nextPageToken, 'base64');
    } while (nextPageToken);

    ctx.res.write(']');
    ctx.body = '';
  }
);

router.get(
  '/api/domains/:domain/workflows/:workflowId/:runId/query',
  async function(ctx) {
    // workaround implementation until https://github.com/uber/cadence/issues/382 is resolved
    try {
      await ctx.cadence.queryWorkflow({
        query: {
          queryType: '__cadence_web_list',
        },
      });

      ctx.throw(500);
    } catch (e) {
      ctx.body = ((e.message || '').match(
        /(KnownQueryTypes|knownTypes)=\[(.*)\]/
      ) || [null, null, ''])[2]
        .split(/, | /)
        .filter(q => q);
    }
  }
);

router.post(
  '/api/domains/:domain/workflows/:workflowId/:runId/query/:queryType',
  async function(ctx) {
    ctx.body = await ctx.cadence.queryWorkflow({
      query: {
        queryType: ctx.params.queryType,
      },
    });
  }
);

router.post(
  '/api/domains/:domain/workflows/:workflowId/:runId/terminate',
  async function(ctx) {
    ctx.body = await ctx.cadence.terminateWorkflow({
      reason: ctx.request.body && ctx.request.body.reason,
    });
  }
);

router.post(
  '/api/domains/:domain/workflows/:workflowId/:runId/signal/:signal',
  async function(ctx) {
    ctx.body = await ctx.cadence.signalWorkflow({
      signalName: ctx.params.signal,
    });
  }
);

router.get('/api/domains/:domain/workflows/:workflowId/:runId', async function(
  ctx
) {
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
});

router.get('/api/domains/:domain/task-lists/:taskList/pollers', async function(
  ctx
) {
  const descTaskList = async taskListType =>
    (
      await ctx.cadence.describeTaskList({
        domain: ctx.params.domain,
        taskList: { name: ctx.params.taskList },
        taskListType,
      })
    ).pollers || [];

  const r = type => (o, poller) => {
    const i = o[poller.identity] || {};

    o[poller.identity] = {
      lastAccessTime:
        !i.lastAccessTime || i.lastAccessTime < poller.lastAccessTime
          ? poller.lastAccessTime
          : i.lastAccessTime,
      taskListTypes: i.taskListTypes ? i.taskListTypes.concat([type]) : [type],
    };

    return o;
  };

  const activityL = await descTaskList('Activity'),
    decisionL = await descTaskList('Decision');

  ctx.body = activityL.reduce(
    r('activity'),
    decisionL.reduce(r('decision'), {})
  );
});

router.get(
  '/api/domains/:domain/task-lists/:taskList/partitions',
  async function(ctx) {
    const { domain, taskList } = ctx.params;

    ctx.body = await ctx.cadence.listTaskListPartitions({
      domain,
      taskList: { name: taskList },
    });
  }
);

router.get('/api/feature-flags/:key', (ctx, next) => {
    const {
        params: { key },
    } = ctx;
    const featureFlag = featureFlags.find(featureFlag => featureFlag.key === key);
    const value = (featureFlag && featureFlag.value) || false;

    ctx.body = {
        key,
        value,
    };

    next();
});

router.get('/api/domain/:domain/task-lists/:taskListName', async function(
  ctx
) {
  const { domain, taskListName } = ctx.params;
  const descTaskList = async (taskListType) =>
    await ctx.cadence.describeTaskList({
      domain,
      taskList: { name: taskListName },
      taskListType,
    });

  const activityList = await descTaskList('Activity');
  const decisionList = await descTaskList('Decision');
  const activityPollerList = activityList.pollers || [];
  const decisionPollerList = decisionList.pollers || [];

  const taskList = { pollers: [...activityPollerList, ...decisionPollerList] };
  ctx.body = taskList;
});

router.get('/api/web-settings', (ctx) => {
  ctx.body = {
    health: 'OK',
    permitWriteApi: utils.isWriteApiPermitted(),
  };
});

router.get('/health', ctx => (ctx.body = 'OK'));

module.exports = router;
