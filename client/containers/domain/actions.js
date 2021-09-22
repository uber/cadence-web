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
import {
  CROSS_REGION_ALLOWED_CROSS_ORIGIN,
  CROSS_REGION_CLUSTER_ORIGIN_LIST,
} from '../cross-region/getter-types';
import { DOMAIN_FETCH } from './action-types';
import { DOMAIN_IS_READY } from './getter-types';
import { DOMAIN_SET_DOMAIN } from './mutation-types';
import { httpService } from '~services';
import { getExpiryDateTimeFromNow } from '~helpers';

const actions = {
  [DOMAIN_FETCH]: async ({ commit, getters }) => {
    const clusterName = getters[ROUTE_PARAMS_CLUSTER_NAME];
    const domainName = getters[ROUTE_PARAMS_DOMAIN];
    const ready = getters[DOMAIN_IS_READY];
    const allowedCrossOrigin = getters[CROSS_REGION_ALLOWED_CROSS_ORIGIN];
    const clusterOriginList = getters[CROSS_REGION_CLUSTER_ORIGIN_LIST];

    if (ready) {
      return;
    }

    const cluster =
      allowedCrossOrigin &&
      clusterName &&
      clusterOriginList &&
      clusterOriginList.find(
        ({ clusterName: matchClusterName }) => matchClusterName === clusterName
      );
    const origin = (cluster && cluster.origin) || '';
    const domain = await httpService.get(`${origin}/api/domains/${domainName}`);

    domain.expiryDateTime = getExpiryDateTimeFromNow();

    commit(DOMAIN_SET_DOMAIN, domain);

    // TODO - For local domains, should we fetch other clusters here also???
  },
};

export default actions;
