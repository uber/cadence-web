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
