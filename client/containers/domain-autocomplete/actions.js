// Copyright (c) 2021 Uber Technologies Inc.
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

import { debounce } from 'lodash-es';
import { ROUTE_PUSH } from '../route/action-types';
import {
  DOMAIN_AUTOCOMPLETE_FETCH_SEARCH,
  DOMAIN_AUTOCOMPLETE_ON_CHANGE,
  DOMAIN_AUTOCOMPLETE_ON_SEARCH,
} from './action-types';
import {
  DOMAIN_AUTOCOMPLETE_SET_IS_LOADING,
  DOMAIN_AUTOCOMPLETE_SET_RECENT_RESULTS,
  DOMAIN_AUTOCOMPLETE_SET_RESULTS,
  DOMAIN_AUTOCOMPLETE_SET_SEARCH,
} from './mutation-types';
import {
  DOMAIN_AUTOCOMPLETE_RECENT_RESULTS,
  DOMAIN_AUTOCOMPLETE_SEARCH,
} from './getter-types';
import { DEBOUNCE_WAIT } from './constants';
import { http } from '~helpers';

const actions = {
  [DOMAIN_AUTOCOMPLETE_FETCH_SEARCH]: debounce(async ({ commit, getters }) => {
    const search = getters[DOMAIN_AUTOCOMPLETE_SEARCH];

    const results = await http(
      window.fetch,
      `/api/domains?querystring=${search}`
    );

    commit(DOMAIN_AUTOCOMPLETE_SET_IS_LOADING, false);

    commit(DOMAIN_AUTOCOMPLETE_SET_RESULTS, results);
  }, DEBOUNCE_WAIT),
  [DOMAIN_AUTOCOMPLETE_ON_CHANGE]: ({ commit, dispatch, getters }, payload) => {
    const { value } = payload;
    const { name, uuid } = value.domainInfo;

    // Add domain to recently accessed domains
    const recentResults = getters[DOMAIN_AUTOCOMPLETE_RECENT_RESULTS];

    if (
      !recentResults.find(recentResult => recentResult.domainInfo.uuid === uuid)
    ) {
      commit(DOMAIN_AUTOCOMPLETE_SET_RECENT_RESULTS, [...recentResults, value]);
    }

    dispatch(ROUTE_PUSH, `/domains/${name}`);
  },
  [DOMAIN_AUTOCOMPLETE_ON_SEARCH]: async ({ commit, dispatch }, payload) => {
    commit(DOMAIN_AUTOCOMPLETE_SET_SEARCH, payload);

    if (payload) {
      commit(DOMAIN_AUTOCOMPLETE_SET_IS_LOADING, true);
      dispatch(DOMAIN_AUTOCOMPLETE_FETCH_SEARCH);
    }
  },
};

export default actions;
