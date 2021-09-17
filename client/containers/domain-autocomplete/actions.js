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
  DOMAIN_AUTOCOMPLETE_ON_MOUNT,
  DOMAIN_AUTOCOMPLETE_ON_SEARCH,
} from './action-types';
import {
  DOMAIN_AUTOCOMPLETE_SET_CONFIG,
  DOMAIN_AUTOCOMPLETE_SET_IS_LOADING,
  DOMAIN_AUTOCOMPLETE_SET_DOMAIN_LIST,
  DOMAIN_AUTOCOMPLETE_SET_SEARCH,
  DOMAIN_AUTOCOMPLETE_SET_VISITED_DOMAIN_LIST,
} from './mutation-types';
import {
  DOMAIN_AUTOCOMPLETE_ALLOWED_CROSS_ORIGIN,
  DOMAIN_AUTOCOMPLETE_CLUSTER_ORIGIN_LIST,
  DOMAIN_AUTOCOMPLETE_SEARCH_URL,
  DOMAIN_AUTOCOMPLETE_VISITED_DOMAIN_LIST,
} from './getter-types';
import { DEBOUNCE_WAIT } from './constants';
import { updateVisitedDomainList } from './helpers';
import { featureFlagService, httpService } from '~services';

const actions = {
  [DOMAIN_AUTOCOMPLETE_FETCH_DOMAIN_LIST]: debounce(
    async ({ commit, getters }) => {
      const searchUrl = getters[DOMAIN_AUTOCOMPLETE_SEARCH_URL];
      const clusterOriginList =
        getters[DOMAIN_AUTOCOMPLETE_CLUSTER_ORIGIN_LIST];

      const domainList = await (
        await Promise.all(
          clusterOriginList.map(async ({ clusterName = '', origin }) => {
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
                `Failed to fetch result from cluster "${clusterName}" with origin "${origin}"`
              );
            }
          })
        )
      )
        .filter(result => !!result)
        .flat();

      commit(DOMAIN_AUTOCOMPLETE_SET_IS_LOADING, false);
      commit(DOMAIN_AUTOCOMPLETE_SET_DOMAIN_LIST, domainList);
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
    const allowedCrossOrigin =
      getters[DOMAIN_AUTOCOMPLETE_ALLOWED_CROSS_ORIGIN];
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

    if (value.isGlobalDomain) {
      return dispatchToGlobalRoute();
    }

    if (!allowedCrossOrigin) {
      return dispatchToGlobalRoute();
    }

    dispatch(
      ROUTE_PUSH,
      `/domains/${value.domainInfo.name}/${value.replicationConfiguration.activeClusterName}`
    );
  },
  [DOMAIN_AUTOCOMPLETE_ON_MOUNT]: async ({ commit }) => {
    commit(DOMAIN_AUTOCOMPLETE_SET_IS_LOADING, true);

    const { origin } = window.location;

    // TODO - Need to move feature flag service to vuex store and use getter instead.
    const getAllowedCrossOrigin = () =>
      featureFlagService.isFeatureFlagEnabled({
        cache: true,
        name: 'crossRegion,crossRegion.allowedCrossOrigin',
        params: {
          origin,
        },
      });

    // TODO - need to move cluster origin list / cluster list into cluster vuex store and use getter instead.
    const getClusterOriginList = () =>
      featureFlagService.getConfiguration({
        cache: true,
        name: 'crossRegion.clusterOriginList',
      });

    const [allowedCrossOrigin, clusterOriginList] = await Promise.all([
      getAllowedCrossOrigin(),
      getClusterOriginList(),
    ]);

    // TODO - move these feature flags / configurations to separate shared vuex store
    commit(DOMAIN_AUTOCOMPLETE_SET_CONFIG, {
      allowedCrossOrigin,
      clusterOriginList: clusterOriginList || [],
    });
    commit(DOMAIN_AUTOCOMPLETE_SET_IS_LOADING, false);
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
