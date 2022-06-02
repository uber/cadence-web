// Copyright (c) 2022 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

const formatListDomains = ({ domains, nextPageToken }) => ({
  domains: domains.map(
    ({
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
        emitMetric: null, // missing from grpc
        historyArchivalStatus: historyArchivalStatus.replace(
          'ARCHIVAL_STATUS_',
          ''
        ),
        historyArchivalURI: historyArchivalUri,
        visibilityArchivalStatus: visibilityArchivalStatus.replace(
          'ARCHIVAL_STATUS_',
          ''
        ),
        visibilityArchivalURI: visibilityArchivalUri,
        workflowExecutionRetentionPeriodInDays:
          workflowExecutionRetentionPeriod.seconds / (60 * 60 * 24),
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
      },
    })
  ),
  nextPageToken,
});

module.exports = formatListDomains;
