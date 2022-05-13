const { combine } = require('../../helpers');
const { domainServiceConfig, visibilityServiceConfig, workflowServiceConfig } = require('./configuration');
const { formatRequestWorkflowList } = require('./format-request');
const { formatResponseDomain, formatResponseListDomains, formatResponseWorkflowList } = require('./format-response');
const GRPCService = require('./grpc-service');
const { withDomain, withPagination } = require('./transform');

const grpcClient = ({ peers, requestConfig }) =>
  async function (ctx, next) {
    const domainService = new GRPCService({ peers, requestConfig, ...domainServiceConfig });
    const visibilityService = new GRPCService({ peers, requestConfig, ...visibilityServiceConfig });
    const workflowService = new GRPCService({ peers, requestConfig, ...workflowServiceConfig });

    ctx.cadence = {
      archivedWorkflows: () => { }, // TODO
      closedWorkflows: visibilityService.request({
        formatRequest: formatRequestWorkflowList,
        formatResponse: formatResponseWorkflowList,
        method: 'ListClosedWorkflowExecutions',
        transform: combine(
          withDomain(ctx),
          withPagination(ctx),
        ),
      }),
      describeCluster: () => { }, // TODO
      describeDomain: domainService.request({
        formatResponse: formatResponseDomain,
        method: 'DescribeDomain',
      }),
      describeTaskList: () => { }, // TODO
      describeWorkflow: () => { }, // TODO
      exportHistory: () => { }, // TODO
      getHistory: () => { }, // TODO
      listDomains: domainService.request({
        formatResponse: formatResponseListDomains,
        method: 'ListDomains',
      }),
      listTaskListPartitions: () => { }, // TODO
      listWorkflows: () => { }, // TODO
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
