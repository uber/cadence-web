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

import { VISITED_DOMAIN_LIST_LIMIT } from '../constants';

const updateVisitedDomainList = ({ value, visitedDomainList }) => {
  const name = value.domainInfo.name;
  const uuid = value.domainInfo.uuid || null;

  const matchedDomainIndex = visitedDomainList.findIndex(
    domain =>
      domain.domainInfo.uuid === uuid ||
      ((!uuid || !domain.domainInfo.uuid) && domain.domainInfo.name === name)
  );

  if (matchedDomainIndex === -1) {
    const visitedDomainListExceededLimit =
      visitedDomainList.length - VISITED_DOMAIN_LIST_LIMIT + 1;

    return [
      ...(visitedDomainListExceededLimit >= 1
        ? visitedDomainList.slice(visitedDomainListExceededLimit)
        : visitedDomainList),
      value,
    ];
  }

  return [
    ...visitedDomainList.slice(0, matchedDomainIndex),
    ...visitedDomainList.slice(matchedDomainIndex + 1),
    value,
  ];
};

export default updateVisitedDomainList;
