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

import {
  DOMAIN_AUTOCOMPLETE_ON_MOUNTED,
  DOMAIN_AUTOCOMPLETE_SET_DOMAIN_LIST,
  DOMAIN_AUTOCOMPLETE_SET_IS_LOADING,
  DOMAIN_AUTOCOMPLETE_SET_SEARCH,
  DOMAIN_AUTOCOMPLETE_SET_VISITED_DOMAIN_LIST,
} from './mutation-types';

const mutations = {
  [DOMAIN_AUTOCOMPLETE_ON_MOUNTED]: state => {
    state.domainAutocomplete.isLoading = false;
    state.domainAutocomplete.domainList = [];
    state.domainAutocomplete.search = '';
  },
  [DOMAIN_AUTOCOMPLETE_SET_DOMAIN_LIST]: (state, payload) => {
    state.domainAutocomplete.domainList = payload;
  },
  [DOMAIN_AUTOCOMPLETE_SET_IS_LOADING]: (state, payload) => {
    state.domainAutocomplete.isLoading = payload;
  },
  [DOMAIN_AUTOCOMPLETE_SET_VISITED_DOMAIN_LIST]: (state, payload) => {
    state.domainAutocomplete.visitedDomainList = payload;
  },
  [DOMAIN_AUTOCOMPLETE_SET_SEARCH]: (state, payload) => {
    state.domainAutocomplete.search = payload;
  },
};

export default mutations;
