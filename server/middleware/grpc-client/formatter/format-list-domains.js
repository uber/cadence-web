const formatListDomains = (response) => ({
  domains: response.domains.map(({
    activeClusterName,
    badBinaries,
    clusters,
    data,
    description,
    failoverInfo,
    failoverVersion,
    historyArchivalStatus,
    historyArchivalUri,
    id,
    isGlobalDomain,
    name,
    ownerEmail,
    status,
    visibilityArchivalStatus,
    visibilityArchivalUri,
    workflowExecutionRetentionPeriod,
  }) => ({
    configuration: {
      badBinaries,
      emitMetric: undefined,
      historyArchivalStatus,
      historyArchivalURI: historyArchivalUri,
      visibilityArchivalStatus,
      visibilityArchivalURI: visibilityArchivalUri,
      workflowExecutionRetentionPeriodInDays: workflowExecutionRetentionPeriod,
    },
    domainInfo: {
      data,
      description,
      name,
      ownerEmail,
      status,
      uuid: id,
    },
    failoverInfo: {
      completedShardCount: undefined,
      failoverExpireTimestamp: undefined,
      failoverStartTimestamp: undefined,
      failoverVersion,
      pendingShards: undefined,
    },
    failoverVersion,
    isGlobalDomain,
    replicationConfiguration: {
      activeClusterName,
      clusters,
    }
  })),
  nextPageToken: response.nextPageToken,
});

module.exports = formatListDomains;
