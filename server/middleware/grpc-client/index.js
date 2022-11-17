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

const { combine } = require('../../helpers');
const {
  adminServiceConfig,
  domainServiceConfig,
  visibilityServiceConfig,
  workflowServiceConfig,
} = require('./configuration');
const {
  formatRequestDescribeTaskList,
  formatRequestGetHistory,
  formatRequestWorkflowList,
} = require('./format-request');
const {
  formatResponseDescribeTaskList,
  formatResponseDescribeWorkflow,
  formatResponseDomain,
  formatResponseExportHistory,
  formatResponseGetHistory,
  formatResponseListDomains,
  formatResponseQueryWorkflow,
  formatResponseSignalWorkflowExecution,
  formatResponseTerminateWorkflowExecution,
  formatResponseWorkflowList,
} = require('./format-response');
const GRPCService = require('./grpc-service');
const {
  withDomain,
  withPagination,
  withWorkflowExecution,
} = require('./transform');

const grpcClient = ({ peers, requestConfig }) =>
  async function(ctx, next) {
    const adminService = new GRPCService({
      ctx,
      peers,
      requestConfig,
      ...adminServiceConfig,
    });
    const domainService = new GRPCService({
      ctx,
      peers,
      requestConfig,
      ...domainServiceConfig,
    });
    const visibilityService = new GRPCService({
      ctx,
      peers,
      requestConfig,
      ...visibilityServiceConfig,
    });
    const workflowService = new GRPCService({
      ctx,
      peers,
      requestConfig,
      ...workflowServiceConfig,
    });

    ctx.cadence = {
      archivedWorkflows: visibilityService.request({
        formatResponse: formatResponseWorkflowList,
        method: 'ListArchivedWorkflowExecutions',
        transform: combine(withDomain(ctx), withPagination(ctx)),
      }),
      closedWorkflows: visibilityService.request({
        formatRequest: formatRequestWorkflowList,
        formatResponse: formatResponseWorkflowList,
        method: 'ListClosedWorkflowExecutions',
        transform: combine(withDomain(ctx), withPagination(ctx)),
      }),
      describeCluster: adminService.request({
        method: 'DescribeCluster',
      }),
      describeDomain: domainService.request({
        formatResponse: formatResponseDomain,
        method: 'DescribeDomain',
      }),
      describeTaskList: workflowService.request({
        formatRequest: formatRequestDescribeTaskList,
        formatResponse: formatResponseDescribeTaskList,
        method: 'DescribeTaskList',
      }),
      describeWorkflow: workflowService.request({
        formatResponse: formatResponseDescribeWorkflow,
        method: 'DescribeWorkflowExecution',
        transform: combine(withDomain(ctx), withWorkflowExecution(ctx)),
      }),
      exportHistory: workflowService.request({
        formatRequest: formatRequestGetHistory,
        formatResponse: formatResponseExportHistory,
        method: 'GetWorkflowExecutionHistory',
        transform: combine(
          withDomain(ctx),
          withPagination(ctx),
          withWorkflowExecution(ctx)
        ),
      }),
      getHistory: workflowService.request({
        formatRequest: formatRequestGetHistory,
        formatResponse: formatResponseGetHistory,
        method: 'GetWorkflowExecutionHistory',
        transform: combine(
          withDomain(ctx),
          withPagination(ctx),
          withWorkflowExecution(ctx)
        ),
      }),
      listDomains: domainService.request({
        formatResponse: formatResponseListDomains,
        method: 'ListDomains',
      }),
      listTaskListPartitions: workflowService.request({
        method: 'ListTaskListPartitions',
      }),
      listWorkflows: visibilityService.request({
        formatResponse: formatResponseWorkflowList,
        method: 'ListWorkflowExecutions',
        transform: combine(withDomain(ctx), withPagination(ctx)),
      }),
      openWorkflows: visibilityService.request({
        formatRequest: formatRequestWorkflowList,
        formatResponse: formatResponseWorkflowList,
        method: 'ListOpenWorkflowExecutions',
        transform: combine(withDomain(ctx), withPagination(ctx)),
      }),
      queryWorkflow: workflowService.request({
        method: 'QueryWorkflow',
        formatResponse: formatResponseQueryWorkflow,
        transform: combine(withDomain(ctx), withWorkflowExecution(ctx)),
      }),
      signalWorkflow: workflowService.request({
        formatResponse: formatResponseSignalWorkflowExecution,
        method: 'SignalWorkflowExecution',
        transform: combine(withDomain(ctx), withWorkflowExecution(ctx)),
      }),
      terminateWorkflow: workflowService.request({
        formatResponse: formatResponseTerminateWorkflowExecution,
        method: 'TerminateWorkflowExecution',
        transform: combine(withDomain(ctx), withWorkflowExecution(ctx)),
      }),
    };

    try {
      await next();
      domainService.close();
      visibilityService.close();
      workflowService.close();
    } catch (e) {
      domainService.close();
      visibilityService.close();
      workflowService.close();
      throw e;
    }
  };

module.exports = grpcClient;
