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

const getHrefFromCluster = ({
  allowedCrossOrigin,
  cluster: {
    isActive,
    isGlobalDomain,
    clusterName: clusterNamePath,
    origin: clusterOrigin,
  },
  clusterName,
  domainName,
  origin,
  pathname,
}) => {
  if (!allowedCrossOrigin) {
    return `${clusterOrigin}${pathname}`;
  }

  const replaceKey = `/domains/${domainName}/${
    clusterName ? clusterName + '/' : ''
  }`;
  const replaceValue = `/domains/${domainName}/${
    isGlobalDomain && isActive ? '' : clusterNamePath + '/'
  }`;

  const newPathname = pathname.replace(replaceKey, replaceValue);

  return `${origin}${newPathname}`;
};

export default getHrefFromCluster;
