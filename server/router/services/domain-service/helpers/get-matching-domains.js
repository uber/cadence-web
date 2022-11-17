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

const { DOMAIN_LIST_SEARCH_SIZE } = require('../constants');

const getMatchingDomains = ({ domainList, querystring }) => {
  if (!querystring) {
    return domainList.slice(0, DOMAIN_LIST_SEARCH_SIZE);
  }

  const matchedDomainList = [];

  for (let i = 0; i < domainList.length; i++) {
    if (matchedDomainList.length === DOMAIN_LIST_SEARCH_SIZE) {
      return matchedDomainList;
    }

    const domain = domainList[i];

    if (domain.domainInfo.name.indexOf(querystring) !== -1) {
      matchedDomainList.push(domain);
    }
  }

  return matchedDomainList;
};

module.exports = getMatchingDomains;
