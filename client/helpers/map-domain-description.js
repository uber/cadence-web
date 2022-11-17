// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export default function(domain) {
  const {
    configuration: {
      emitMetric,
      historyArchivalStatus,
      workflowExecutionRetentionPeriodInDays,
      visibilityArchivalStatus,
    } = {},
    domainInfo: { description, ownerEmail } = {},
    failoverVersion,
    isGlobalDomain,
    replicationConfiguration: { activeClusterName, clusters = [] } = {},
  } = domain || {};

  return {
    description: description || 'No description available',
    owner: ownerEmail || 'Unknown',
    'Global?': isGlobalDomain ? 'Yes' : 'No',
    'Retention Period': workflowExecutionRetentionPeriodInDays
      ? `${workflowExecutionRetentionPeriodInDays} days`
      : 'Unknown',
    'Emit Metrics': emitMetric ? 'Yes' : 'No',
    'History Archival':
      historyArchivalStatus === 'ENABLED' ? 'Enabled' : 'Disabled',
    'Visibility Archival':
      visibilityArchivalStatus === 'ENABLED' ? 'Enabled' : 'Disabled',
    ...(failoverVersion !== undefined && {
      'Failover Version': failoverVersion,
    }),
    clusters: clusters.length
      ? clusters
          .map(({ clusterName }) =>
            clusterName === activeClusterName
              ? `${clusterName} (active)`
              : clusterName
          )
          .join(', ')
      : 'Unknown',
  };
}
