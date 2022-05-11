const DomainService = require('./service/domain-service');
const { formatDomain, formatListDomains } = require('./format');

const grpcClient = ({ peers, requestConfig }) =>
  async function (ctx, next) {
    const domainService = new DomainService({ peers, requestConfig });

    // console.log('domainService = ', domainService);

    ctx.cadence = {
      archivedWorkflows: () => { }, // TODO
      closedWorkflows: () => { }, // TODO
      describeCluster: () => { }, // TODO
      describeDomain: (body) => domainService.request({
        format: formatDomain,
        method: 'DescribeDomain',
        payload: body,
      }),
      describeTaskList: () => { }, // TODO
      describeWorkflow: () => { }, // TODO
      exportHistory: () => { }, // TODO
      getHistory: () => { }, // TODO
      listDomains: (body) => domainService.request({
        format: formatListDomains,
        method: 'ListDomains',
        payload: body,
      }),
      listTaskListPartitions: () => { }, // TODO
      listWorkflows: () => { }, // TODO
      openWorkflows: () => { }, // TODO
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
