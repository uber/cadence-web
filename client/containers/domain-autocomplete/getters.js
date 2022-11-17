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

import { get } from 'lodash-es';
import {
  DOMAIN_AUTOCOMPLETE_COMBINED_DOMAIN_LIST,
  DOMAIN_AUTOCOMPLETE_DOMAIN_LIST,
  DOMAIN_AUTOCOMPLETE_FILTERED_VISITED_DOMAIN_LIST,
  DOMAIN_AUTOCOMPLETE_IS_LOADING,
  DOMAIN_AUTOCOMPLETE_NAVIGATE_TO_DOMAIN_URL,
  DOMAIN_AUTOCOMPLETE_SEARCH,
  DOMAIN_AUTOCOMPLETE_SEARCH_URL,
  DOMAIN_AUTOCOMPLETE_VISITED_DOMAIN_LIST,
} from './getter-types';
import {
  combineDomainList,
  filterVisitedDomainList,
  filterTopDomainList,
  formatDomainList,
  sortDomainList,
  statePrefix,
} from './helpers';
import { combine } from '~helpers';

const getters = {
  [DOMAIN_AUTOCOMPLETE_COMBINED_DOMAIN_LIST]: (_, getters) => {
    const visitedDomainList =
      getters[DOMAIN_AUTOCOMPLETE_FILTERED_VISITED_DOMAIN_LIST];
    const domainList = getters[DOMAIN_AUTOCOMPLETE_DOMAIN_LIST];
    const combinedDomainList = combineDomainList({
      visitedDomainList,
      domainList,
    });

    return combine(
      sortDomainList,
      filterTopDomainList,
      formatDomainList
    )(combinedDomainList);
  },
  [DOMAIN_AUTOCOMPLETE_DOMAIN_LIST]: state =>
    sortDomainList(get(state, statePrefix('domainList')) || []),
  [DOMAIN_AUTOCOMPLETE_FILTERED_VISITED_DOMAIN_LIST]: (_, getters) =>
    filterVisitedDomainList({
      visitedDomainList: getters[DOMAIN_AUTOCOMPLETE_VISITED_DOMAIN_LIST],
      search: getters[DOMAIN_AUTOCOMPLETE_SEARCH],
    }),
  [DOMAIN_AUTOCOMPLETE_IS_LOADING]: state =>
    get(state, statePrefix('isLoading')) || false,
  [DOMAIN_AUTOCOMPLETE_NAVIGATE_TO_DOMAIN_URL]: (_, getters) => {
    const search = getters[DOMAIN_AUTOCOMPLETE_SEARCH];

    if (!search) {
      return '';
    }

    return `/domains/${search}`;
  },
  [DOMAIN_AUTOCOMPLETE_SEARCH]: state =>
    get(state, statePrefix('search')) || '',
  [DOMAIN_AUTOCOMPLETE_SEARCH_URL]: (_, getters) =>
    `/api/domains?querystring=${getters[DOMAIN_AUTOCOMPLETE_SEARCH]}`,
  [DOMAIN_AUTOCOMPLETE_VISITED_DOMAIN_LIST]: state =>
    sortDomainList(get(state, statePrefix('visitedDomainList')) || []),
};

export default getters;
