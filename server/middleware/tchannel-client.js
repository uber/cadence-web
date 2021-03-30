// Copyright (c) 2017-2021 Uber Technologies Inc.
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

'use strict';

const path = require('path'),
  dns = require('dns'),
  get = require('lodash.get'),
  TChannelAsThrift = require('tchannel/as/thrift'),
  TChannel = require('tchannel'),
  Long = require('long'),
  losslessJSON = require('lossless-json'),
  moment = require('moment'),
  isIPv4 = require('is-ipv4-node');

function uiTransform(item) {
  if (!item || typeof item !== 'object') {
    return item;
  }

  Object.entries(item).forEach(([subkey, subvalue]) => {
    if (subvalue && typeof subvalue.unsigned === 'boolean') {
      item[subkey] = Long.fromValue(subvalue).toNumber();
      const m = moment(item[subkey] / 1000000);

      if (m.isValid() && m.isAfter('2017-01-01')) {
        item[subkey] = m.toISOString();
      }
    } else if (Buffer.isBuffer(subvalue)) {
      if (subkey === 'nextPageToken') {
        item.nextPageToken = subvalue.toString('base64');

        return;
      }

      const stringval = subvalue.toString('utf8');

      try {
        // most of Cadence's uses of buffer is just line-delimited JSON.
        item[subkey] = stringval
          .split('\n')
          .filter(x => x)
          .map(JSON.parse);

        if (item[subkey].length === 1) {
          item[subkey] = item[subkey][0];
        }
      } catch (e) {
        item[`${subkey}_base64`] = subvalue.toString('base64');
        item[subkey] = stringval;
      }
    } else if (Array.isArray(subvalue)) {
      subvalue.forEach(uiTransform);
    } else if (subvalue && typeof subvalue === 'object') {
      uiTransform(subvalue);
    }
  });

  return item;
}

function cliTransform(item) {
  if (!item || typeof item !== 'object') {
    return item;
  }

  Object.entries(item).forEach(([subkey, subvalue]) => {
    if (subvalue && typeof subvalue.unsigned === 'boolean') {
      item[subkey] = new losslessJSON.LosslessNumber(
        Long.fromValue(subvalue).toString()
      );
    } else if (Buffer.isBuffer(subvalue)) {
      item[subkey] = subvalue.toString('base64');
    } else if (Array.isArray(subvalue)) {
      subvalue.forEach(cliTransform);
    } else if (subvalue && typeof subvalue === 'object') {
      cliTransform(subvalue);
    } else if (subvalue === null || subvalue === undefined) {
      delete item[subkey];
    }
  });

  return item;
}

const lookupAsync = host =>
  new Promise(function(resolve, reject) {
    dns.lookup(host, { family: 4 }, function(err, ip) {
      if (err) {
        reject(err);
      } else {
        resolve(ip);
      }
    });
  });

const peers = process.env.CADENCE_TCHANNEL_PEERS
  ? process.env.CADENCE_TCHANNEL_PEERS.split(',')
  : ['127.0.0.1:7933'];

async function makeChannel(client) {
  const ipPeers = await Promise.all(
    peers.map(peer => {
      const [host, port] = peer.split(':');

      if (!isIPv4(host)) {
        return lookupAsync(host).then(ip => [ip, port].join(':'));
      } else {
        return peer;
      }
    })
  );

  const cadenceChannel = client.makeSubChannel({
    serviceName: 'cadence-frontend',
    peers: ipPeers,
    requestDefaults: {
      hasNoParent: true,
      headers: { as: 'raw', cn: 'cadence-web' },
    },
  });

  const tchannelAsThrift = TChannelAsThrift({
    channel: cadenceChannel,
    entryPoint: path.join(__dirname, '../idl/cadence.thrift'),
  });

  return tchannelAsThrift;
}

module.exports = async function(ctx, next) {
  const client = TChannel();
  const channel = await makeChannel(client, ctx);
  const { authTokenHeaders = {} } = ctx;

  function req(method, reqName, bodyTransform, resTransform) {
    return body =>
      new Promise(function (resolve, reject) {
        try {
          channel
            .request({
              serviceName:
                process.env.CADENCE_TCHANNEL_SERVICE || 'cadence-frontend',
              timeout: 1000 * 60 * 5,
              retryFlags: { onConnectionError: true },
              retryLimit: Number(process.env.CADENCE_TCHANNEL_RETRY_LIMIT || 3),
            })
            .send(
              `WorkflowService::${method}`,
              {
                ...authTokenHeaders,
              },
              {
                [`${reqName ? reqName + 'R' : 'r'}equest`]:
                  typeof bodyTransform === 'function'
                    ? bodyTransform(body)
                    : body,
              },
              function(err, res) {
                try {
                  if (err) {
                    reject(err);
                  } else if (res.ok) {
                    resolve((resTransform || uiTransform)(res.body));
                  } else {
                    ctx.throw(
                      res.typeName === 'entityNotExistError' ? 404 : 400,
                      null,
                      res.body || res
                    );
                  }
                } catch (e) {
                  reject(e);
                }
              }
            );
        } catch (e) {
          reject(e);
        }
      });
  }

  const withDomainPaging = body =>
      Object.assign(
        {
          domain: get(ctx, 'params.domain'),
          maximumPageSize: 100,
        },
        body
      ),
    withWorkflowExecution = body => {
      const domain = get(ctx, 'params.domain');
      const runId = get(ctx, 'params.runId');
      const workflowId = get(ctx, 'params.workflowId');

      const execution = (workflowId || runId) && {
        workflowId,
        runId,
      };

      return Object.assign(
        {
          domain,
          execution,
        },
        body,
      );
    },
    withVerboseWorkflowExecution = body => {
      const domain = get(ctx, 'params.domain');
      const runId = get(ctx, 'params.runId');
      const workflowId = get(ctx, 'params.workflowId');

      const workflowExecution = (workflowId || runId) && {
        workflowId,
        runId,
      };

      return Object.assign(
        {
          domain,
          workflowExecution,
        },
        body
      );
    },
    withDomainPagingAndWorkflowExecution = b =>
      Object.assign(withDomainPaging(b), withWorkflowExecution(b));

  ctx.cadence = {
    archivedWorkflows: req(
      'ListArchivedWorkflowExecutions',
      'list',
      withDomainPaging
    ),
    closedWorkflows: req(
      'ListClosedWorkflowExecutions',
      'list',
      withDomainPaging
    ),
    describeDomain: req('DescribeDomain', 'describe'),
    describeTaskList: req('DescribeTaskList'),
    describeWorkflow: req(
      'DescribeWorkflowExecution',
      'describe',
      withWorkflowExecution
    ),
    exportHistory: req(
      'GetWorkflowExecutionHistory',
      'get',
      withDomainPagingAndWorkflowExecution,
      cliTransform
    ),
    getHistory: req(
      'GetWorkflowExecutionHistory',
      'get',
      withDomainPagingAndWorkflowExecution
    ),
    listDomains: req('ListDomains', 'list'),
    listTaskListPartitions: req('ListTaskListPartitions'),
    listWorkflows: req('ListWorkflowExecutions', 'list', withDomainPaging),
    openWorkflows: req('ListOpenWorkflowExecutions', 'list', withDomainPaging),
    queryWorkflow: req('QueryWorkflow', 'query', withWorkflowExecution),
    signalWorkflow: req(
      'SignalWorkflowExecution',
      'signal',
      withVerboseWorkflowExecution
    ),
    startWorkflow: req(
      'StartWorkflowExecution',
      'start'
    ),
    terminateWorkflow: req(
      'TerminateWorkflowExecution',
      'terminate',
      withVerboseWorkflowExecution
    ),
  };

  try {
    await next();
    client.close();
  } catch (e) {
    client.close();
    throw e;
  }
};
