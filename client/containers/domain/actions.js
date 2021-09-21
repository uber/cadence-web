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
  ROUTE_PARAMS_CLUSTER_NAME,
  ROUTE_PARAMS_DOMAIN,
} from '../route/getter-types';
import { DOMAIN_FETCH } from './action-types';
import { DOMAIN_CURRENT } from './getter-types';
import { DOMAIN_FETCH_START } from './mutation-types';
import { hasExpired } from '~helpers';

const actions = {
  [DOMAIN_FETCH]: ({ commit, getters }) => {
    const clusterName = getters[ROUTE_PARAMS_CLUSTER_NAME];
    const domainName = getters[ROUTE_PARAMS_DOMAIN];
    const currentDomain = getters[DOMAIN_CURRENT];

    if (!domainName) {
      return;
    }

    const shouldFetch =
      !currentDomain ||
      (!currentDomain.isLoading &&
        (!currentDomain.value || hasExpired(currentDomain.expiryDateTime)));

    if (!shouldFetch) {
      return;
    }

    commit(DOMAIN_FETCH_START, { clusterName, domainName });

    // TODO - perform fetch...
    // Need crossRegion vuex store and get origin from there...
  },
};

export default actions;
