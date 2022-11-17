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

const formatEnum = require('./format-enum');

const formatDomain = ({
  domain: {
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
  },
}) => ({
  configuration: {
    badBinaries,
    emitMetric: true, // DEPRECATED
    historyArchivalStatus: formatEnum(historyArchivalStatus, 'ARCHIVAL_STATUS'),
    historyArchivalURI: historyArchivalUri ? historyArchivalUri : null,
    visibilityArchivalStatus: formatEnum(
      visibilityArchivalStatus,
      'ARCHIVAL_STATUS'
    ),
    visibilityArchivalURI: visibilityArchivalUri ? visibilityArchivalUri : null,
    workflowExecutionRetentionPeriodInDays:
      workflowExecutionRetentionPeriod.seconds / (60 * 60 * 24),
  },
  domainInfo: {
    data: data ? data : null,
    description,
    name,
    ownerEmail: ownerEmail ? ownerEmail : null,
    status: formatEnum(status, 'DOMAIN_STATUS'),
    uuid: id ? id : null,
  },
  failoverInfo,
  failoverVersion: parseInt(failoverVersion),
  isGlobalDomain,
  replicationConfiguration: {
    activeClusterName,
    clusters,
  },
});

module.exports = formatDomain;
