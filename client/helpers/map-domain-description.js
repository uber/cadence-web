export default function(domain) {
  const {
    configuration: {
      emitMetric,
      historyArchivalStatus,
      workflowExecutionRetentionPeriodInDays,
      visibilityArchivalStatus,
    } = {},
    domainInfo: {
      description,
      ownerEmail,
    } = {},
    failoverVersion,
    isGlobalDomain,
    replicationConfiguration: {
      activeClusterName,
      clusters = [],
    } = {},
  } = domain || {};

  return {
    description: description || 'No description available',
    owner: ownerEmail || 'Unknown',
    'Global?': isGlobalDomain ? 'Yes' : 'No',
    'Retention Period': workflowExecutionRetentionPeriodInDays ?
      `${workflowExecutionRetentionPeriodInDays} days`
      : 'Unknown',
    'Emit Metrics': emitMetric ? 'Yes' : 'No',
    'History Archival': historyArchivalStatus === 'ENABLED' ? 'Enabled' : 'Disabled',
    'Visibility Archival': visibilityArchivalStatus === 'ENABLED' ? 'Enabled' : 'Disabled',
    ...(failoverVersion && { 'Failover Version': failoverVersion }),
    clusters: clusters.length ?
      clusters
        .map(({ clusterName }) =>
          clusterName === activeClusterName
            ? `${clusterName} (active)`
            : clusterName
        )
        .join(', ')
      : 'Unknown',
  };
}
