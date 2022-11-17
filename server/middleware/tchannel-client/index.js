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

'use strict';

const TChannel = require('tchannel');

const { combine } = require('../../helpers');

const {
  cliTransform,
  makeChannels,
  makeRequest,
  withDomainPaging,
  withNextPageTokenBodyTransform,
  withWorkflowExecution,
  withVerboseWorkflowExecution,
} = require('./helpers');

const tchannelClient = ({ peers, requestConfig }) =>
  async function(ctx, next) {
    const { authTokenHeaders = {} } = ctx;

    const client = TChannel();
    const channels = await makeChannels({ client, peers });
    const request = makeRequest({
      authTokenHeaders,
      channels,
      ctx,
      requestConfig,
    });

    ctx.cadence = {
      archivedWorkflows: request({
        method: 'ListArchivedWorkflowExecutions',
        requestName: 'list',
        bodyTransform: combine(
          withDomainPaging(ctx),
          withNextPageTokenBodyTransform
        ),
      }),
      closedWorkflows: request({
        method: 'ListClosedWorkflowExecutions',
        requestName: 'list',
        bodyTransform: combine(
          withDomainPaging(ctx),
          withNextPageTokenBodyTransform
        ),
      }),
      describeCluster: request({
        channelName: 'admin',
        method: 'DescribeCluster',
        requestName: 'describe',
        serviceName: 'AdminService',
      }),
      describeDomain: request({
        method: 'DescribeDomain',
        requestName: 'describe',
      }),
      describeTaskList: request({
        method: 'DescribeTaskList',
      }),
      describeWorkflow: request({
        method: 'DescribeWorkflowExecution',
        requestName: 'describe',
        bodyTransform: withWorkflowExecution(ctx),
      }),
      exportHistory: request({
        method: 'GetWorkflowExecutionHistory',
        requestName: 'get',
        bodyTransform: combine(
          withDomainPaging(ctx),
          withWorkflowExecution(ctx),
          withNextPageTokenBodyTransform
        ),
        responseTransform: cliTransform,
      }),
      getHistory: request({
        method: 'GetWorkflowExecutionHistory',
        requestName: 'get',
        bodyTransform: combine(
          withDomainPaging(ctx),
          withWorkflowExecution(ctx),
          withNextPageTokenBodyTransform
        ),
      }),
      listDomains: request({
        method: 'ListDomains',
        requestName: 'list',
      }),
      listTaskListPartitions: request({
        method: 'ListTaskListPartitions',
      }),
      listWorkflows: request({
        method: 'ListWorkflowExecutions',
        requestName: 'list',
        bodyTransform: combine(
          withDomainPaging(ctx),
          withNextPageTokenBodyTransform
        ),
      }),
      openWorkflows: request({
        method: 'ListOpenWorkflowExecutions',
        requestName: 'list',
        bodyTransform: combine(
          withDomainPaging(ctx),
          withNextPageTokenBodyTransform
        ),
      }),
      queryWorkflow: request({
        method: 'QueryWorkflow',
        requestName: 'query',
        bodyTransform: withWorkflowExecution(ctx),
      }),
      signalWorkflow: request({
        method: 'SignalWorkflowExecution',
        requestName: 'signal',
        bodyTransform: withVerboseWorkflowExecution(ctx),
      }),
      startWorkflow: request({
        method: 'StartWorkflowExecution',
        requestName: 'start',
      }),
      terminateWorkflow: request({
        method: 'TerminateWorkflowExecution',
        requestName: 'terminate',
        bodyTransform: withVerboseWorkflowExecution(ctx),
      }),
    };

    try {
      await next();
      client.close();
    } catch (e) {
      client.close();
      throw e;
    }
  };

module.exports = tchannelClient;
