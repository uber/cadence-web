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

// Graph store

const getGraphDefaultState = () => ({
  childRoute: null,
  newExecutionId: null,
  parentRoute: null,
  hasChildBtn: false,
  childBtnText: null,
  parentBtnText: 'to parent',
});

const graphMutations = {
  childRoute(state, param) {
    state.graph.childRoute = param.route;
    state.graph.hasChildBtn = true;
    state.graph.childBtnText = param.btnText;
  },
  newExecutionRoute(state, route) {
    (state.graph.newExecutionId = route),
      (state.graph.hasChildBtn = !state.graph.hasChildBtn);
  },
  previousExecutionRoute(state, route) {
    (state.graph.parentRoute = route),
      (state.graph.parentBtnText = 'previous execution');
  },
  toggleChildBtn(state) {
    state.graph.hasChildBtn = false;
  },
  parentRoute(state, route) {
    state.graph.parentRoute = route;
  },
  resetGraphState(state) {
    Object.assign(state.graph, getGraphDefaultState());
  },
};

const graphGetters = {
  childRoute: state => state.graph.childRoute,
  newExecutionId: state => state.graph.newExecutionId,
  hasChildBtn: state => state.graph.hasChildBtn,
  childBtnText: state => state.graph.childBtnText,
  parentBtnText: state => state.graph.parentBtnText,
  parentRoute: state => state.graph.parentRoute,
};

// Application store

const getDefaultState = () => ({
  graph: getGraphDefaultState(),
});

const state = getDefaultState();

Vue.use(Vuex);

const store = new Vuex.Store({
  state: state,
  mutations: {
    ...graphMutations,
  },
  getters: {
    ...graphGetters,
  },
});

export default store;
