// Copyright (c) 2020-2021 Uber Technologies Inc.
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

import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { sync } from 'vuex-router-sync';
import {
  // cluster
  getClusterDefaultState,
  clusterGetters,
  clusterMutations,

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
    storage: window.localStorage,
  });

  const storeConfig = {
    actions: {
      ...routeActionCreator(router),
      ...workflowListActions,
      ...workflowPendingActions,
    },
    getters: {
      ...clusterGetters,
      ...graphGetters,
      ...routeGetters,
      ...settingsWorkflowHistoryGetters,
      ...workflowGetters,
      ...workflowListGetters,
      ...workflowPendingGetters,
    },
    mutations: {
      ...clusterMutations,
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
