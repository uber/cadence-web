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

import {
  DOMAIN_AUTOCOMPLETE_ON_MOUNTED,
  DOMAIN_AUTOCOMPLETE_SET_IS_LOADING,
  DOMAIN_AUTOCOMPLETE_SET_RECENT_RESULTS,
  DOMAIN_AUTOCOMPLETE_SET_RESULTS,
  DOMAIN_AUTOCOMPLETE_SET_SEARCH,
} from './mutation-types';

const mutations = {
  [DOMAIN_AUTOCOMPLETE_ON_MOUNTED]: state => {
    state.domainAutocomplete.isLoading = false;
    state.domainAutocomplete.results = [];
    state.domainAutocomplete.search = '';
  },
  [DOMAIN_AUTOCOMPLETE_SET_IS_LOADING]: (state, payload) => {
    state.domainAutocomplete.isLoading = payload;
  },
  [DOMAIN_AUTOCOMPLETE_SET_RECENT_RESULTS]: (state, payload) => {
    state.domainAutocomplete.recentResults = payload;
  },
  [DOMAIN_AUTOCOMPLETE_SET_RESULTS]: (state, payload) => {
    state.domainAutocomplete.results = payload;
  },
  [DOMAIN_AUTOCOMPLETE_SET_SEARCH]: (state, payload) => {
    state.domainAutocomplete.search = payload;
  },
};

export default mutations;
