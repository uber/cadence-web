const { combine } = require('../../helpers');
const {
  domainServiceConfig,
  visibilityServiceConfig,
  workflowServiceConfig
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
  formatResponseGetHistory,
  formatResponseListDomains,
  formatResponseQueryWorkflow,
  formatResponseWorkflowList
} = require('./format-response');
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
      describeCluster: () => {
        // TODO - looks like endpoint is missing from proto.
        //        will mock response for now until this is addressed in the cadence-idl project.
        return {
          persistenceInfo: {
            visibilityStore: {
              features: [
                {
                  key: "advancedVisibilityEnabled",
                  enabled: true,
                }
              ],
            },
          },
        };
      },
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
        transform: combine(
          withDomain(ctx),
          withWorkflowExecution(ctx),
        ),
      }),
      exportHistory: workflowService.request({
        formatRequest: formatRequestGetHistory,
        formatResponse: formatResponseGetHistory,
        method: 'GetWorkflowExecutionHistory',
        transform: combine(
          withDomain(ctx),
          withPagination(ctx),
          withWorkflowExecution(ctx),
        ),
      }),
      getHistory: workflowService.request({
        formatRequest: formatRequestGetHistory,
        formatResponse: formatResponseGetHistory,
        method: 'GetWorkflowExecutionHistory',
        transform: combine(
          withDomain(ctx),
          withPagination(ctx),
          withWorkflowExecution(ctx),
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
        transform: combine(
          withDomain(ctx),
          withPagination(ctx),
        ),
      }),
      openWorkflows: visibilityService.request({
        formatRequest: formatRequestWorkflowList,
        formatResponse: formatResponseWorkflowList,
        method: 'ListOpenWorkflowExecutions',
        transform: combine(
          withDomain(ctx),
          withPagination(ctx),
        ),
      }),
      queryWorkflow: workflowService.request({
        method: 'QueryWorkflow',
        formatResponse: formatResponseQueryWorkflow,
        transform: combine(
          withDomain(ctx),
          withWorkflowExecution(ctx),
        ),
      }),
      terminateWorkflow: workflowService.request({
        method: 'TerminateWorkflowExecution',
        transform: combine(
          withDomain(ctx),
          withWorkflowExecution(ctx),
        ),
      }),
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
