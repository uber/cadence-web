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

import { debounce } from 'lodash-es';
import { ROUTE_PUSH } from '../route/action-types';
import {
  CROSS_REGION_ALLOWED_CROSS_ORIGIN,
  CROSS_REGION_CLUSTER_ORIGIN_LIST,
} from '../cross-region/getter-types';
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
  DOMAIN_AUTOCOMPLETE_SEARCH_URL,
  DOMAIN_AUTOCOMPLETE_VISITED_DOMAIN_LIST,
} from './getter-types';
import { DEBOUNCE_WAIT } from './constants';
import {
  updateVisitedDomainList,
  filterDuplicatesFromDomainList,
} from './helpers';
import { httpService } from '~services';

const actions = {
  [DOMAIN_AUTOCOMPLETE_FETCH_DOMAIN_LIST]: debounce(
    async ({ commit, getters }) => {
      const searchUrl = getters[DOMAIN_AUTOCOMPLETE_SEARCH_URL];
      const allowedCrossOrigin = getters[CROSS_REGION_ALLOWED_CROSS_ORIGIN];
      const clusterOriginList = getters[CROSS_REGION_CLUSTER_ORIGIN_LIST];

      const fetchDomainForOrigin = async ({ clusterName = '', origin }) => {
        try {
          const result = await httpService.get(
            `${origin}${searchUrl}`,
            origin && {
              credentials: 'include',
              mode: 'cors',
            }
          );

          return result;
        } catch (error) {
          console.warn(
            `Failed to fetch result from cluster "${clusterName}" with origin "${origin}" with error:`,
            error
          );
        }
      };

      if (allowedCrossOrigin && clusterOriginList) {
        const domainListSet = await Promise.all(
          clusterOriginList.map(fetchDomainForOrigin)
        );

        const domainList = filterDuplicatesFromDomainList(
          domainListSet.filter(result => !!result).flat()
        );

        commit(DOMAIN_AUTOCOMPLETE_SET_IS_LOADING, false);
        commit(DOMAIN_AUTOCOMPLETE_SET_DOMAIN_LIST, domainList);
      } else {
        const domainList = await fetchDomainForOrigin({ origin: '' });

        commit(DOMAIN_AUTOCOMPLETE_SET_IS_LOADING, false);
        commit(DOMAIN_AUTOCOMPLETE_SET_DOMAIN_LIST, domainList);
      }
    },
    DEBOUNCE_WAIT
  ),
  [DOMAIN_AUTOCOMPLETE_ON_CHANGE]: async (
    { commit, dispatch, getters },
    payload
  ) => {
    if (!payload) {
      return;
    }

    const { value } = payload;
    const visitedDomainList = getters[DOMAIN_AUTOCOMPLETE_VISITED_DOMAIN_LIST];
    const allowedCrossOrigin = getters[CROSS_REGION_ALLOWED_CROSS_ORIGIN];
    const dispatchToGlobalRoute = () =>
      dispatch(ROUTE_PUSH, `/domains/${value.domainInfo.name}`);

    const updatedVisitedDomainList = updateVisitedDomainList({
      value,
      visitedDomainList,
    });

    commit(
      DOMAIN_AUTOCOMPLETE_SET_VISITED_DOMAIN_LIST,
      updatedVisitedDomainList
    );

    if (
      !allowedCrossOrigin ||
      !value.replicationConfiguration ||
      (value.isGlobalDomain &&
        value.replicationConfiguration.clusters.length > 1)
    ) {
      return dispatchToGlobalRoute();
    }

    dispatch(
      ROUTE_PUSH,
      `/domains/${value.domainInfo.name}/${value.replicationConfiguration.activeClusterName}`
    );
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
