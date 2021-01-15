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

import Vue from 'vue';
import Vuex from 'vuex';

const getDefaultState = () => {
  return {
    childRoute: null,
    newExecutionId: null,
    parentRoute: null,
    hasChildBtn: false,
    childBtnText: null,
    parentBtnText: 'to parent',
  };
};
// initial state
const state = getDefaultState();

Vue.use(Vuex);

const store = new Vuex.Store({
  state: state,
  mutations: {
    childRoute(state, param) {
      state.childRoute = param.route;
      state.hasChildBtn = true;
      state.childBtnText = param.btnText;
    },
    newExecutionRoute(state, route) {
      (state.newExecutionId = route), (state.hasChildBtn = !state.hasChildBtn);
    },
    previousExecutionRoute(state, route) {
      (state.parentRoute = route), (state.parentBtnText = 'previous execution');
    },
    toggleChildBtn(state) {
      state.hasChildBtn = false;
    },
    parentRoute(state, route) {
      state.parentRoute = route;
    },
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
  },
  getters: {
    childRoute: state => state.childRoute,
    newExecutionId: state => state.newExecutionId,
    hasChildBtn: state => state.hasChildBtn,
    childBtnText: state => state.childBtnText,
    parentBtnText: state => state.parentBtnText,
    parentRoute: state => state.parentRoute,
  },
});

export default store;
