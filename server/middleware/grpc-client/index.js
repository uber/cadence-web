const DomainService = require('./service/domain-service');
const { formatListDomains } = require('./formatter');

const grpcClient = ({ peers, requestConfig }) =>
  async function (ctx, next) {
    const domainService = new DomainService({ peers, requestConfig });

    // console.log('domainService = ', domainService);

    ctx.cadence = {
      archivedWorkflows: () => { }, // TODO
      closedWorkflows: () => { }, // TODO
      describeCluster: () => { }, // TODO
      describeDomain: async (body) => {
        ctx.body = await domainService.DescribeDomain(body);
      },
      describeTaskList: () => { }, // TODO
      describeWorkflow: () => { }, // TODO
      exportHistory: () => { }, // TODO
      getHistory: () => { }, // TODO
      listDomains: async (body) => {
        const response = await domainService.request({
          formatter: formatListDomains,
          method: 'listDomains',
          payload: body,
        });
        // console.log('response = ');
        // console.dir(response, { depth: 10 });
        return response;
      },
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
