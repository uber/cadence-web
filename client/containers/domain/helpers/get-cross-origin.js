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

const getCrossOrigin = ({
  allowedCrossOrigin,
  clusterName,
  clusterOriginList,
  crossRegion,
  domain,
}) => {
  if (
    !domain ||
    !crossRegion ||
    !allowedCrossOrigin ||
    !clusterOriginList ||
    !clusterOriginList.length
  ) {
    return window.location.origin;
  }

  const {
    replicationConfiguration: { activeClusterName, clusters },
  } = domain;

  const matchedActiveClusterOrigin = clusterOriginList.find(
    ({ clusterName: matchClusterName }) =>
      matchClusterName === activeClusterName
  );
  const matchedCluster =
    clusterName &&
    clusters.find(
      ({ clusterName: matchClusterName }) => matchClusterName === clusterName
    );
  const matchedClusterOrigin = clusterOriginList.find(
    ({ clusterName: matchClusterName }) =>
      matchedCluster && matchClusterName === clusterName
  );
  const origin =
    (matchedClusterOrigin && matchedClusterOrigin.origin) ||
    (matchedActiveClusterOrigin && matchedActiveClusterOrigin.origin);

  if (!origin) {
    console.warn(
      `could not find clusterName "${clusterName}" or "${activeClusterName}" in crossRegion.clusterOriginList.`
    );
  }

  return origin || window.location.origin;
};

export default getCrossOrigin;
