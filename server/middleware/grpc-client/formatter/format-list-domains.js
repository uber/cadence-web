const formatListDomains = ({ domains, nextPageToken }) => ({
  domains: domains.map(({
    activeClusterName,
    badBinaries,
    clusters,
    data,
    description,
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
      historyArchivalStatus: historyArchivalStatus.replace('ARCHIVAL_STATUS_', ''),
      historyArchivalURI: historyArchivalUri,
      visibilityArchivalStatus: visibilityArchivalStatus.replace('ARCHIVAL_STATUS_', ''),
      visibilityArchivalURI: visibilityArchivalUri,
      workflowExecutionRetentionPeriodInDays: workflowExecutionRetentionPeriod.seconds / (60 * 60 * 24),
    },
    domainInfo: {
      data,
      description,
      name,
      ownerEmail,
      status: status.replace('DOMAIN_STATUS_', ''),
      uuid: id,
    },
    failoverVersion,
    isGlobalDomain,
    replicationConfiguration: {
      activeClusterName,
      clusters,
    }
  })),
  nextPageToken,
});

module.exports = formatListDomains;
