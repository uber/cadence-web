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

router.get('/api/domain/:domain/workflows/history/:workflowId/:runId', async function (ctx) {
  var q = ctx.query || {}

  ctx.body = await ctx.cadence.getHistory({
    execution: {
      workflowId: ctx.params.workflowId,
      runId: ctx.params.runId
    },
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

router.get('/health', ctx => ctx.body = 'OK')

module.exports = router