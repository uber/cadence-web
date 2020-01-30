export default function(d) {
  // eslint-disable-next-line no-param-reassign
  d.configuration = d.configuration || {};
  // eslint-disable-next-line no-param-reassign
  d.replicationConfiguration = d.replicationConfiguration || { clusters: [] };

  return {
    description: d.domainInfo.description,
    owner: d.domainInfo.ownerEmail,
    'Global?': d.isGlobalDomain ? 'Yes' : 'No',
    'Retention Period': `${d.configuration.workflowExecutionRetentionPeriodInDays} days`,
    'Emit Metrics': d.configuration.emitMetric ? 'Yes' : 'No',
    'Failover Version': d.failoverVersion,
    clusters: d.replicationConfiguration.clusters
      .map(c =>
        c.clusterName === d.replicationConfiguration.activeClusterName
          ? `${c.clusterName} (active)`
          : c.clusterName
      )
      .join(', '),
  };
}
