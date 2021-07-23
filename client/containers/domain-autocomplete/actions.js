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
  DOMAIN_AUTOCOMPLETE_FETCH_DOMAIN_LIST,
  DOMAIN_AUTOCOMPLETE_ON_CHANGE,
  DOMAIN_AUTOCOMPLETE_ON_SEARCH,
} from './action-types';
import {
  DOMAIN_AUTOCOMPLETE_SET_IS_LOADING,
  DOMAIN_AUTOCOMPLETE_SET_DOMAIN_LIST,
  DOMAIN_AUTOCOMPLETE_SET_SEARCH,
  DOMAIN_AUTOCOMPLETE_SET_VISITED_DOMAIN_LIST,
} from './mutation-types';
import {
  DOMAIN_AUTOCOMPLETE_VISITED_DOMAIN_LIST,
  DOMAIN_AUTOCOMPLETE_SEARCH_URL,
} from './getter-types';
import { DEBOUNCE_WAIT } from './constants';
import { updateVisitedDomainList } from './helpers';
import { httpService } from '~services';

const actions = {
  [DOMAIN_AUTOCOMPLETE_FETCH_DOMAIN_LIST]: debounce(
    async ({ commit, getters }) => {
      const searchUrl = getters[DOMAIN_AUTOCOMPLETE_SEARCH_URL];

      const domainList = await httpService.get(searchUrl);

      commit(DOMAIN_AUTOCOMPLETE_SET_IS_LOADING, false);

      commit(DOMAIN_AUTOCOMPLETE_SET_DOMAIN_LIST, domainList);
    },
    DEBOUNCE_WAIT
  ),
  [DOMAIN_AUTOCOMPLETE_ON_CHANGE]: ({ commit, dispatch, getters }, payload) => {
    if (!payload) {
      return;
    }

    const { value } = payload;

    // Add domain to visited domains if not already contained in visited domain list.
    const visitedDomainList = getters[DOMAIN_AUTOCOMPLETE_VISITED_DOMAIN_LIST];

    const updatedVisitedDomainList = updateVisitedDomainList({
      value,
      visitedDomainList,
    });

    if (updatedVisitedDomainList) {
      commit(
        DOMAIN_AUTOCOMPLETE_SET_VISITED_DOMAIN_LIST,
        updatedVisitedDomainList
      );
    }

    const domainName =
      typeof value === 'string' ? value : value.domainInfo.name;

    dispatch(ROUTE_PUSH, `/domains/${domainName}`);
  },
  [DOMAIN_AUTOCOMPLETE_ON_SEARCH]: async ({ commit, dispatch }, payload) => {
    commit(DOMAIN_AUTOCOMPLETE_SET_SEARCH, payload);

    if (payload) {
      commit(DOMAIN_AUTOCOMPLETE_SET_IS_LOADING, true);
      dispatch(DOMAIN_AUTOCOMPLETE_FETCH_DOMAIN_LIST);
    } else {
      commit(DOMAIN_AUTOCOMPLETE_SET_DOMAIN_LIST, []);
    }
  },
};

export default actions;
