const
  supertest = require('supertest'),
  TChannel = require('tchannel'),
  TChannelAsThrift = require('tchannel/as/thrift'),
  Long = require('long'),
  path = require('path')

var tchanServer, currTest, client, app

global.should = require('chai').should()
global.dateToLong = d => Long.fromValue(Number(new Date(d))).mul(1000000)

before(function(done) {
  tchanServer = new TChannel({ serviceName: 'cadence-frontend' })

  client = new TChannel()
  var cadenceChan = client.makeSubChannel({
    serviceName: 'cadence-frontend'
  })
  var tchan = TChannelAsThrift({
    channel: cadenceChan,
    entryPoint: path.join(__dirname, '../idl/cadence.thrift')
  })

  const handler = (ctx, req, head, body, cb) => {
    var mockName = req.endpoint.replace('WorkflowService::', '')
    if (!currTest[mockName]) {
      throw new Error(`unexpected request to ${req.endpoint}`)
    }

    var body = currTest[mockName](body, req)
    if (body instanceof Error) {
      cb(body)
    } else if (body && body.ok === false) {
      cb(null, body)
    } else {
      cb(null, { ok: true, head, body })
    }
  }

  [
    'ListOpenWorkflowExecutions',
    'ListClosedWorkflowExecutions',
    'GetWorkflowExecutionHistory',
    'QueryWorkflow',
    'DescribeWorkflowExecution',
    'TerminateWorkflowExecution',
    'SignalWorkflowExecution',
    'ListDomains',
    'DescribeDomain',
    'DescribeTaskList'
  ].forEach(endpoint => tchan.register(tchanServer, 'WorkflowService::' + endpoint, {}, handler))

  process.env.CADENCE_TCHANNEL_PEERS = '127.0.0.1:11343'
  tchanServer.listen(11343, '127.0.0.1', () => done())

  app = require('../').init({ useWebpack: false, logErrors: false }).listen()
  global.request = supertest.bind(supertest, app)
})

after(function() {
  app.close()
  tchanServer.close()
  client.close()
})

beforeEach(function() {
  currTest = this.currentTest
})
