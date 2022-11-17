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

const getClusterFromClusterList = ({
  allowedCrossOrigin,
  clusterList,
  clusterName,
  origin,
}) => {
  if (!clusterList || allowedCrossOrigin === undefined) {
    return;
  }

  const matchParamName = allowedCrossOrigin
    ? clusterName
      ? 'clusterName'
      : 'isActive'
    : 'origin';
  const matchValue = allowedCrossOrigin
    ? clusterName
      ? clusterName
      : true
    : origin;

  const cluster = clusterList.find(
    ({ [matchParamName]: paramValue }) => paramValue === matchValue
  );

  if (!cluster) {
    console.warn(
      `Could not find cluster "${matchParamName}:${matchValue}" in crossRegion.clusterOriginList configuration.`
    );
  }

  return cluster;
};

export default getClusterFromClusterList;
