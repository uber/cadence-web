const
  Router = require('koa-router'),
  router = new Router(),
  moment = require('moment'),
  Long = require('long'),
  momentToLong = m => Long.fromValue(m.unix()).mul(1000000000)

router.get('/api/domain/:domain', async function (ctx) {
  const domainInfo = await ctx.cadence.describeDomain({ name: ctx.params.domain })
  if (domainInfo) {
    ctx.body = domainInfo.domainInfo
  }
})

async function listWorkflows(state, ctx) {
  var q = ctx.query || {},
      startTime = moment(q.startTime || NaN),
      endTime = moment(q.endTime || NaN)

  ctx.assert(startTime.isValid() && endTime.isValid(), 400)

  ctx.body = await ctx.cadence[state + 'Workflows']({
    StartTimeFilter: {
      earliestTime: momentToLong(startTime),
      latestTime: momentToLong(endTime)
    },
    typeFilter: q.workflowName ? { name: q.workflowName } : undefined,
    executionFilter: q.workflowId ? { workflowId: q.workflowId } : undefined,
    statusFilter: q.status || undefined,
    nextPageToken: q.nextPageToken ? Buffer.from(q.nextPageToken, 'base64') : undefined
  })
}

router.get('/api/domain/:domain/workflows/open', listWorkflows.bind(null, 'open'))
router.get('/api/domain/:domain/workflows/closed', listWorkflows.bind(null, 'closed'))

router.get('/api/domain/:domain/workflows/:workflowId/:runId/history', async function (ctx) {
  var q = ctx.query || {}

  ctx.body = await ctx.cadence.getHistory({
    nextPageToken: q.nextPageToken ? Buffer.from(q.nextPageToken, 'base64') : undefined,
    waitForNewEvent: 'waitForNewEvent' in q ? true : undefined
  })

  if (Array.isArray(ctx.body.history && ctx.body.history.events)) {
    ctx.body.history.events = ctx.body.history.events.map(e => {
      var attr = e.eventType ?
        e.eventType.charAt(0).toLowerCase() + e.eventType.slice(1) + 'EventAttributes' : '';
      if (e[attr]) {
        var details = JSON.parse(
          JSON.stringify(e[attr]), function replacer(key, value) {
            if (value && value.type && value.type === 'Buffer') {
              return Buffer.from(value).toString().replace(/["]/g, '').trim();
            }
            return value;
          }
        );
      }

      return {
        timestamp: e.timestamp,
        eventType: e.eventType,
        eventId: e.eventId,
        details
      }
    })
  }
})

router.get('/api/domain/:domain/workflows/:workflowId/:runId/queries', async function (ctx) {
  try {
    await ctx.cadence.queryWorkflow({
      query: {
        queryType: '__cadence_web_list'
      }
    })

    ctx.throw(500)
  } catch(e) {
    ctx.body = ((e.message || '')
      .match(/KnownQueryTypes=\[(.*)\]/) || [null, ''])[1]
      .split(' ')
      .filter(q => q)
  }
})

router.post('/api/domain/:domain/workflows/:workflowId/:runId/queries/:queryType', async function (ctx) {
  ctx.body = await ctx.cadence.queryWorkflow({
    query: {
      queryType: ctx.params.queryType
    }
  })
})

router.get('/api/domain/:domain/workflows/:workflowId/:runId', async function (ctx) {
  ctx.body = await ctx.cadence.describeWorkflow()
})

router.get('/api/domain/:domain/task-lists/:taskList/pollers', async function (ctx) {
  const descTaskList = async (taskListType) => (await ctx.cadence.describeTaskList({
    domain: ctx.params.domain,
    taskList: { name: ctx.params.taskList },
    taskListType
  })).pollers

  const r = type => (o, poller) => {
    let i = o[poller.identity] || {}
    o[poller.identity] = {
      lastAccessTime: !i.lastAccessTime || i.lastAccessTime < poller.lastAccessTime ?
        poller.lastAccessTime : i.lastAccessTime,
      taskListTypes: i.taskListTypes ? i.taskListTypes.concat([type]) : [type]
    }
    return o
  }

  const activityL = await descTaskList('Activity'),
  decisionL = await descTaskList('Decision')

  ctx.body = activityL.reduce(r('activity'), decisionL.reduce(r('decision'), {}))
})

router.get('/health', ctx => ctx.body = 'OK')

module.exports = router