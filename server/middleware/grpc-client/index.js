

const grpcClient = ({ peers, requestConfig }) => {

  return {
    archivedWorkflows: () => { }, // TODO
    closedWorkflows: () => { }, // TODO
    describeCluster: () => { }, // TODO
    describeDomain: () => { }, // TODO
    describeTaskList: () => { }, // TODO
    describeWorkflow: () => { }, // TODO
    exportHistory: () => { }, // TODO
    getHistory: () => { }, // TODO
    listDomains: () => { }, // TODO
    listTaskListPartitions: () => { }, // TODO
    listWorkflows: () => { }, // TODO
    openWorkflows: () => { }, // TODO
    queryWorkflow: () => { }, // TODO
    signalWorkflow: () => { }, // TODO
    startWorkflow: () => { }, // TODO
    terminateWorkflow: () => { }, // TODO
  };
};

module.exports = grpcClient;
