const
  TChannelAsThrift = require('tchannel/as/thrift'),
  TChannel = require('tchannel'),
  path = require('path'),
  Long = require('long'),
  moment = require('moment')

function transform(item) {
  if (!item || typeof item !== 'object') return item

  Object.entries(item).forEach(([subkey, subvalue]) => {
    if (subvalue && typeof subvalue.unsigned === 'boolean') {
      item[subkey] = Long.fromValue(item[subkey]).toNumber()
      var m = moment(item[subkey] / 1000000)
      if (m.isValid() && m.isAfter('2017-01-01')) {
        item[subkey] = m.toISOString()
      }
    } else if (Array.isArray(subvalue)) {
      subvalue.forEach(transform)
    } else if (subvalue && typeof subvalue === 'object') {
      transform(subvalue)
    }
  })
  if (item.nextPageToken) {
    item.nextPageToken = item.nextPageToken.toString('base64') || undefined
  }
  return item
}

module.exports = async function(ctx, next) {
  const
    client = TChannel();
    cadenceChannel = client.makeSubChannel({
      serviceName: 'cadence-frontend',
      peers: process.env.CADENCE_TCHANNEL_PEERS ?
        process.env.CADENCE_TCHANNEL_PEERS.split(',') :
        ['127.0.0.1:7933']
    }),
    tchannelAsThrift = TChannelAsThrift({
      channel: cadenceChannel,
      entryPoint: path.join(__dirname, '../idl/cadence.thrift')
    })

  function req(method, reqName) {
    return (body) => new Promise(function(resolve, reject) {
      try {
        tchannelAsThrift.request({
          serviceName: process.env.CADENCE_TCHANNEL_SERVICE || 'cadence-frontend',
          headers: {
            cn: 'cadence-web',
            'x-uber-source': 'cadence-web'
          },
          hasNoParent: true,
          timeout: 10000,
          retryFlags: { onConnectionError: true },
          retryLimit: Number(process.env.CADENCE_TCHANNEL_RETRY_LIMIT || 3)
        }).send(`WorkflowService::${method}`, {}, {
          [`${reqName}Request`]: Object.assign({
            domain: ctx.params.domain,
            maximumPageSize: 100
          }, body)
        }, function (err, res) {
          try {
            if (err) {
              reject(err)
            } else if (res.ok) {
              resolve(transform(res.body))
            } else {
              ctx.throw(res.body || res, 400)
            }
          } catch (e) {
            reject(e)
          }
        })
      } catch(e) {
        reject(e)
      }
    })
  }

  ctx.cadence = {
    openWorkflows: req('ListOpenWorkflowExecutions', 'list'),
    closedWorkflows: req('ListClosedWorkflowExecutions', 'list'),
    getHistory: req('GetWorkflowExecutionHistory', 'get')
  }

  try {
    await next()
    client.close()
  } catch (e) {
    client.close()
    throw e
  }
}