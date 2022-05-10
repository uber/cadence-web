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
      workflowExecutionRetentionPeriodInDays: workflowExecutionRetentionPeriod.seconds / (60 * 60 * 24),
    },
    domainInfo: {
      data,
      description,
      name,
      ownerEmail,
      status,
      uuid: id,
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
