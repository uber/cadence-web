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

import { get } from 'lodash-es';
import {
  DOMAIN_AUTOCOMPLETE_COMBINED_RESULTS,
  DOMAIN_AUTOCOMPLETE_FILTERED_RECENT_RESULTS,
  DOMAIN_AUTOCOMPLETE_IS_LOADING,
  DOMAIN_AUTOCOMPLETE_RECENT_RESULTS,
  DOMAIN_AUTOCOMPLETE_RESULTS,
  DOMAIN_AUTOCOMPLETE_SEARCH,
} from './getter-types';
import {
  combineResults,
  filterRecentResults,
  filterTopResults,
  formatDomainList,
  sortResults,
} from './helpers';
import { combine } from '~helpers';

const domainAutocomplete = 'domainAutocomplete';
const prefix = term => `${domainAutocomplete}.${term}`;

const getters = {
  [DOMAIN_AUTOCOMPLETE_COMBINED_RESULTS]: (_, getters) => {
    const recentResults = getters[DOMAIN_AUTOCOMPLETE_FILTERED_RECENT_RESULTS];
    const results = getters[DOMAIN_AUTOCOMPLETE_RESULTS];
    const combinedResults = combineResults({ recentResults, results });

    return combine(combinedResults)(
      sortResults,
      filterTopResults,
      formatDomainList
    );
  },
  [DOMAIN_AUTOCOMPLETE_FILTERED_RECENT_RESULTS]: (_, getters) =>
    filterRecentResults({
      recentResults: getters[DOMAIN_AUTOCOMPLETE_RECENT_RESULTS],
      search: getters[DOMAIN_AUTOCOMPLETE_SEARCH],
    }),
  [DOMAIN_AUTOCOMPLETE_IS_LOADING]: state =>
    get(state, prefix('isLoading')) || false,
  [DOMAIN_AUTOCOMPLETE_RECENT_RESULTS]: state =>
    sortResults(get(state, prefix('recentResults')) || []),
  [DOMAIN_AUTOCOMPLETE_RESULTS]: state =>
    sortResults(get(state, prefix('results')) || []),
  [DOMAIN_AUTOCOMPLETE_SEARCH]: state => get(state, prefix('search')) || '',
};

export default getters;
