const
  TChannel = require('tchannel'),
  TChannelAsThrift = require('tchannel/as/thrift'),
  Long = require('long'),
  path = require('path')

var tchanServer, currTest, client

global.should = require('chai').should()

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
    } else {
      cb(null, { ok: true, head, body })
    }
  }

  tchan.register(tchanServer, 'WorkflowService::ListOpenWorkflowExecutions', {}, handler)
  tchan.register(tchanServer, 'WorkflowService::ListClosedWorkflowExecutions', {}, handler)
  tchan.register(tchanServer, 'WorkflowService::GetWorkflowExecutionHistory', {}, handler)

  process.env.CADENCE_TCHANNEL_PEERS = '127.0.0.1:11343'
  tchanServer.listen(11343, '127.0.0.1', () => done())

  global.app = require('../').init(true).listen()
})

after(function() {
  global.app.close()
  tchanServer.close()
  client.close()
})

beforeEach(function() {
  currTest = this.currentTest
})
