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
import {
  getDefaultState as getGraphDefaultState,
  getters as graphGetters,
  mutations as graphMutations,
} from './graph';
import {
  actionTypes as routeActionTypes,
  getters as routeGetters,
} from './route';
import {
  // settings
  getSettingsWorkflowHistoryDefaultState,
  settingsWorkflowHistoryGetters,
  settingsWorkflowHistoryMutations,

  // workflow
  getWorkflowDefaultState,
  workflowGetters,
  workflowMutations,

  // workflow history
  getWorkflowHistoryDefaultState,

  // workflow pending
  workflowPendingActions,
  workflowPendingGetters,
} from '~containers';

const { ROUTE_PUSH, ROUTE_REPLACE } = routeActionTypes;

// Application store

const initStore = ({ router }) => {
  const getDefaultState = () => ({
    graph: getGraphDefaultState(),
    settingsWorkflowHistory: getSettingsWorkflowHistoryDefaultState(),
    workflowHistory: getWorkflowHistoryDefaultState(),
    workflow: getWorkflowDefaultState(),
  });

  const state = getDefaultState();

  Vue.use(Vuex);

  const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
  });

  const store = new Vuex.Store({
    state: state,
    actions: {
      ...workflowPendingActions,
      [ROUTE_PUSH]: (_, args) => router.push(args),
      [ROUTE_REPLACE]: (_, args) => router.replace(args),
    },
    mutations: {
      ...graphMutations,
      ...settingsWorkflowHistoryMutations,
      ...workflowMutations,
    },
    getters: {
      ...graphGetters,
      ...routeGetters,
      ...settingsWorkflowHistoryGetters,
      ...workflowGetters,
      ...workflowPendingGetters,
    },
    plugins: [vuexLocal.plugin],
  });

  return store;
};

export default initStore;
