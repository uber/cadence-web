'use strict'

const
  TChannelAsThrift = require('tchannel/as/thrift'),
  TChannel = require('tchannel'),
  path = require('path'),
  Long = require('long'),
  moment = require('moment'),
  dns = require('dns'),
  isIPv4 = require('is-ipv4-node')

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

const lookupAsync = host => new Promise(function (resolve, reject) {
  dns.lookup(host, { family: 4 }, function (err, ip) {
    if (err) {
      reject(err)
    } else {
      resolve(ip)
    }
  })
})

const peers = process.env.CADENCE_TCHANNEL_PEERS ?
  process.env.CADENCE_TCHANNEL_PEERS.split(',') :
  ['127.0.0.1:7933']

async function makeChannel(client) {
  var ipPeers = await Promise.all(peers.map(peer => {
    var [host, port] = peer.split(':')
    if (!isIPv4(host)) {
      return lookupAsync(host).then(ip => [ip, port].join(':'))
    } else {
      return peer
    }
  }))

  return client.makeSubChannel({
    serviceName: 'cadence-frontend',
    peers: ipPeers
  })
}

module.exports = async function(ctx, next) {
  const
    client = TChannel(),
    cadenceChannel = await makeChannel(client),
    tchannelAsThrift = TChannelAsThrift({
      channel: cadenceChannel,
      entryPoint: path.join(__dirname, '../idl/cadence.thrift')
    })

  function req(method, reqName, bodyTransform) {
    return (body) => new Promise(function(resolve, reject) {
      try {
        tchannelAsThrift.request({
          serviceName: process.env.CADENCE_TCHANNEL_SERVICE || 'cadence-frontend',
          headers: {
            cn: 'cadence-web'
          },
          hasNoParent: true,
          timeout: 1000 * 60 * 5,
          retryFlags: { onConnectionError: true },
          retryLimit: Number(process.env.CADENCE_TCHANNEL_RETRY_LIMIT || 3)
        }).send(`WorkflowService::${method}`, {}, {
          [`${reqName}Request`]: typeof bodyTransform === 'function' ? bodyTransform(body) : body
        }, function (err, res) {
          try {
            if (err) {
              reject(err)
            } else if (res.ok) {
              resolve(transform(res.body))
            } else {
              ctx.throw(res.typeName === 'entityNotExistError' ? 404 : 400, null, res.body || res)
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

  const withDomainPaging = body => Object.assign({
    domain: ctx.params.domain,
    maximumPageSize: 100
  }, body)

  ctx.cadence = {
    openWorkflows: req('ListOpenWorkflowExecutions', 'list', withDomainPaging),
    closedWorkflows: req('ListClosedWorkflowExecutions', 'list', withDomainPaging),
    getHistory: req('GetWorkflowExecutionHistory', 'get', withDomainPaging),
    describeDomain: req('DescribeDomain', 'describe')
  }

  try {
    await next()
    client.close()
  } catch (e) {
    client.close()
    throw e
  }
}