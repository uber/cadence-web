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

import { debounce } from 'lodash-es';
import { ROUTE_PUSH } from '../route/action-types';
import {
  CROSS_REGION_ALLOWED_CROSS_ORIGIN,
  CROSS_REGION_CLUSTER_ORIGIN_LIST,
} from '../cross-region/getter-types';
import { DOMAIN_IS_READY, DOMAIN_CURRENT } from '../domain/getter-types';
import {
  DOMAIN_AUTOCOMPLETE_FETCH_DOMAIN_LIST,
  DOMAIN_AUTOCOMPLETE_ON_CHANGE,
  DOMAIN_AUTOCOMPLETE_ON_MOUNT,
  DOMAIN_AUTOCOMPLETE_ON_MULTI_SELECT_CHANGE,
  DOMAIN_AUTOCOMPLETE_ON_SEARCH,
} from './action-types';
import {
  DOMAIN_AUTOCOMPLETE_ON_MOUNTED,
  DOMAIN_AUTOCOMPLETE_SET_IS_LOADING,
  DOMAIN_AUTOCOMPLETE_SET_IS_MULTI_SELECT,
  DOMAIN_AUTOCOMPLETE_SET_DOMAIN_LIST,
  DOMAIN_AUTOCOMPLETE_SET_MULTI_DOMAIN_SELECTION,
  DOMAIN_AUTOCOMPLETE_SET_SEARCH,
  DOMAIN_AUTOCOMPLETE_SET_VISITED_DOMAIN_LIST,
} from './mutation-types';
import {
  DOMAIN_AUTOCOMPLETE_IS_MULTI_SELECT,
  DOMAIN_AUTOCOMPLETE_MULTI_DOMAIN_SELECTION,
  DOMAIN_AUTOCOMPLETE_SEARCH_URL,
  DOMAIN_AUTOCOMPLETE_VISITED_DOMAIN_LIST,
} from './getter-types';
import { DEBOUNCE_WAIT } from './constants';
import {
  filterDuplicatesFromDomainList,
  formatDomainList,
  updateVisitedDomainList,
} from './helpers';
import { featureFlagService, httpService } from '~services';

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

        return domainList;
      } else {
        const domainList = await fetchDomainForOrigin({ origin: '' });

        commit(DOMAIN_AUTOCOMPLETE_SET_IS_LOADING, false);
        commit(DOMAIN_AUTOCOMPLETE_SET_DOMAIN_LIST, domainList);

        return domainList;
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
    const isMultiSelect = getters[DOMAIN_AUTOCOMPLETE_IS_MULTI_SELECT];
    const multiDomainSelection =
      getters[DOMAIN_AUTOCOMPLETE_MULTI_DOMAIN_SELECTION];

    if (isMultiSelect) {
      // check if change is an add or remove
      if (payload.length > multiDomainSelection.length) {
        // added item
        const newItem = payload[payload.length - 1];

        // check if item is already selected or not
        const hasItem = multiDomainSelection.find(
          item => item.value.domainInfo.uuid === newItem.value.domainInfo.uuid
        );

        if (!hasItem) {
          commit(DOMAIN_AUTOCOMPLETE_SET_MULTI_DOMAIN_SELECTION, payload);
        }
      } else {
        // removed item
        commit(DOMAIN_AUTOCOMPLETE_SET_MULTI_DOMAIN_SELECTION, payload);
      }

      return;
    }

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
  [DOMAIN_AUTOCOMPLETE_ON_MOUNT]: async ({ commit, getters }) => {
    const ready = getters[DOMAIN_IS_READY];
    const currentDomain = getters[DOMAIN_CURRENT];
    const multiDomainSelection =
      ready && currentDomain ? formatDomainList([currentDomain]) : [];
    const multiSelectEnabled = await featureFlagService.isFeatureFlagEnabled({
      name: 'domainAutocomplete.multiSelect',
    });

    // TODO - Need to cater for when domain hasn't loaded yet...
    // in theory shouldn't happen if done correctly as loading blocks the page (I think)
    commit(DOMAIN_AUTOCOMPLETE_ON_MOUNTED, {
      multiDomainSelection,
      multiSelectEnabled,
    });
  },
  [DOMAIN_AUTOCOMPLETE_ON_MULTI_SELECT_CHANGE]: ({ commit }, payload) => {
    commit(DOMAIN_AUTOCOMPLETE_SET_IS_MULTI_SELECT, payload);
  },
  [DOMAIN_AUTOCOMPLETE_ON_SEARCH]: async ({ commit, dispatch }, payload) => {
    commit(DOMAIN_AUTOCOMPLETE_SET_SEARCH, payload);

    if (!payload) {
      commit(DOMAIN_AUTOCOMPLETE_SET_DOMAIN_LIST, []);

      return [];
    }

    const domainList = await dispatch(DOMAIN_AUTOCOMPLETE_FETCH_DOMAIN_LIST);

    return domainList;
  },
};

export default actions;
