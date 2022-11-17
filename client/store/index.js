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

import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { sync } from 'vuex-router-sync';
import {
  // active status
  activeStatusActions,
  activeStatusGetters,

  // cluster
  clusterActions,
  getClusterDefaultState,
  clusterGetters,
  clusterMutations,

  // cross region
  crossRegionActions,
  getCrossRegionDefaultState,
  crossRegionGetters,
  crossRegionMutations,

  // domain
  domainActions,
  getDomainDefaultState,
  domainGetters,
  domainMutations,

  // domain autocomplete
  domainAutocompleteActions,
  getDomainAutocompleteDefaultState,
  domainAutocompleteGetters,
  domainAutocompleteMutations,
  domainAutocompleteReducer,

  // graph
  getGraphDefaultState,
  graphGetters,
  graphMutations,

  // route
  routeActionCreator,
  routeGetters,

  // settings
  getSettingsWorkflowHistoryDefaultState,
  settingsWorkflowHistoryGetters,
  settingsWorkflowHistoryMutations,

  // workflow
  getWorkflowDefaultState,
  workflowGetters,
  workflowMutations,

  // workflow list
  workflowListActions,
  workflowListGetters,

  // workflow history
  getWorkflowHistoryDefaultState,

  // workflow pending
  workflowPendingActions,
  workflowPendingGetters,
} from '~containers';

const getDefaultState = (state = {}) => ({
  cluster: getClusterDefaultState(state.cluster),
  crossRegion: getCrossRegionDefaultState(state.crossRegion),
  domain: getDomainDefaultState(state.domain),
  domainAutocomplete: getDomainAutocompleteDefaultState(
    state.domainAutocomplete
  ),
  graph: getGraphDefaultState(state.graph),
  settingsWorkflowHistory: getSettingsWorkflowHistoryDefaultState(
    state.settingsWorkflowHistory
  ),
  workflow: getWorkflowDefaultState(state.workflow),
  workflowHistory: getWorkflowHistoryDefaultState(state.workflowHistory),
});

const getStoreConfig = ({ router, state }) => {
  const initialState = getDefaultState(state);

  const vuexLocal = new VuexPersistence({
    restoreState: key => {
      const state = JSON.tryParse(localStorage.getItem(key));

      if (!state) {
        return;
      }

      // ensures these states do not persist to local storage.
      const crossRegion = getCrossRegionDefaultState();
      const domain = getDomainDefaultState();

      const domainAutocomplete = domainAutocompleteReducer(
        state.domainAutocomplete
      );

      return {
        ...state,
        crossRegion,
        domain,
        ...(domainAutocomplete && {
          domainAutocomplete,
        }),
      };
    },
    storage: window.localStorage,
  });

  const storeConfig = {
    actions: {
      ...activeStatusActions,
      ...clusterActions,
      ...crossRegionActions,
      ...domainActions,
      ...domainAutocompleteActions,
      ...routeActionCreator(router),
      ...workflowListActions,
      ...workflowPendingActions,
    },
    getters: {
      ...activeStatusGetters,
      ...clusterGetters,
      ...crossRegionGetters,
      ...domainGetters,
      ...domainAutocompleteGetters,
      ...graphGetters,
      ...routeGetters,
      ...settingsWorkflowHistoryGetters,
      ...workflowGetters,
      ...workflowListGetters,
      ...workflowPendingGetters,
    },
    mutations: {
      ...clusterMutations,
      ...crossRegionMutations,
      ...domainMutations,
      ...domainAutocompleteMutations,
      ...graphMutations,
      ...settingsWorkflowHistoryMutations,
      ...workflowMutations,
    },
    plugins: [vuexLocal.plugin],
    state: initialState,
  };

  return storeConfig;
};

const initStore = ({ router, state }) => {
  Vue.use(Vuex);

  const storeConfig = getStoreConfig({ router, state });
  const store = new Vuex.Store(storeConfig);

  sync(store, router);

  return store;
};

export default initStore;
