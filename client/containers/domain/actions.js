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
  ROUTE_PARAMS_CLUSTER_NAME,
  ROUTE_PARAMS_DOMAIN,
} from '../route/getter-types';
import {
  CROSS_REGION_ALLOWED_CROSS_ORIGIN,
  CROSS_REGION_CLUSTER_ORIGIN_LIST,
} from '../cross-region/getter-types';
import {
  DOMAIN_CHANGE_ORIGIN,
  DOMAIN_FETCH,
  DOMAIN_ON_MOUNT,
} from './action-types';
import { DOMAIN_CROSS_ORIGIN, DOMAIN_IS_READY } from './getter-types';
import {
  DOMAIN_RESET_STATE,
  DOMAIN_SET_DOMAIN,
  DOMAIN_SET_ERROR,
} from './mutation-types';
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

    commit(DOMAIN_RESET_STATE, domainName);

    const cluster =
      allowedCrossOrigin &&
      clusterName &&
      clusterOriginList &&
      clusterOriginList.find(
        ({ clusterName: matchClusterName }) => matchClusterName === clusterName
      );
    const origin = (cluster && cluster.origin) || '';

    try {
      const domain = await httpService.get(
        `${origin}/api/domains/${domainName}`
      );

      if (allowedCrossOrigin && !domain.isGlobalDomain) {
        const fetchList = clusterOriginList
          .filter(
            ({ clusterName }) =>
              clusterName !== domain.replicationConfiguration.activeClusterName
          )
          .map(({ origin }) => async () => {
            try {
              const domainConfig = await httpService.get(
                `${origin}/api/domains/${domainName}`
              );

              return domainConfig;
            } catch (error) {
              console.warn(
                `Unable to resolve domain configuration for domain = "${domainName}" and origin = "${origin}".`
              );
            }
          });

        const domainList = (
          await Promise.all(fetchList.map(callback => callback()))
        ).filter(response => !!response);

        domainList.forEach(localDomain => {
          localDomain.expiryDateTime = getExpiryDateTimeFromNow();
          commit(DOMAIN_SET_DOMAIN, localDomain);
        });
      }

      domain.expiryDateTime = getExpiryDateTimeFromNow();
      commit(DOMAIN_SET_DOMAIN, domain);
    } catch (error) {
      console.warn(
        `Failed to fetch domain configuration for "${domainName}" from "${origin}".`
      );
      console.warn(error);
      commit(DOMAIN_SET_ERROR, {
        domainName,
        error: `An error occurred while trying to fetch domain "${domainName}". Please check the domain is correct and try again.`,
      });
    }
  },
  [DOMAIN_ON_MOUNT]: ({ dispatch }) => {
    dispatch(DOMAIN_CHANGE_ORIGIN);
    dispatch(DOMAIN_FETCH);
  },
  [DOMAIN_CHANGE_ORIGIN]: ({ getters }) => {
    const origin = getters[DOMAIN_CROSS_ORIGIN];

    httpService.setOrigin(origin);
  },
};

export default actions;
