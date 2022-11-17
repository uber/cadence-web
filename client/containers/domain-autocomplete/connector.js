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

import { connect } from 'vuex-connect';
import { ROUTE_PARAMS_DOMAIN } from '../route/getter-types';
import {
  DOMAIN_AUTOCOMPLETE_ON_CHANGE,
  DOMAIN_AUTOCOMPLETE_ON_SEARCH,
} from './action-types';
import {
  DOMAIN_AUTOCOMPLETE_COMBINED_DOMAIN_LIST,
  DOMAIN_AUTOCOMPLETE_IS_LOADING,
  DOMAIN_AUTOCOMPLETE_NAVIGATE_TO_DOMAIN_URL,
  DOMAIN_AUTOCOMPLETE_SEARCH,
} from './getter-types';
import { DOMAIN_AUTOCOMPLETE_ON_MOUNTED } from './mutation-types';

const actionsToEvents = {
  onChange: DOMAIN_AUTOCOMPLETE_ON_CHANGE,
  onSearch: DOMAIN_AUTOCOMPLETE_ON_SEARCH,
};

const gettersToProps = {
  isLoading: DOMAIN_AUTOCOMPLETE_IS_LOADING,
  domain: ROUTE_PARAMS_DOMAIN,
  domainList: DOMAIN_AUTOCOMPLETE_COMBINED_DOMAIN_LIST,
  navigateToDomainUrl: DOMAIN_AUTOCOMPLETE_NAVIGATE_TO_DOMAIN_URL,
  search: DOMAIN_AUTOCOMPLETE_SEARCH,
};

const lifecycle = {
  mounted: ({ commit }) => {
    commit(DOMAIN_AUTOCOMPLETE_ON_MOUNTED);
  },
};

export default connect({
  actionsToEvents,
  gettersToProps,
  lifecycle,
});
