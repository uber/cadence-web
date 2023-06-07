// Copyright (c) 2021-2022 Uber Technologies Inc.
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

import { connect } from 'vuex-connect';
import {
  ROUTE_PARAMS_CLUSTER_NAME,
  ROUTE_PARAMS_DOMAIN,
} from '../route/getter-types';
import {
  DOMAIN_FETCH,
  DOMAIN_ON_MOUNT,
  DOMAIN_CHANGE_ORIGIN,
} from './action-types';
import {
  DOMAIN_ERROR,
  DOMAIN_IS_LOADING,
  DOMAIN_IS_READY,
  DOMAIN_CROSS_ORIGIN,
} from './getter-types';

const actionsToEvents = {
  onClusterChange: DOMAIN_FETCH,
  onDomainChange: DOMAIN_FETCH,
  onOriginChange: DOMAIN_CHANGE_ORIGIN,
};

const gettersToProps = {
  clusterName: ROUTE_PARAMS_CLUSTER_NAME,
  domainName: ROUTE_PARAMS_DOMAIN,
  error: DOMAIN_ERROR,
  isLoading: DOMAIN_IS_LOADING,
  isReady: DOMAIN_IS_READY,
  origin: DOMAIN_CROSS_ORIGIN,
};

const lifecycle = {
  mounted: ({ dispatch }) => dispatch(DOMAIN_ON_MOUNT),
};

export default connect({
  actionsToEvents,
  gettersToProps,
  lifecycle,
});
