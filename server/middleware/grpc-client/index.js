const { combine } = require('../../helpers');
const { domainServiceConfig, visibilityServiceConfig, workflowServiceConfig } = require('./configuration');
const { formatRequestWorkflowList } = require('./format-request');
const { formatResponseDescribeWorkflow, formatResponseDomain, formatResponseListDomains, formatResponseWorkflowList } = require('./format-response');
const GRPCService = require('./grpc-service');
const { withDomain, withPagination, withWorkflowExecution } = require('./transform');

const grpcClient = ({ peers, requestConfig }) =>
  async function (ctx, next) {
    const domainService = new GRPCService({ peers, requestConfig, ...domainServiceConfig });
    const visibilityService = new GRPCService({ peers, requestConfig, ...visibilityServiceConfig });
    const workflowService = new GRPCService({ peers, requestConfig, ...workflowServiceConfig });

    ctx.cadence = {
      archivedWorkflows: visibilityService.request({
        formatResponse: formatResponseWorkflowList,
        method: 'ListArchivedWorkflowExecutions',
        transform: combine(
          withDomain(ctx),
          withPagination(ctx),
        ),
      }),
      closedWorkflows: visibilityService.request({
        formatRequest: formatRequestWorkflowList,
        formatResponse: formatResponseWorkflowList,
        method: 'ListClosedWorkflowExecutions',
        transform: combine(
          withDomain(ctx),
          withPagination(ctx),
        ),
      }),
      describeCluster: () => { }, // TODO - need to test in an environment...
      describeDomain: domainService.request({
        formatResponse: formatResponseDomain,
        method: 'DescribeDomain',
      }),
      describeTaskList: () => { }, // TODO
      describeWorkflow: workflowService.request({
        formatResponse: formatResponseDescribeWorkflow,
        method: 'DescribeWorkflowExecution',
        transform: combine(
          withDomain(ctx),
          withWorkflowExecution(ctx),
        ),
      }),
      exportHistory: () => { }, // TODO
      getHistory: () => { }, // TODO
      listDomains: domainService.request({
        formatResponse: formatResponseListDomains,
        method: 'ListDomains',
      }),
      listTaskListPartitions: () => { }, // TODO
      listWorkflows: () => { }, // TODO - needs describeCluster to be working first.
      // listWorkflows: visibilityService.request({
      //   method: 'ListWorkflowExecutions',
      // }),
      openWorkflows: visibilityService.request({
        formatRequest: formatRequestWorkflowList,
        formatResponse: formatResponseWorkflowList,
        method: 'ListOpenWorkflowExecutions',
        transform: combine(
          withDomain(ctx),
          withPagination(ctx),
        ),
      }),
      queryWorkflow: () => { }, // TODO
      signalWorkflow: () => { }, // TODO
      startWorkflow: () => { }, // TODO
      terminateWorkflow: () => { }, // TODO
    };

    try {
      await next();
      domainService.close();
    } catch (e) {
      domainService.close();
      throw e;
    }
  };

module.exports = grpcClient;
