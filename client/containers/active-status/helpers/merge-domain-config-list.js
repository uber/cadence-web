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

const mergeDomainConfigList = domainConfigList =>
  domainConfigList.reduce(
    (
      accumulator,
      {
        isGlobalDomain,
        replicationConfiguration: { activeClusterName, clusters },
      }
    ) => {
      accumulator.isGlobalDomain = isGlobalDomain;

      if (!accumulator.activeClusterNames.includes(activeClusterName)) {
        accumulator.activeClusterNames.push(activeClusterName);
      }

      const nonDupeClusters = clusters.filter(
        ({ clusterName: matchClusterName }) =>
          !accumulator.clusters.find(
            ({ clusterName }) => clusterName === matchClusterName
          )
      );

      if (nonDupeClusters.length) {
        accumulator.clusters.push(...nonDupeClusters);
      }

      return accumulator;
    },
    { activeClusterNames: [], clusters: [], isGlobalDomain: undefined }
  );

export default mergeDomainConfigList;
